// app/actions/submitData.ts
'use server'

import { Manufacturer, Product, ProductCategory } from '@/payload-types'

import ObjectID from 'bson-objectid'
import { Tramp4Import } from './types'
import config from '@payload-config'
import { getPayload } from 'payload'
import { parseFile } from '@/payload/utilities/xml'

type ProductUpsert = Omit<Product, 'createdAt' | 'updatedAt' | 'id' | 'slug'>
type ManufacturerUpsert = Omit<Manufacturer, 'createdAt' | 'updatedAt' | 'id' | 'slug'>
type ProductCategoryUpsert = Omit<ProductCategory, 'createdAt' | 'updatedAt' | 'id' | 'slug'>

const xmlFileName = 'Centersport'

export async function submitData() {
  const payload = await getPayload({ config })

  const xmlData = (await parseFile(xmlFileName)) as unknown as Tramp4Import
  const products = xmlData.nokaut.offers.offer

  const dataToUpsert = await Promise.all(
    products.map(async (p) => {
      const pricePreviousProp = p.property.find((prop) => prop.name === 'PreviousPrice')
      const urlProp = p.property.find((prop) => prop.name === 'ProductUrl')
      const materialProp = p.property.find((prop) => prop.name === 'Material')

      const manufacturerProp = p.property.find((prop) => prop.name === 'Producent')
      let manufacturerId: string | null = null

      if (manufacturerProp) {
        payload.db.collections['manufacturer'].bulkWrite([
          {
            updateOne: {
              upsert: true,
              filter: { code: manufacturerProp['#text'], name: p.producer },
              update: {
                code: manufacturerProp['#text'],
              } as ManufacturerUpsert,
            },
          },
        ])
        const manufacturer = await payload.db.collections['manufacturer'].findOne({
          code: manufacturerProp['#text'],
        })
        manufacturerId = manufacturer?.id
      }

      const erpCategoryName = p.category.split('>')[0].trim()
      let categoryId: string | null = null
      if (erpCategoryName) {
        payload.db.collections['product-category'].bulkWrite([
          {
            updateOne: {
              upsert: true,
              filter: { name: erpCategoryName },
              update: {
                name: erpCategoryName,
              } as ProductCategoryUpsert,
            },
          },
        ])
        const productCategory = await payload.db.collections['product-category'].findOne({
          name: erpCategoryName,
        })
        categoryId = productCategory?.id
      }

      const _erpId = `${xmlFileName}_${p.id}`

      return {
        updateOne: {
          upsert: true,
          filter: { erpId: _erpId },
          update: {
            shopName: xmlFileName,
            erpId: _erpId,
            title: p.name,
            name: p.name,
            description: p.description,
            quantity: parseFloat(p.availability),
            quantityMin: 1,
            quantityStep: 1,
            keywords: '',
            bestseller: false,
            specialOffer: false,
            url: urlProp ? urlProp['#text'] : null,
            material: materialProp ? materialProp['#text'] : null,
            pricePrevious: pricePreviousProp ? parseFloat(pricePreviousProp['#text']) : null,
            price: parseFloat(p.price),
            manufacturer: manufacturerId ? ObjectID(manufacturerId) : null,
            Category: categoryId ? ObjectID(categoryId) : null,
            _status: 'published',
            mediaImages: [
              {
                isMain: true,
                url: p.image,
              },
            ],
            version: 1,
            seoDescription: p.description,
            seoImageUrl: p.image,
            seoTitle: p.name,
            slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          } as ProductUpsert,
        },
      }
    }),
  )

  await payload.db.collections['products'].bulkWrite(dataToUpsert)
  return true
}

// app/actions/submitData.ts
'use server'

import { Product } from '@/payload-types'
import { Tramp4Import } from './types'
import config from '@payload-config'
import { getPayload } from 'payload'
import { parseFile } from '@/payload/utilities/xml'

type ProductUpsert = Omit<
  Product,
  'createdAt' | 'updatedAt' | 'slug' | 'id' | 'manufacturer' | 'erpCategories' | 'warehouse'
>

export async function submitData() {
  const payload = await getPayload({ config })

  const xmlData = (await parseFile('Tramp4.small')) as unknown as Tramp4Import
  const products = xmlData.nokaut.offers.offer

  const dataToUpsert = products.map((p) => {
    const pricePreviousProp = p.property.find((prop) => prop.name === 'PreviousPrice')
    const urlProp = p.property.find((prop) => prop.name === 'ProductUrl')
    const colorProp = p.property.find((prop) => prop.name === 'Kolor')

    return {
      updateOne: {
        upsert: true,
        filter: { erpId: p.id },
        update: {
          erpId: p.id,
          title: p.name,
          description: p.description,
          quantity: parseFloat(p.availability),
          quantityMin: 1,
          quantityStep: 1,
          code: '',
          keywords: '',
          bestseller: false,
          specialOffer: false,
          url: urlProp ? urlProp['#text'] : null,
          color: colorProp ? colorProp['#text'] : null,
          pricePrevious: pricePreviousProp ? parseFloat(pricePreviousProp['#text']) : null,
          price: parseFloat(p.price),
          _status: 'published',
          mediaImages: [
            {
              isMain: true,
              url: p.image,
            },
          ],
          seoDescription: p.description,
          seoImageUrl: p.image,
          seoTitle: p.name,
          slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        } as ProductUpsert,
      },
    }
  })

  await payload.db.collections['products'].bulkWrite(dataToUpsert)
  return true
}

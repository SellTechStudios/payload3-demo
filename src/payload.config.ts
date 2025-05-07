import { defaultLexical } from '@/payload/fields/defaultLexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { en } from '@payloadcms/translations/languages/en'
import { pl } from '@payloadcms/translations/languages/pl'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp' // sharp-import
import { fileURLToPath } from 'url'
import Manufacturer from './payload/collections/eCom/Manufacturer'
import { Orders } from './payload/collections/eCom/Orders'
import { PaymentMethods } from './payload/collections/eCom/PaymentMethods'
import ProductCategory from './payload/collections/eCom/ProductCategory'
import Products from './payload/collections/eCom/Products'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { PostCategories } from './payload/collections/PostCategories'
import { Posts } from './payload/collections/Posts'
import { Users } from './payload/collections/Users'
import { Footer } from './payload/globals/Footer/config'
import { Header } from './payload/globals/Header/config'
import { ProductImportsAdmin } from './payload/globals/ProductsImport/ProductImportsAdmin'
import { EmbeddingsAdmin } from './payload/globals/ProductsVectorEmbeddings/Admin'
import { Settings } from './payload/globals/Settings/Settings'
import { plugins } from './payload/plugins'
import { getServerSideURL } from './payload/utilities/getURL'

// storage-adapter-import-placeholder

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: {
      en,
      pl,
    },
  },
  localization: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  },
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // Global editor config
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    Pages,
    Posts,
    Media,
    PostCategories,
    Users,
    Orders,
    Products,
    ProductCategory,
    Manufacturer,
    PaymentMethods,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Settings, ProductImportsAdmin, EmbeddingsAdmin],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

import { EmbeddingsAdmin } from './payload/globals/ProductsVectorEmbeddings/Admin'
import { Footer } from './payload/globals/Footer/config'
import { Header } from './payload/globals/Header/config'
import Manufacturer from './payload/collections/eCom/Manufacturer'
import { Media } from './payload/collections/Media'
import { Orders } from './payload/collections/eCom/Orders'
import { Pages } from './payload/collections/Pages'
import { PostCategories } from './payload/collections/PostCategories'
import { Posts } from './payload/collections/Posts'
import ProductCategory from './payload/collections/eCom/ProductCategory'
import { ProductImportsAdmin } from './payload/globals/ProductsImport/ProductImportsAdmin'
import Products from './payload/collections/eCom/Products'
import { Settings } from './payload/globals/Settings/Settings'
import { Users } from './payload/collections/Users'
import { buildConfig } from 'payload'
import { defaultLexical } from '@/payload/fields/defaultLexical'
import { en } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { getServerSideURL } from './payload/utilities/getURL'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'
import { pl } from '@payloadcms/translations/languages/pl'
import { plugins } from './payload/plugins'
import sharp from 'sharp' // sharp-import

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

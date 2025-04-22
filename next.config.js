import createNextIntlPlugin from 'next-intl/plugin'
import redirects from './redirects.js'
import { withPayload } from '@payloadcms/next/withPayload'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL, 'http://fd-distribution.pl', 'https://fd-distribution.pl'].map(
        (item) => {
          const url = new URL(item)

          return {
            hostname: url.hostname,
            protocol: url.protocol.replace(':', ''),
          }
        },
      ),
    ],
  },
  reactStrictMode: true,
  redirects,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(withPayload(nextConfig))

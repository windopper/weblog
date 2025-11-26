import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
        pathname: '/images/**',
      },
    ],
  },  
  experimental: {
    useCache: true,
  },
  webpack: (config, { isServer, dev, webpack }) => {
    config.output.webassemblyModuleFilename =
            isServer && !dev
                ? '../static/wasm/pkg/[modulehash].wasm'
                : 'static/wasm/pkg/[modulehash].wasm'

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    if (!isServer) {
      config.output.environment = {
        ...config.output.environment,
        asyncFunction: true,
      };
    }

    return config;
  },
}

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  theme: 'github-dark',
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeAutolinkHeadings,
      [rehypePrettyCode, options],
    ],
  }
})

export default withMDX(nextConfig)

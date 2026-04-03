import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    // Allow next/image to optimize local API-generated images with querystrings.
    localPatterns: [
      { pathname: '/api/post/thumbnail' },
      // Blog post images under /public/markdown/**
      { pathname: '/markdown/**' },
      // Memo images under /public/markdown-memo/**
      { pathname: '/markdown-memo/**' },
      // Site assets under /public/image/**
      { pathname: '/image/**' },
    ],
  },  
  experimental: {
    useCache: true,
    optimizePackageImports: ["react-icons", "lucide-react", "motion"],
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
    // Turbopack requires loader options to be serializable.
    // Pass plugins by string identifier instead of imported functions.
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [
      'rehype-autolink-headings',
      ['rehype-pretty-code', options],
    ],
  }
})

export default withMDX(nextConfig)

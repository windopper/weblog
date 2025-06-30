import type { MDXComponents } from 'mdx/types'
import MDXImage from './app/components/mdx-image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ({ src, alt, width, height, ...props }) => {
      return null;
    },
  }
}

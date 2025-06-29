declare module '*.mdx' {
  import { ComponentType } from 'react'
  const MDXComponent: ComponentType<any>
  export default MDXComponent
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
        src: string
        alt?: string
        width?: number | string
        height?: number | string
      }
    }
  }
} 
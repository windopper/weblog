import type { MDXComponents } from 'mdx/types'
import MDXImage from './app/components/mdx-image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ({ src, alt, width, height, ...props }) => {
      if (!src) return null
      
      // 외부 URL인 경우 기본 img 태그 사용
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return (
          <img 
            src={src} 
            alt={alt || ''} 
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              borderRadius: '8px',
              margin: '1rem 0'
            }}
            {...props} 
          />
        )
      }
      
      // 로컬 이미지인 경우 커스텀 MDXImage 컴포넌트 사용
      return (
        <div style={{ margin: '1rem 0' }}>
          <MDXImage 
            src={src} 
            alt={alt || ''} 
            width={width || 800}
            height={height || 600}
            {...props}
          />
        </div>
      )
    },
  }
}

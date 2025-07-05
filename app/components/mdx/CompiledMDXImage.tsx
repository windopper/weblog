import MDXImage from "../mdx-image";

export default function CompiledMDXImage({
  src,
  alt,
  width,
  height,
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  props: any;
}) {
  // return null;
  if (!src) return null;

  // 외부 URL인 경우 기본 img 태그 사용
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return (
      <img
        src={src}
        alt={alt || ""}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          borderRadius: "8px",
          margin: "1rem 0",
          display: "block",
        }}
        {...props}
      />
    );
  }

  // 로컬 이미지인 경우 커스텀 MDXImage 컴포넌트 사용
  // MDXImage가 자체적으로 margin과 스타일을 처리함
  return (
    <MDXImage
      src={src}
      alt={alt || ""}
      width={width || 800}
      height={height || 600}
      priority
      {...props}
    />
  );
}

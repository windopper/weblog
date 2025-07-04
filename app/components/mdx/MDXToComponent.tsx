/**
 * MDX String을 컴포넌트로 바꿔주는 브릿지 함수
 * 
 * @param param0 
 * @returns 
 */
export default function MDXToComponent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import CompiledMDXContent from "@/app/components/CompiledMDXContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>; 
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <CompiledMDXContent slug={slug} />
  );
} 
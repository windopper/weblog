import { getMDXContent, getMarkdownFiles } from '@/app/action/markdown';
import { ImageResponse } from 'next/og'
import path from 'path'
import fs from 'fs'
 
const size = {
  width: 1200,
  height: 630,
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return [
    {
      id: slug,
      size,
      contentType: 'image/png',
    },
  ];
}
 
export default async function OpengraphImage({ id }: { 
  id: string;
}) {
  const slug = id;
  const post = await getMDXContent(slug);
  
  const fontMediumPath = path.join(process.cwd(), 'public/fonts/SeoulAlrimTTF-Medium.ttf');
  const fontHeavyPath = path.join(process.cwd(), 'public/fonts/SeoulAlrimTTF-Heavy.ttf');
  
  const fontMedium = fs.readFileSync(fontMediumPath);
  const fontHeavy = fs.readFileSync(fontHeavyPath);

  return new ImageResponse(
    (
      <div style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: '16px',
        backgroundColor: 'black'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '80px',
          borderRadius: '100%',
          backgroundColor: 'black',
          padding: '16px',
          width: '100px',
          height: '100px'
        }}>
           ✨
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '32px',
          fontWeight: 500,
          fontFamily: 'SeoulAlrimTTF-Heavy',
          flexWrap: 'wrap',
          width: '100%',
          textAlign: 'center',
          padding: '0 16px'
        }}>
          {post?.frontmatter.title} 
        </div>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px'
        }}>
            {post?.frontmatter.tags && post?.frontmatter.tags.map((tag: string, index: number) => (
            <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: 'SeoulAlrimTTF-Heavy',
                padding: '8px 12px',
                borderRadius: '100px',
                backgroundColor: '#27272a',
            }}>
                #{tag}
            </div>
            ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'SeoulAlrimTTF-Medium',
          data: fontMedium,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'SeoulAlrimTTF-Heavy',
          data: fontHeavy,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
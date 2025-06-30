import { getMarkdownFile, getMarkdownFiles, getMarkdownFileWithFetch } from "@/app/action/markdown";
import { prefixUrl } from "@/app/libs/constants";
import { MarkdownFile } from "@/app/types/weblog";
import { ImageResponse } from "next/og";

const size = {
  width: 1200,
  height: 630,
};

export async function generateStaticParams() {
  const markdownFiles = await getMarkdownFiles();
  
  return markdownFiles.map((file: MarkdownFile) => ({
    slug: file.name,
  }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const file = await getMarkdownFile(slug);

  return [
    {
      id: slug,
      size,
      contentType: "image/png",
      title: file?.title,
    },
  ];
}

async function loadSeouAlrimFont(font: string) {
  const url = `${prefixUrl}/fonts/${font}.ttf`;
  const response = await fetch(url);

  if (response.status == 200) {
    return await response.arrayBuffer();
  }
  throw new Error("failed to load font data");
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const file = await getMarkdownFileWithFetch(slug);
  const { title, tags } = file || { title: "", tags: [] };

  return new ImageResponse(
    (
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          gap: "24px",
          backgroundColor: "#09090b",
          position: "relative",
        }}
      >
        {/* Grid Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `
              linear-gradient(rgba(39, 39, 42, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(39, 39, 42, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            zIndex: 0,
            display: "flex",
          }}
        />
        
        {/* Highlighted Grid Cells */}
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            display: "flex",
          }}
        >
          
          <div style={{
            position: "absolute",
            left: "120px",
            top: "80px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.15)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.3)",
            display: "flex",
          }} />
          <div style={{
            position: "absolute",
            left: "280px",
            top: "160px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.1)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.2)",
            display: "flex",
          }} />
          <div style={{
            position: "absolute",
            left: "920px",
            top: "120px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.12)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.25)",
            display: "flex",
          }} />
          

          <div style={{
            position: "absolute",
            left: "200px",
            top: "320px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.08)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.18)",
            display: "flex",
          }} />
          <div style={{
            position: "absolute",
            left: "760px",
            top: "280px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.13)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.22)",
            display: "flex",
          }} />
          <div style={{
            position: "absolute",
            left: "1040px",
            top: "360px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.09)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.19)",
            display: "flex",
          }} />
          

          <div style={{
            position: "absolute",
            left: "80px",
            top: "480px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.11)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.24)",
            display: "flex",
          }} />
          <div style={{
            position: "absolute",
            left: "640px",
            top: "520px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.14)",
            boxShadow: "0 0 10px rgba(168, 162, 158, 0.26)",
            display: "flex",
          }} />
          <div style={{
            position: "absolute",
            left: "880px",
            top: "480px",
            width: "40px",
            height: "40px",
            backgroundColor: "rgba(168, 162, 158, 0.07)",
            boxShadow: "0 0 5px rgba(168, 162, 158, 0.17)",
            display: "flex",
          }} />
        </div> */}
        
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at center, rgba(24, 24, 27, 0.7) 0%, rgba(9, 9, 11, 0.9) 70%)",
            zIndex: 0,
            display: "flex",
          }}
        />

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: "1300px",
          height: "1300px",
          borderRadius: '100%',
          border: '10px dashed #3f3f46',
          zIndex: 3,
        }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "120px",
            borderRadius: "100%",
            padding: "16px",
            width: "160px",
            height: "160px",
            zIndex: 4,
          }}
        >
          ✨
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "64px",
            fontWeight: 500,
            fontFamily: "SeoulAlrimTTF-Heavy",
            flexWrap: "wrap",
            width: "100%",
            textAlign: "center",
            padding: "0 16px",
            zIndex: 4,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            zIndex: 4,
          }}
        >
          {tags &&
            tags.slice(0, 5).map((tag: string, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: 500,
                  fontFamily: "SeoulAlrimTTF-Heavy",
                  padding: "16px 24px",
                  borderRadius: "100px",
                  backgroundColor: "#27272a",
                  border: "1px solid #3f3f46",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
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
          name: "SeoulAlrimTTF-Medium",
          data: await loadSeouAlrimFont("SeoulAlrimTTF-Medium"),
          style: "normal",
          weight: 400,
        },
        {
          name: "SeoulAlrimTTF-Heavy",
          data: await loadSeouAlrimFont("SeoulAlrimTTF-Heavy"),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

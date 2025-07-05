'use server';

import { ImageResponse } from "next/og";

export default async function getPostThumbnailImage({ title, tags, imageOptions }: { title: string, tags: string[], imageOptions: any }) {
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
            display: "flex",
          }}
        />

        {/* Subtle gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at center, rgba(24, 24, 27, 0.7) 0%, rgba(9, 9, 11, 0.9) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1300px",
            height: "1300px",
            borderRadius: "100%",
            border: "10px dashed #3f3f46",
          }}
        />

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
    imageOptions
  );
}
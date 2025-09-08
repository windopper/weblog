"use client";

import React, { useState } from "react";
import UEBlueprint from "../../components/UEBlueprint";

export default function DevPage() {
  const [templateContent, setTemplateContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = (error: Error) => {
    setError(error.message);
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setError(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>UE Blueprint Development Page</h1>

      <div style={{ marginBottom: "20px" }}>
        <h3>Template Content</h3>
        <div style={{ marginBottom: "10px" }}>
          <button
            onClick={() => setTemplateContent("")}
            style={{ marginLeft: "5px", padding: "5px 10px" }}
          >
            Clear
          </button>
        </div>
        <textarea
          value={templateContent}
          onChange={(e) => setTemplateContent(e.target.value)}
          placeholder="Enter your blueprint template content here..."
          style={{
            width: "100%",
            height: "150px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        />
        <p style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
          Enter any content you want to include in the blueprint template. The
          content will be dynamically updated in the UE Blueprint component
          below.
        </p>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#fee",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #fcc",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {isLoaded && (
        <div className="text-green-500 p-2">
          UE Blueprint loaded successfully!
        </div>
      )}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <h3>UE Blueprint Component</h3>
        <UEBlueprint
          templateContent={templateContent}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}

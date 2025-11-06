"use client";

import React, { useEffect, useState, useRef } from "react";
import "ueblueprint/dist/css/ueb-style.min.css";

interface UEBlueprintProps {
  templateContent?: string;
  onError?: (error: Error) => void;
  onLoad?: () => void;
}

export default function UEBlueprint({
  templateContent = "",
  onError,
  onLoad,
}: UEBlueprintProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUeBlueprint = async () => {
      try {
        if (typeof window === "undefined") return;

        // Use dynamic import with proper loading and error handling
        const loadScript = async () => {
          try {
            // @ts-ignore - ignore module resolution issues
            await import("ueblueprint/dist/ueblueprint.js");
            console.log("UE Blueprint script loaded successfully");
          } catch (importError) {
            console.error("Failed to import ueblueprint script:", importError);
            throw importError;
          }
        };

        await loadScript();

        // Wait for custom element to be defined with better timing
        if (window.customElements) {
          try {
            // Add a small delay to ensure script execution
            await new Promise((resolve) => setTimeout(resolve, 200));

            // Check if the element is actually defined
            if (window.customElements.get("ueb-blueprint")) {
              setIsLoaded(true);
              onLoad?.();
            } else {
              // Wait for definition with timeout
              const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout")), 5000)
              );

              const definedPromise =
                window.customElements.whenDefined("ueb-blueprint");

              await Promise.race([definedPromise, timeoutPromise]);
              setIsLoaded(true);
              onLoad?.();
            }
          } catch (e) {
            console.warn(
              "Custom element definition timeout, proceeding anyway:",
              e
            );
            setIsLoaded(true);
            onLoad?.();
          }
        } else {
          setIsLoaded(true);
          onLoad?.();
        }
      } catch (error) {
        console.error("Failed to load ueblueprint:", error);
        const errorObj =
          error instanceof Error ? error : new Error(String(error));
        setHasError(true);
        setErrorMessage(errorObj.message);
        onError?.(errorObj);
      }
    };

    loadUeBlueprint();
  }, [onError, onLoad]);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      const createOrUpdateCustomElement = () => {
        try {
          // Check if custom element is actually defined
          if (
            !window.customElements ||
            !window.customElements.get("ueb-blueprint")
          ) {
            console.warn("ueb-blueprint custom element not found, retrying...");
            setTimeout(createOrUpdateCustomElement, 100);
            return;
          }

          // Use innerHTML method as primary approach
          let blueprint: Element;

          try {
            // Method: Use innerHTML to create custom element
            const tempDiv = document.createElement("div");
            const templateHTML = templateContent
              ? `<template>${templateContent}</template>`
              : "<template></template>";

            tempDiv.innerHTML = `<ueb-blueprint>${templateHTML}</ueb-blueprint>`;
            blueprint = tempDiv.firstElementChild!;

            if (!blueprint) {
              throw new Error("innerHTML method failed to create element");
            }

            console.log(
              "UE Blueprint element created/updated successfully using innerHTML"
            );
          } catch (createError) {
            console.error(
              "Failed to create ueb-blueprint element:",
              createError
            );
            throw createError;
          }

          if (containerRef.current) {
            // Clear any existing content and add new element
            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(blueprint);
          }

          // Store reference for cleanup
          const currentBlueprint = blueprint;
          return () => {
            if (
              containerRef.current &&
              containerRef.current.contains(currentBlueprint)
            ) {
              containerRef.current.removeChild(currentBlueprint);
            }
          };
        } catch (error) {
          console.error("Error creating ueb-blueprint element:", error);
          const errorObj =
            error instanceof Error ? error : new Error(String(error));
          setHasError(true);
          setErrorMessage(errorObj.message);
          onError?.(errorObj);
        }
      };

      const cleanup = createOrUpdateCustomElement();

      // Return cleanup function
      return cleanup;
    }
  }, [isLoaded, templateContent, onError]);

  if (!isLoaded) {
    return <div>Loading UE Blueprint...</div>;
  }

  if (hasError) {
    return (
      <div>
        <h3>UE Blueprint Failed to Load</h3>
        <p>Error: {errorMessage}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
}

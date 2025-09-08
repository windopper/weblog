"use client";

import UEBlueprint from "@/app/components/UEBlueprint";
import MDXComponentWrapper from "./MDXComponentWrapper";

export default function UEBlueprintMDX({
  children,
  className,
  title = "UE Blueprint",
  topDescription = "",
  bottomDescription = "",
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  topDescription?: string;
  bottomDescription?: string;
}) {
  const getNodeText = (node: any): string => {
    if (node == null) return "";
    if (typeof node === "string" || typeof node === "number")
      return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join("");
    if (node && typeof node === "object") {
      if (node.props && node.props.children)
        return getNodeText(node.props.children);
      if (node.children) return getNodeText(node.children);
    }
    return "";
  };

  const templateContent = getNodeText(children);

  return (
    <MDXComponentWrapper
      className={className}
      topDescription={topDescription}
      bottomDescription={bottomDescription}
    >
      <div className="flex flex-col gap-2">
        <UEBlueprint templateContent={String(templateContent)} />
      </div>
    </MDXComponentWrapper>
  );
}

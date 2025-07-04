import { MarkdownFile } from "@/app/types/weblog";
import MarkdownItemContent from "./MarkdownItemContent";
import MarkdownItemEffect from "./MarkdownItemEffect";

interface MarkdownItemProps {
  file: MarkdownFile;
  hideThumbnail?: boolean;
}

export default function MarkdownItem({ file, hideThumbnail = false }: MarkdownItemProps) {
  return (
    <MarkdownItemEffect file={file}>
      <MarkdownItemContent file={file} hideThumbnail={hideThumbnail} />
    </MarkdownItemEffect>
  );
}

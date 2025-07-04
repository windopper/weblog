import { MarkdownFile } from "@/app/types/weblog";
import MarkdownItemContent from "./MarkdownItemContent";
import MarkdownItemEffect from "./MarkdownItemEffect";

interface MarkdownItemProps {
  file: MarkdownFile;
}

export default function MarkdownItem({ file }: MarkdownItemProps) {
  return (
    <MarkdownItemEffect file={file}>
      <MarkdownItemContent file={file} />
    </MarkdownItemEffect>
  );
}

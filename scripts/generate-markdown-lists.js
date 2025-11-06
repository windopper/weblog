import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const generateMarkdownLists = async () => {
  const markdownDir = path.join(process.cwd(), "public", "markdown-posts");
  const fileNames = fs.readdirSync(markdownDir);
  const markdownFiles = fileNames.filter(
    (file) => file.endsWith(".mdx") || file.endsWith(".md")
  );

  // generate markdown lists.json
  const markdownLists = markdownFiles.map((file) => {
    console.log("[Generate Markdown Lists] Processing file:", file);
    const fileName = file.replace(/\.(mdx|md)$/, "");
    const fileContent = fs.readFileSync(path.join(markdownDir, file), "utf8");
    return {
      ...extractMetadataFromMarkdown(fileName, fileContent),
    };
  });
  console.log("[Generate Markdown Lists] Writing to markdown-lists.json");
  fs.writeFileSync(
    path.join(process.cwd(), "public", "markdown-lists.json"),
    JSON.stringify(markdownLists, null, 2)
  );
  console.log("[Generate Markdown Lists] Done");
};

const extractMetadataFromMarkdown = (fileName, fileContent) => {
  const { data, content } = matter(fileContent);
  const readingMinutes = calculateReadingMinutes(content);
  return {
    name: fileName,
    title: data.title,
    tags: data.tags,
    createdAt: new Date(data.date),
    path: `/posts/${fileName}`,
    isPrivate: data.isPrivate,
    description: data.description,
    thumbnail: data.thumbnail,
    slicedContent: content.slice(0, 200) + "...",
    readingMinutes,
  };
};

const calculateReadingMinutes = (content) => {
  const charsPerMinute = 600;
  const sanitizedContent = removeExcludedBlocks(content);
  const characterCount = sanitizedContent.replace(/\s+/g, "").length;
  if (characterCount === 0) {
    return 1;
  }
  return Math.max(1, Math.ceil(characterCount / charsPerMinute));
};

const removeExcludedBlocks = (content) => {
  const withoutUppercaseBlocks = content.replace(
    /<([A-Z][A-Za-z0-9]*)\b[^>]*>[\s\S]*?<\/\1>/g,
    ""
  );
  return withoutUppercaseBlocks;
};

generateMarkdownLists();

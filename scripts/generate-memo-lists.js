import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const generateMemoLists = async () => {
    const memoDir = path.join(process.cwd(), "public", "markdown-memo", "posts");
    const fileNames = fs.readdirSync(memoDir);
    const memoFiles = fileNames.filter(
        (file) => file.endsWith(".mdx") || file.endsWith(".md")
    );
    
    // generate memo lists.json
    const memoLists = memoFiles.map((file) => {
        console.log("[Generate Memo Lists] Processing file:", file);
        const fileName = file.replace(/\.(mdx|md)$/, "");
        const fileContent = fs.readFileSync(path.join(memoDir, file), "utf8");
        return {
            ...extractMetadataFromMemo(fileName, fileContent),
        }
    });
    console.log("[Generate Memo Lists] Writing to memo-lists.json");
    fs.writeFileSync(path.join(process.cwd(), "public", "memo-lists.json"), JSON.stringify(memoLists, null, 2));
    console.log("[Generate Memo Lists] Done");
}

const extractMetadataFromMemo = (fileName, fileContent) => {
    const { data, content } = matter(fileContent);
    return {
        name: fileName,
        title: data.title,
        tags: data.tags,
        createdAt: data.date ? new Date(data.date) : undefined,
        updatedAt: data.date ? new Date(data.date) : undefined,
        path: `/memos/${fileName}`,
        description: data.description,
        thumbnail: data.thumbnail,
        slicedContent: content.slice(0, 200) + "...", 
    }
}

generateMemoLists();


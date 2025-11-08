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
    
    // generate memo tree.json
    console.log("[Generate Memo Tree] Generating tree structure");
    const memoTree = generateMemoTree(memoLists);
    console.log("[Generate Memo Tree] Writing to memo-tree.json");
    fs.writeFileSync(path.join(process.cwd(), "public", "memo-tree.json"), JSON.stringify(memoTree, null, 2));
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

/**
 * 메모 리스트를 기반으로 트리 구조를 생성합니다.
 * tags 배열의 순서대로 계층 구조를 만듭니다.
 * 예: tags: ["프론트엔드", "React", "Hooks"] -> 프론트엔드 > React > Hooks
 */
const generateMemoTree = (memoLists) => {
    const tree = [];
    
    memoLists.forEach((memo) => {
        if (!memo.tags || memo.tags.length === 0) {
            return; // tags가 없으면 건너뜀
        }
        
        let currentLevel = tree;
        
        memo.tags.forEach((tag, index) => {
            const isLastTag = index === memo.tags.length - 1;
            
            // 현재 레벨에서 해당 태그를 찾거나 생성
            let node = currentLevel.find((n) => n.name === tag);
            
            if (!node) {
                // 노드가 없으면 생성
                node = {
                    name: tag,
                    subTreeMenus: [],
                    fileName: isLastTag ? memo.name : undefined, // 마지막 태그에만 fileName 추가
                };
                currentLevel.push(node);
            } else {
                // 노드가 있으면, 마지막 태그인 경우에만 fileName 업데이트
                if (isLastTag && !node.fileName) {
                    node.fileName = memo.name;
                }
            }
            
            // 다음 레벨로 이동
            currentLevel = node.subTreeMenus;
        });
    });
    
    return tree;
}

generateMemoLists();


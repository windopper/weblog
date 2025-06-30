const fs = require('fs');
const path = require('path');

const generateFileList = () => {
  const markdownDir = path.join(__dirname, '..', 'public', 'markdown-posts');
  const fileNames = fs.readdirSync(markdownDir);
  const markdownFiles = fileNames.filter(
    (file) => file.endsWith('.mdx') || file.endsWith('.md')
  );

  const outputPath = path.join(__dirname, '..', 'public', 'file-list.json');
  fs.writeFileSync(outputPath, JSON.stringify({ files: markdownFiles }, null, 2));
  
  console.log('파일 목록이 생성되었습니다:', outputPath);
};

generateFileList(); 
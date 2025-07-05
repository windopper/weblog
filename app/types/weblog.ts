export interface MarkdownFile {
    name: string;
    title: string;
    path: string;
    createdAt: Date;
    tags: string[];
    description?: string;
    isPrivate: boolean;
    thumbnail: string;
    slicedContent: string;
  }
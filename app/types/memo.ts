export interface Memo {
  title: string;
  description?: string;
  tags?: string[];
  slicedContent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  path?: string;
  thumbnail?: string;
}

export interface MemoTreeMenu {
  name: string;
  subTreeMenus: MemoTreeMenu[];
  fileName?: string;
}
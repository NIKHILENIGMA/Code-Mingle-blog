export interface Draft {
  id: string;
  title?: string;
  content?: string;
  image?: string;
  tags?: string[];
  category?: string;
  thumbnailImage?: string;
  isPublished?: boolean;
  publishedAt?: string;
  updatedAt?: string;
}

export interface PreviewDraft {
  id: string;
  title: string;
  slug: string | null;
  content: string;
  image: string;
  readTime: null;
  category: null;
  author: {
    id: string;
    username: string;
    avatarImg: string;
  };
  createdAt: string;
  updatedAt: string;
}

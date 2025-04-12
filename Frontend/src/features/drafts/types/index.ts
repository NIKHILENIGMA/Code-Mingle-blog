export interface Draft {
  id: string;
  title: string;
  content: string;
  status?: "DRAFT";
  categoryId?: null;
  collectionId?: null;
  image?: string;
  metaDescription?: null;
  publishedAt?: null;
  slug?: null;
  authorId?: string;
  readTime?: null;
  thumbnailImage?: string;
  createdAt?: string;
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

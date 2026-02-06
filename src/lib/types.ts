export interface HackMDUser {
  name: string;
  email: string | null;
  userpath: string;
  photo: string;
}

export interface HackMDNote {
  id: string;
  title: string;
  tags: string[];
  createdAt: number;
  publishType: 'view' | 'edit' | 'book' | 'slide';
  publishedAt: string | null;
  shortId: string;
  userpath: string;
}

export interface HackMDMeta {
  total: number;
  // Add other meta fields if known, or allow any
  [key: string]: any;
}

export interface HackMDResponse {
  user: HackMDUser;
  notes: HackMDNote[];
  meta: HackMDMeta;
}

export interface Article {
  id: string;           // Note ID
  slug: string;         // Generated slug
  title: string;        // From Frontmatter or Note title
  description: string;  // Excerpt
  coverImage?: string;  // First image URL
  content: string;      // Raw Markdown
  tags: string[];       // From Frontmatter or Note tags
  publishedAt: string;  // ISO Date String
  author: {
    name: string;
    avatar: string;
  };
}

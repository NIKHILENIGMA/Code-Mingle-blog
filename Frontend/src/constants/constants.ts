// Description: All the constants used in the frontend are defined here.
import {
  House,
  ClipboardType,
  Rss,
} from "@/Utils/Icons";

export const AUTHENTICATION_URL = "/v1/users/authentication";
export const PROFILE_URL = "/v1/users/profile";
export const USER_URL = "/v1/user";
export const POST_URL = "/v1/posts";
export const PUBLISH_URL = "/v1/published";
export const DRAFT_URL = "/v1/drafts";
export const COMMENT_URL = "/v1/comment";
export const LIKE_URL = "/v1/like";
export const FOLLOW_URL = "/v1/follow";
export const NOTIFICATION_URL = "/v1/notification";
export const SEARCH_URL = "/v1/search";
export const UPLOAD_URL = "/v1/upload";
export const TAGS_URL = "/v1/tag";
export const CATEGORY_URL = "/v1/category";
export const SETTING_URL = "/v1/setting";
export const CONTACT_URL = "/v1/contact";
export const OPEN_AI_URL = "/v1/openai";
export const ADMIN_URL = "/v1/admin";

export const NavItems = [
  { name: "Home", path: "/", icon: House },
  { name: "Stories", path: "/posts", icon: Rss },
  { name: "Editor", path: "/learn", icon: ClipboardType },
];


export const DRAFT_STALE_TIME = import.meta.env.VITE_DRAFT_STALE_TIME || 1000 * 60 * 60 * 24;
export const DRAFT_GC_TIME = import.meta.env.VITE_DRAFT_GARBAGE_COLLECTION_TIME || 1000 * 60 * 60 * 24 * 7;

export const dummyPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
];
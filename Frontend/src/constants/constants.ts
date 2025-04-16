// Description: All the constants used in the frontend are defined here.
import { LanguageType } from "@/features/editor/types";
import {
  House,
  ClipboardType,
  Rss,
  ArrowLeftToLine,
  ArrowRightToLine,
  Languages,
  Mic,
  SwatchBook,
} from "@/Utils/Icons";

import {
  BsEmojiGrin,
  BsEmojiLaughing,
  BsEmojiSmile,
  BsEmojiSmileUpsideDown,
  BsEmojiSunglasses,
  BsEmojiSurprise,
  BsEmojiWink,
} from "react-icons/bs";

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

export const hexOptions = [
  { value: "#FFFFFF", label: "Default" },
  { value: "#FFD700", label: "Yellow" },
  { value: "#00FF00", label: "Green" },
  { value: "#007BFF", label: "Blue" },
  { value: "#FF0000", label: "Red" },
  { value: "#A020F0", label: "Purple" },
  { value: "#FF8C00", label: "Orange" },
  { value: "#FF69B4", label: "Pink" },
  { value: "#A9A9A9", label: "Gray" },
  { value: "#000000", label: "Black" },
];

export const nodeOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "1", label: "Heading 1" },
  { value: "2", label: "Heading 2" },
  { value: "3", label: "Heading 3" },
];

export const languageOptions: LanguageType[] = [
  "plaintext",
  "html",
  "css",
  "javascript",
  "java",
  "cpp",
  "csharp",
];

export const aiOptions = [
  {
    name: "Simplify",
    icon: SwatchBook,
    label: "Simplify",
    value: "simplify",
  },
  {
    name: "Tone",
    icon: Mic,
    label: "Tone",
    value: "tone",
    subOptions: [
      {
        icon: BsEmojiSmile,
        label: "Formal",
      },
      {
        icon: BsEmojiSmileUpsideDown,
        label: "Informal",
      },
      {
        icon: BsEmojiGrin,
        label: "Optimistic",
      },
      {
        icon: BsEmojiSunglasses,
        label: "Friendly",
      },
      {
        icon: BsEmojiLaughing,
        label: "Assertive",
      },
      {
        icon: BsEmojiSurprise,
        label: "Curious",
      },
      {
        icon: BsEmojiWink,
        label: "Persuasive",
      },
    ],
  },
  {
    name: "Translation",
    icon: Languages,
    label: "Translation",
    value: "translation",
    subOptions: [
      {
        icon: Languages,
        label: "Chinese",
      },
      {
        icon: Languages,
        label: "English",
      },
      {
        icon: Languages,
        label: "French",
      },
      {
        icon: Languages,
        label: "German",
      },
      {
        icon: Languages,
        label: "Greek",
      },
      {
        icon: Languages,
        label: "Japanese",
      },
    ],
  },
  {
    name: "Make Long",
    icon: ArrowRightToLine,
    label: "Make Long",
    value: "makeLong",
  },
  {
    name: "Make Short",
    icon: ArrowLeftToLine,
    label: "Make Short",
    value: "makeShort",
  },
];

export const TYPE_OPTIONS = [
  { value: "simple", label: "Simple" },
  { value: "advanced", label: "Advanced" },
  { value: "condense", label: "Condense" },
];

export const TONE_OPTIONS = [
  { value: "Professional", label: "Professional" },
  { value: "Casual", label: "Casual" },
  { value: "Confident", label: "Confident" },
  { value: "Optimistic", label: "Optimistic" },
  { value: "Formal", label: "Formal" },
  { value: "Empathetic", label: "Empathetic" },
  { value: "Assertive", label: "Assertive" },
];

export const DRAFT_STALE_TIME =
  import.meta.env.VITE_DRAFT_STALE_TIME || 1000 * 60 * 60 * 24;
export const DRAFT_GC_TIME =
  import.meta.env.VITE_DRAFT_GARBAGE_COLLECTION_TIME || 1000 * 60 * 60 * 24 * 7;

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

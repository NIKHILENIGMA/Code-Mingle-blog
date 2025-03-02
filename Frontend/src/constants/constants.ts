// Description: All the constants used in the frontend are defined here.
import {
  House,
  ClipboardType,
  Rss,
} from "@/Utils/Icons";

export const AUTHENTICATION_URL = "/v1/users/authentication";
export const PROFILE_URL = "/v1/users/profile";
export const USER_URL = "/v1/user";
export const POST_URL = "/v1/post";
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

export const NavItems = [
  { name: "Home", path: "/", icon: House },
  { name: "Blogs", path: "/posts", icon: Rss },
  { name: "Editor", path: "/learn", icon: ClipboardType },
];


export const DRAFT_STALE_TIME = import.meta.env.VITE_DRAFT_STALE_TIME || 1000 * 60 * 60 * 24;
export const DRAFT_GC_TIME = import.meta.env.VITE_DRAFT_GARBAGE_COLLECTION_TIME || 1000 * 60 * 60 * 24 * 7;
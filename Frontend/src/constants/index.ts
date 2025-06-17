import {
  House,
  ClipboardType,
  Rss,
  ArrowLeftToLine,
  ArrowRightToLine,
  Languages,
  Mic,
  SwatchBook,
} from '@/Utils/Icons'
import {
  BsEmojiGrin,
  BsEmojiLaughing,
  BsEmojiSmile,
  BsEmojiSmileUpsideDown,
  BsEmojiSunglasses,
  BsEmojiSurprise,
  BsEmojiWink,
} from 'react-icons/bs'
import { LanguageType } from '@/features/editor/types'
import {
  NotAuthenticatedOptionsType,
  SessionData,
  SidebarLink,
  ToneOptions,
} from '@/Types/types'

/**
 * API endpoint URLs for the application.
 * These constants are used to define the base URLs for various API endpoints.
 */
export const AUTHENTICATION_URL = '/v1/users/authentication'
export const PROFILE_URL = '/v1/users/profile'
export const USER_URL = '/v1/user'
export const POST_URL = '/v1/posts'
export const PUBLISH_URL = '/v1/published'
export const DRAFT_URL = '/v1/drafts'
export const COMMENT_URL = '/v1/comment'
export const LIKE_URL = '/v1/like'
export const FOLLOW_URL = '/v1/follow'
export const NOTIFICATION_URL = '/v1/notification'
export const SEARCH_URL = '/v1/search'
export const UPLOAD_URL = '/v1/upload'
export const TAGS_URL = '/v1/tag'
export const CATEGORY_URL = '/v1/category'
export const SETTING_URL = '/v1/setting'
export const CONTACT_URL = '/v1/contact'
export const OPEN_AI_URL = '/v1/openai'
export const ADMIN_URL = '/v1/admin'

/**
 * Draft stale time in milliseconds.
 * This is the time after which a draft is considered stale and may be subject to garbage collection.
 */
export const DRAFT_STALE_TIME =
  import.meta.env.VITE_DRAFT_STALE_TIME || 1000 * 60 * 60 * 24
export const DRAFT_GC_TIME =
  import.meta.env.VITE_DRAFT_GARBAGE_COLLECTION_TIME || 1000 * 60 * 60 * 24 * 7

/**
 * Sidebar options for authenticated users.
 * @type {Array<{ name: string, path: string, icon: React.ComponentType }>}
 */
export const NOT_AUTHENTICATED_OPTIONS: NotAuthenticatedOptionsType[] = [
  {
    name: 'Login',
    to: '/login',
    variant: 'default',
  },
]

/**
 * Sidebar options for the settings page.
 * @type {Array<{ name: string, path: string }>}
 */
export const SETTINGS_SIDEBAR_OPTIONS = [
  {
    name: 'General Details',
    path: '/profile/settings/general-details',
  },
  {
    name: 'Writing Preference',
    path: '/profile/settings/writing-preference',
  },
  {
    name: 'Notification',
    path: '/profile/settings/notification',
  },
  {
    name: 'Change Password',
    path: '/profile/settings/change-password',
  },
  {
    name: 'Privacy & Security',
    path: '/profile/settings/privacy-security',
  },
]

/**
 * Text color hex codes for the editor.
 * @type {Array<{ value: string, label: string }>}
 */
export const TEXT_COLOR_HEXCODES = [
  { value: '#FFFFFF', label: 'Default' },
  { value: '#FFD700', label: 'Yellow' },
  { value: '#00FF00', label: 'Green' },
  { value: '#007BFF', label: 'Blue' },
  { value: '#FF0000', label: 'Red' },
  { value: '#A020F0', label: 'Purple' },
  { value: '#FF8C00', label: 'Orange' },
  { value: '#FF69B4', label: 'Pink' },
  { value: '#A9A9A9', label: 'Gray' },
  { value: '#000000', label: 'Black' },
]

/**
 * Text highlight color hex codes for the editor.
 * @type {Array<{ value: string, label: string }>}
 */
export const TEXT_HIGHLIGHT_HEXCODES = [
  { value: '#FFFF00', label: 'Yellow' },
  { value: '#00FF00', label: 'Green' },
  { value: '#007BFF', label: 'Blue' },
  { value: '#FF0000', label: 'Red' },
  { value: '#A020F0', label: 'Purple' },
  { value: '#FF8C00', label: 'Orange' },
  { value: '#FF69B4', label: 'Pink' },
  { value: '#A9A9A9', label: 'Gray' },
  { value: '#000000', label: 'Black' },
]

/**
 * Background color hex codes for the editor.
 * @type {Array<{ value: string, label: string }>}
 */
export const NAV_LINKS = [
  { name: 'Home', path: '/', icon: House },
  { name: 'Stories', path: '/posts', icon: Rss },
  { name: 'Editor', path: '/learn', icon: ClipboardType },
]

/**
 * Language options for the editor.
 * @type {LanguageType[]}
 */
export const LANGUAGE_OPTIONS: LanguageType[] = [
  'plaintext',
  'html',
  'css',
  'javascript',
  'java',
  'cpp',
  'csharp',
]

/**
 * AI options for the editor.
 * @type {Array<{ name: string, icon: React.ComponentType, label: string, value: string, subOptions?: Array<{ icon: React.ComponentType, label: string }> }>}
 */
export const AI_OPTIONS = [
  {
    name: 'Simplify',
    icon: SwatchBook,
    label: 'Simplify',
    value: 'simplify',
  },
  {
    name: 'Tone',
    icon: Mic,
    label: 'Tone',
    value: 'tone',
    subOptions: [
      {
        icon: BsEmojiSmile,
        label: 'Formal',
      },
      {
        icon: BsEmojiSmileUpsideDown,
        label: 'Informal',
      },
      {
        icon: BsEmojiGrin,
        label: 'Optimistic',
      },
      {
        icon: BsEmojiSunglasses,
        label: 'Friendly',
      },
      {
        icon: BsEmojiLaughing,
        label: 'Assertive',
      },
      {
        icon: BsEmojiSurprise,
        label: 'Curious',
      },
      {
        icon: BsEmojiWink,
        label: 'Persuasive',
      },
    ],
  },
  {
    name: 'Translation',
    icon: Languages,
    label: 'Translation',
    value: 'translation',
    subOptions: [
      {
        icon: Languages,
        label: 'Chinese',
      },
      {
        icon: Languages,
        label: 'English',
      },
      {
        icon: Languages,
        label: 'French',
      },
      {
        icon: Languages,
        label: 'German',
      },
      {
        icon: Languages,
        label: 'Greek',
      },
      {
        icon: Languages,
        label: 'Japanese',
      },
    ],
  },
  {
    name: 'Make Long',
    icon: ArrowRightToLine,
    label: 'Make Long',
    value: 'makeLong',
  },
  {
    name: 'Make Short',
    icon: ArrowLeftToLine,
    label: 'Make Short',
    value: 'makeShort',
  },
]

/**
 * Type options for the editor.
 * @type {Array<{ value: string, label: string }>}
 */
export const TYPE_OPTIONS = [
  { value: 'simple', label: 'Simple' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'condense', label: 'Condense' },
]

/**
 * Tone options for the editor.
 * @type {Array<{ value: string, label: string }>}
 */
export const TONE_OPTIONS: ToneOptions[] = [
  { value: 'Professional', label: 'Professional' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Confident', label: 'Confident' },
  { value: 'Optimistic', label: 'Optimistic' },
  { value: 'Formal', label: 'Formal' },
  { value: 'Empathetic', label: 'Empathetic' },
  { value: 'Assertive', label: 'Assertive' },
]

/**
 * Node type options for the editor.
 * @type {Array<{ value: string, label: string }>}
 */
export const NODE_TYPE = [
  { value: 'paragraph', label: 'Paragraph' },
  { value: '1', label: 'Heading 1' },
  { value: '2', label: 'Heading 2' },
  { value: '3', label: 'Heading 3' },
]

/**
 * Sidebar links for the admin dashboard.
 * @type {Array<{ title: string, to: string }>}
 */
export const ADMIN_SIDEBAR_LINKS: SidebarLink[] = [
  {
    title: 'Dashboard',
    to: '/admin/dashboard',
  },
  {
    title: 'User Management',
    to: '/admin/users',
  },
  {
    title: 'Session Management',
    to: '/admin/user-sessions',
  },
  {
    title: 'Role & Permissions',
    to: '/admin/role-permissions',
  },
  {
    title: 'Audit Logs',
    to: '/admin/aduit-logs',
  },
  {
    title: 'Post Management',
    to: '/admin/posts',
  },
  {
    title: 'Reports',
    to: '/admin/reports',
  },
]

/**
 * Session data for the admin dashboard.
 * @type {SessionData[]}
 */
export const SESSION_DATA: SessionData[] = [
  {
    id: '2101681664',
    userId: 'user_7890',
    browserInfo: 'Chrome 98.0.4758.102',
    ipAddress: '192.168.1.100',
    status: 'active',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '9728015087',
    userId: 'user_1234',
    browserInfo: 'Firefox 89.0',
    ipAddress: '192.168.0.120',
    status: 'expired',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '4337812439',
    userId: 'user_7890',
    browserInfo: 'Chrome 98.0.4758.102',
    ipAddress: '192.168.1.100',
    status: 'active',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '7635360577',
    userId: 'user_1234',
    browserInfo: 'Firefox 89.0',
    ipAddress: '192.168.0.120',
    status: 'expired',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '1313629058',
    userId: 'user_7890',
    browserInfo: 'Chrome 98.0.4758.102',
    ipAddress: '192.168.1.100',
    status: 'active',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '9222594873',
    userId: 'user_1234',
    browserInfo: 'Firefox 89.0',
    ipAddress: '192.168.0.120',
    status: 'expired',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  },
  {
    id: '5847392016',
    userId: 'user_4567',
    browserInfo: 'Safari 15.1',
    ipAddress: '192.168.2.150',
    status: 'active',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '9384756102',
    userId: 'user_8901',
    browserInfo: 'Edge 96.0.1054.62',
    ipAddress: '192.168.3.200',
    status: 'expired',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '2736459108',
    userId: 'user_2345',
    browserInfo: 'Opera 80.0.4170.63',
    ipAddress: '192.168.4.180',
    status: 'active',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '6574839201',
    userId: 'user_5678',
    browserInfo: 'Chrome 99.0.4844.51',
    ipAddress: '192.168.5.160',
    status: 'expired',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '1928374650',
    userId: 'user_9012',
    browserInfo: 'Firefox 90.0',
    ipAddress: '192.168.6.140',
    status: 'active',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '8473650192',
    userId: 'user_3456',
    browserInfo: 'Safari 15.2',
    ipAddress: '192.168.7.130',
    status: 'expired',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '3948576102',
    userId: 'user_6789',
    browserInfo: 'Edge 97.0.1072.69',
    ipAddress: '192.168.8.120',
    status: 'active',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '7654321098',
    userId: 'user_0123',
    browserInfo: 'Opera 81.0.4196.37',
    ipAddress: '192.168.9.110',
    status: 'expired',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '5432109876',
    userId: 'user_4321',
    browserInfo: 'Chrome 100.0.4896.75',
    ipAddress: '192.168.10.100',
    status: 'active',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
  {
    id: '9876543210',
    userId: 'user_8765',
    browserInfo: 'Firefox 91.0',
    ipAddress: '192.168.11.90',
    status: 'expired',
    access:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    refresh:
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  },
]

/**
 * Dummy posts for testing purposes.
 * @type {Array<{ id: number, image: string, title: string, date: string, description: string, author: string, role: string, category: string }>}
 */
export const DUMMY_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    title: 'How to use Engine Optimization to drive sales to further levels',
    date: 'Mar 14, 2025',
    description:
      'A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.',
    author: 'Nickenigma',
    role: 'Founder / CEO',
    category: 'Technology',
  },
]

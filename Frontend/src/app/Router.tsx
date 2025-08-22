import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from '../pages/Public/HomePage'
import React from 'react'
import AboutPage from '../pages/Public/AboutPage'
import Main from '@/Layout/Main'
import DraftLayout from '@/features/drafts/Layout/DraftLayout'
import PreviewPostPage from '@/features/drafts/pages/PreviewPostPage'
import NotFoundPage from './../pages/Public/NotFoundPage'
import ProtectedRoute from '@/features/auth/components/ProtectedRoute'
import ProfileSettings from '@/features/Profile/pages/ProfileSetting'
import PersonalSettings from '@/features/Profile/pages/PersonalSettings'
import ProfileSecurity from '@/features/Profile/pages/ProfileSecurity'
import AccountSettings from '@/features/Profile/pages/AccountSettings'
import GeneralDetails from '@/features/Profile/pages/GeneralDetails'
import UserDashboard from '@/features/Profile/pages/UserDashboard'
import DraftPage from '@/features/drafts/pages/DraftPage'
import ReadPostPage from '@/features/Blog/pages/ReadPostPage'
import AllPostsPage from '@/features/Blog/pages/AllPostsPage'
import AdminPanelLayout from '@/features/admin/Layout'
import {
  AdminDashboard,
  AdminPosts,
  AdminUsers,
  AdminReports,
} from '@/features/admin'
import PreviewPage from '@/features/drafts/pages/PreviewPage'
import Login from '@/features/auth/pages/Login'
import Signup from '@/features/auth/pages/Signup'
import ForgotPassword from '@/features/auth/pages/ForgotPassword'
import ResetPassword from '@/features/auth/pages/ResetPassword'
import RolesAndPermissions from '@/features/admin/pages/RolesAndPermissions'
import SessionManagement from '@/features/admin/pages/SessionManagement'
import { LearnEditorPage } from '@/pages'
import { OAuthRedirect } from '@/features/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/posts',
        element: <AllPostsPage />,
      },
      {
        path: '/posts/:id',
        element: <ReadPostPage />,
      },
      {
        path: '/profile/me',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
        children: [],
      },
      {
        path: '/profile/settings',
        element: (
          // <PrivateRoute>
          <ProfileSettings />
          // </PrivateRoute>
        ),
        children: [
          {
            path: 'personal',
            element: <GeneralDetails />,
          },
          {
            path: 'personal-settings',
            element: <PersonalSettings />,
          },
          {
            path: 'security',
            element: <ProfileSecurity />,
          },
          {
            path: 'account',
            element: <AccountSettings />,
          },
        ],
      },
    ],
  },

  {
    path: '/draft',
    element: (
      // <ProtectedRoute>
        <DraftLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: ':draftId',
        element: <DraftPage />,
      },
    ],
  },
  {
    path: '/preview/:draftId',
    element: <PreviewPostPage />,
  },
  {
    path: '/posts/preview/:id',
    element: <PreviewPage />,
  },
  {
    path: '/learn',
    element: <LearnEditorPage />,
  },
  {
    path: '/verify-email?token=:token',
    element: <div>Verify Email Page</div>, // Placeholder for email verification page
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/oauth/callback',
    element: <OAuthRedirect />,
  },
  {
    path: '/admin',
    element: <AdminPanelLayout />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'posts',
        element: <AdminPosts />,
      },
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'user-sessions',
        element: <SessionManagement />,
      },
      {
        path: 'role-permissions',
        element: <RolesAndPermissions />,
      },
      {
        path: 'aduit-logs',
        element: <AdminUsers />,
      },
      {
        path: 'reports',
        element: <AdminReports />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

/**
 * AppRouter
 * @description - This component is responsible for rendering the router provider
 * @returns - RouterProvider
 */
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter

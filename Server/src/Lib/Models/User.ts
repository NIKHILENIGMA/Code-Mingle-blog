
// src/models/User.ts
export interface User {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    username?: string | null
    password: string
    dob?: Date | null
    bio?: string | null
    avatarImg?: string | null
    coverImg?: string | null
    role: string
    createdAt: Date
    updatedAt: Date
}

// DTOs (Data Transfer Objects)
export interface CreateUserDTO {
    email: string
    password: string
    firstName?: string
    lastName?: string
    username?: string
    dob?: Date
    bio?: string
}

export interface UpdateUserDTO {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    dob?: Date
    bio?: string
    avatarImg?: string
    coverImg?: string
}

export interface ChangeUserPasswordDTO {
    password: string
}

export type UserWhere = {
    id: string
    username?: string
}

export type UserEmailWhere = {
    email: string
}

export type UserUsernameWhere = {
    username: string
}

export interface PostCardDTO {
    id: string;
    title: string;
    content: string;
    thumbnailImage: string | null;
    image: string | null;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UserProfileDTO {
    id: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    bio: string | null;
    avatarImg: string | null;
    coverImg: string | null;
    followerCount: number;
    followingCount: number;
    postCount: number;
    isFollowedByLoggedInUser: boolean;
    allPosts: PostCardDTO[];
  }
  
  

export interface IUser {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    username?: string | null
    dob?: Date | null
    bio?: string | null
    avatarImg?: string | null
    coverImg?: string | null
    role: string
    createdAt: Date
    updatedAt: Date
}

export interface ISignupUserBody {
    firstName?: string
    lastName?: string
    email: string
    password: string
}

export interface ILoginUser {
    email: string
    password: string
}

export interface IForgotPassword {
    email: string
}

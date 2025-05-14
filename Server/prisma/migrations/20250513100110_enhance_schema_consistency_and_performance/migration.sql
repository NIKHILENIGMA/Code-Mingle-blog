/*
  Warnings:

  - You are about to drop the column `author_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `reply_id` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `collectionId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `meta_description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `replies` table. All the data in the column will be lost.
  - You are about to drop the column `collection_id` on the `save_posts` table. All the data in the column will be lost.
  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `post_id` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_img` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cover_img` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `key_store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `policies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reset_password` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,targetId,target]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `save_posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `post_id` to the `replies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `replies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `replies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('CREATE', 'UPDATE', 'READ', 'DELETE');

-- CreateEnum
CREATE TYPE "LikeTarget" AS ENUM ('POST', 'COMMENT', 'REPLY');

-- AlterEnum
ALTER TYPE "Resource" ADD VALUE 'REPLY';

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_user_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_author_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_reply_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_author_id_fkey";

-- DropForeignKey
ALTER TABLE "save_posts" DROP CONSTRAINT "save_posts_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_post_id_fkey";

-- DropIndex
DROP INDEX "save_posts_user_id_post_id_collection_id_key";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "follows" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "comment_id",
DROP COLUMN "post_id",
DROP COLUMN "reply_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "target" "LikeTarget" NOT NULL,
ADD COLUMN     "targetId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "author_id",
DROP COLUMN "category_id",
DROP COLUMN "collectionId",
DROP COLUMN "image_url",
DROP COLUMN "meta_description",
DROP COLUMN "published_at",
ADD COLUMN     "post_cover_image_url" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "replies" DROP COLUMN "author_id",
ADD COLUMN     "post_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "save_posts" DROP COLUMN "collection_id";

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "post_id",
DROP COLUMN "tag",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tags_id_seq";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_img",
DROP COLUMN "cover_img",
DROP COLUMN "date_of_birth",
DROP COLUMN "user_role",
ADD COLUMN     "auth_provider" TEXT,
ADD COLUMN     "auth_provider_access_token" TEXT,
ADD COLUMN     "auth_provider_id" TEXT,
ADD COLUMN     "auth_provider_refresh_token" TEXT,
ADD COLUMN     "auth_provider_token_expiry" TIMESTAMP(3),
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_login_at" TIMESTAMP(3),
ADD COLUMN     "profile_image" TEXT,
ADD COLUMN     "role_id" TEXT,
ADD COLUMN     "verified_email" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "collections";

-- DropTable
DROP TABLE "key_store";

-- DropTable
DROP TABLE "policies";

-- DropTable
DROP TABLE "reset_password";

-- DropEnum
DROP TYPE "Action";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "user_social_media" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "linkedin" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "instagram" TEXT,
    "github" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "resource" "Resource" NOT NULL,
    "actions" "ActionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "post_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_social_media_userId_key" ON "user_social_media"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_access_token_key" ON "sessions"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_token_key" ON "sessions"("refresh_token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "comments"("post_id");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_targetId_target_key" ON "likes"("user_id", "targetId", "target");

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "save_posts_user_id_post_id_key" ON "save_posts"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_social_media" ADD CONSTRAINT "user_social_media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replies" ADD CONSTRAINT "replies_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

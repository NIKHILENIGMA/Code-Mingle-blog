/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Resource" AS ENUM ('POST', 'COMMENT', 'USER', 'ADMIN_PANEL', 'REPORT', 'ALL');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('READ', 'WRITE', 'UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "user_role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "policies" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "resource" "Resource" NOT NULL,
    "actions" "Action"[],
    "condition" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

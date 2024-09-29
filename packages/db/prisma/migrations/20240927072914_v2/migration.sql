/*
  Warnings:

  - You are about to drop the column `about` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accountVerified` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `availableByEmail` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `availableByPhone` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `availableByText` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `deactivatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `facebookUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `instagramUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `managedById` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `textNumber` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `twitterUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `websiteUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `AuthAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToGenre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_managedById_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_accountId_fkey";

-- DropForeignKey
ALTER TABLE "AuthAccount" DROP CONSTRAINT "AuthAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "AuthSession" DROP CONSTRAINT "AuthSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "Band" DROP CONSTRAINT "Band_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Broadcast" DROP CONSTRAINT "Broadcast_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Bulletin" DROP CONSTRAINT "Bulletin_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Musician" DROP CONSTRAINT "Musician_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Organizer" DROP CONSTRAINT "Organizer_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_accountId_fkey";

-- DropForeignKey
ALTER TABLE "_AccountAssociateUsers" DROP CONSTRAINT "_AccountAssociateUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToGenre" DROP CONSTRAINT "_AccountToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountToGenre" DROP CONSTRAINT "_AccountToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "_AccountsFavoritedByUser" DROP CONSTRAINT "_AccountsFavoritedByUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AffiliatedAccounts" DROP CONSTRAINT "_AffiliatedAccounts_A_fkey";

-- DropForeignKey
ALTER TABLE "_AffiliatedAccounts" DROP CONSTRAINT "_AffiliatedAccounts_B_fkey";

-- DropIndex
DROP INDEX "Account_slug_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "about",
DROP COLUMN "accountVerified",
DROP COLUMN "availableByEmail",
DROP COLUMN "availableByPhone",
DROP COLUMN "availableByText",
DROP COLUMN "avatarUrl",
DROP COLUMN "createdAt",
DROP COLUMN "deactivatedAt",
DROP COLUMN "email",
DROP COLUMN "facebookUrl",
DROP COLUMN "imageUrl",
DROP COLUMN "instagramUrl",
DROP COLUMN "isActive",
DROP COLUMN "lastUpdatedAt",
DROP COLUMN "managedById",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "slug",
DROP COLUMN "textNumber",
DROP COLUMN "twitterUrl",
DROP COLUMN "websiteUrl",
DROP COLUMN "youtubeUrl",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "oauth_token" TEXT,
ADD COLUMN     "oauth_token_secret" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "providerAccountId" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "refresh_token_expires_in" INTEGER,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "AuthAccount";

-- DropTable
DROP TABLE "AuthSession";

-- DropTable
DROP TABLE "_AccountToGenre";

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileAccount" (
    "type" "ProfileType" NOT NULL,
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "deactivatedAt" TIMESTAMP(3),
    "accountVerified" BOOLEAN NOT NULL DEFAULT false,
    "managedById" TEXT,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "avatarUrl" TEXT,
    "imageUrl" TEXT,
    "phoneNumber" TEXT,
    "textNumber" TEXT,
    "email" TEXT,
    "availableByPhone" BOOLEAN NOT NULL DEFAULT false,
    "availableByText" BOOLEAN NOT NULL DEFAULT false,
    "availableByEmail" BOOLEAN NOT NULL DEFAULT false,
    "websiteUrl" TEXT,
    "youtubeUrl" TEXT,
    "facebookUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,

    CONSTRAINT "ProfileAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreToProfileAccount" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileAccount_slug_key" ON "ProfileAccount"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToProfileAccount_AB_unique" ON "_GenreToProfileAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToProfileAccount_B_index" ON "_GenreToProfileAccount"("B");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileAccount" ADD CONSTRAINT "ProfileAccount_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Broadcast" ADD CONSTRAINT "Broadcast_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ProfileAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAssociateUsers" ADD CONSTRAINT "_AccountAssociateUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountsFavoritedByUser" ADD CONSTRAINT "_AccountsFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedAccounts" ADD CONSTRAINT "_AffiliatedAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedAccounts" ADD CONSTRAINT "_AffiliatedAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToProfileAccount" ADD CONSTRAINT "_GenreToProfileAccount_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToProfileAccount" ADD CONSTRAINT "_GenreToProfileAccount_B_fkey" FOREIGN KEY ("B") REFERENCES "ProfileAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

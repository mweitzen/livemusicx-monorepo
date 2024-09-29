/*
  Warnings:

  - You are about to drop the column `accountId` on the `Band` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Musician` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Organizer` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the `ProfileAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountAssociateUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountsFavoritedByUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AffiliatedAccounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToProfileAccount` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Band` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Organizer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Venue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Band` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Musician` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_accountId_fkey";

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
ALTER TABLE "ProfileAccount" DROP CONSTRAINT "ProfileAccount_managedById_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_accountId_fkey";

-- DropForeignKey
ALTER TABLE "_AccountAssociateUsers" DROP CONSTRAINT "_AccountAssociateUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountAssociateUsers" DROP CONSTRAINT "_AccountAssociateUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_AccountsFavoritedByUser" DROP CONSTRAINT "_AccountsFavoritedByUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AccountsFavoritedByUser" DROP CONSTRAINT "_AccountsFavoritedByUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_AffiliatedAccounts" DROP CONSTRAINT "_AffiliatedAccounts_A_fkey";

-- DropForeignKey
ALTER TABLE "_AffiliatedAccounts" DROP CONSTRAINT "_AffiliatedAccounts_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToProfileAccount" DROP CONSTRAINT "_GenreToProfileAccount_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToProfileAccount" DROP CONSTRAINT "_GenreToProfileAccount_B_fkey";

-- DropIndex
DROP INDEX "Band_accountId_key";

-- DropIndex
DROP INDEX "Musician_accountId_key";

-- DropIndex
DROP INDEX "Organizer_accountId_key";

-- DropIndex
DROP INDEX "Venue_accountId_key";

-- AlterTable
ALTER TABLE "Band" DROP COLUMN "accountId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "status" SET DEFAULT 'UNSCHEDULED';

-- AlterTable
ALTER TABLE "Musician" DROP COLUMN "accountId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organizer" DROP COLUMN "accountId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "accountId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProfileAccount";

-- DropTable
DROP TABLE "_AccountAssociateUsers";

-- DropTable
DROP TABLE "_AccountsFavoritedByUser";

-- DropTable
DROP TABLE "_AffiliatedAccounts";

-- DropTable
DROP TABLE "_GenreToProfileAccount";

-- CreateTable
CREATE TABLE "Profile" (
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

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileAssociateUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfilesFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AffiliatedProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PastEventToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_slug_key" ON "Profile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileAssociateUsers_AB_unique" ON "_ProfileAssociateUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileAssociateUsers_B_index" ON "_ProfileAssociateUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfilesFavoritedByUser_AB_unique" ON "_ProfilesFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfilesFavoritedByUser_B_index" ON "_ProfilesFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AffiliatedProfile_AB_unique" ON "_AffiliatedProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AffiliatedProfile_B_index" ON "_AffiliatedProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToProfile_AB_unique" ON "_EventToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToProfile_B_index" ON "_EventToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PastEventToProfile_AB_unique" ON "_PastEventToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_PastEventToProfile_B_index" ON "_PastEventToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToProfile_AB_unique" ON "_EventTemplateToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToProfile_B_index" ON "_EventTemplateToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToProfile_AB_unique" ON "_GenreToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToProfile_B_index" ON "_GenreToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Band_profileId_key" ON "Band"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_profileId_key" ON "Musician"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_profileId_key" ON "Organizer"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_profileId_key" ON "Venue"("profileId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Broadcast" ADD CONSTRAINT "Broadcast_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileAssociateUsers" ADD CONSTRAINT "_ProfileAssociateUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileAssociateUsers" ADD CONSTRAINT "_ProfileAssociateUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfilesFavoritedByUser" ADD CONSTRAINT "_ProfilesFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfilesFavoritedByUser" ADD CONSTRAINT "_ProfilesFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedProfile" ADD CONSTRAINT "_AffiliatedProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedProfile" ADD CONSTRAINT "_AffiliatedProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToProfile" ADD CONSTRAINT "_EventToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToProfile" ADD CONSTRAINT "_EventToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastEventToProfile" ADD CONSTRAINT "_PastEventToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PastEventToProfile" ADD CONSTRAINT "_PastEventToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToProfile" ADD CONSTRAINT "_EventTemplateToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToProfile" ADD CONSTRAINT "_EventTemplateToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToProfile" ADD CONSTRAINT "_GenreToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToProfile" ADD CONSTRAINT "_GenreToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

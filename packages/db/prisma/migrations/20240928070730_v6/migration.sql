/*
  Warnings:

  - Added the required column `name` to the `Stage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

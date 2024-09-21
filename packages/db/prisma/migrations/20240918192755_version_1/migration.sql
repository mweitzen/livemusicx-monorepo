/*
  Warnings:

  - Made the column `name` on table `Genre` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "name" SET NOT NULL;

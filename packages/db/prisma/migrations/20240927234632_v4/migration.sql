-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LocationType" ADD VALUE 'SUBREGION';
ALTER TYPE "LocationType" ADD VALUE 'AREA';

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_homeLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Venue" DROP CONSTRAINT "Venue_networkId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "homeLocationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "networkId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homeLocationId_fkey" FOREIGN KEY ("homeLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE SET NULL ON UPDATE CASCADE;

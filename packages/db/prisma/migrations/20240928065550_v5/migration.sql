-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_networkId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "networkId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE SET NULL ON UPDATE CASCADE;

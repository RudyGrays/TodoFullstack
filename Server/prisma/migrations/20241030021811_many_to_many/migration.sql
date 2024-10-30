/*
  Warnings:

  - You are about to drop the column `leaderId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_leaderId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "leaderId";

-- CreateTable
CREATE TABLE "UserRelationship" (
    "id" TEXT NOT NULL,
    "leaderId" TEXT NOT NULL,
    "subordinateId" TEXT NOT NULL,

    CONSTRAINT "UserRelationship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRelationship" ADD CONSTRAINT "UserRelationship_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelationship" ADD CONSTRAINT "UserRelationship_subordinateId_fkey" FOREIGN KEY ("subordinateId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

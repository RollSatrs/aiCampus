/*
  Warnings:

  - You are about to drop the column `confirmationCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `confirmationExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isEmailConfirmed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "confirmationCode",
DROP COLUMN "confirmationExpiresAt",
DROP COLUMN "isEmailConfirmed";

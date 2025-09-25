/*
  Warnings:

  - You are about to drop the column `students` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[curatorId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_count` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."classroomType" AS ENUM ('LECTURE', 'STANDART', 'COMPUTER');

-- AlterTable
ALTER TABLE "public"."Classroom" ADD COLUMN     "type" "public"."classroomType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Group" DROP COLUMN "students",
ADD COLUMN     "curatorId" INTEGER,
ADD COLUMN     "student_count" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Student" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "public"."Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_curatorId_key" ON "public"."Group"("curatorId");

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_curatorId_fkey" FOREIGN KEY ("curatorId") REFERENCES "public"."Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

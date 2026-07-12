/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `InterviewSession` table. All the data in the column will be lost.
  - The `status` column on the `InterviewSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `seniority` on the `InterviewSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `focusArea` on the `InterviewSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `category` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `difficulty` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PREPARING', 'READY', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "Seniority" AS ENUM ('JUNIOR', 'MID', 'SENIOR');

-- CreateEnum
CREATE TYPE "FocusArea" AS ENUM ('ALL', 'TECHNICAL', 'BEHAVIORAL');

-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('TECHNICAL', 'BEHAVIORAL', 'SYSTEM_DESIGN', 'CULTURE_FIT');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "InterviewSession" DROP COLUMN "resumeUrl",
ADD COLUMN     "behavioralScore" DOUBLE PRECISION,
ADD COLUMN     "cultureFitScore" DOUBLE PRECISION,
ADD COLUMN     "overallScore" DOUBLE PRECISION,
ADD COLUMN     "resumePath" TEXT,
ADD COLUMN     "technicalScore" DOUBLE PRECISION,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "seniority",
ADD COLUMN     "seniority" "Seniority" NOT NULL,
DROP COLUMN "focusArea",
ADD COLUMN     "focusArea" "FocusArea" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'PREPARING';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "expectedAnswer" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "category",
ADD COLUMN     "category" "QuestionCategory" NOT NULL,
DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

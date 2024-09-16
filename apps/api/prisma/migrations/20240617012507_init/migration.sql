-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'PERFORMER', 'VENUE', 'ORGANIZER', 'ASSOCIATE');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('MUSICIAN', 'BAND', 'VENUE', 'ORGANIZER');

-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('VENUE', 'RESTAURANT', 'CAFE', 'BAR', 'BREWERY', 'WINERY', 'DISTILLERY', 'CLUB', 'THEATER', 'GALLERY', 'AREA', 'CASINO', 'LOCATION', 'COMPLEX', 'STADIUM');

-- CreateEnum
CREATE TYPE "StageType" AS ENUM ('STAGE', 'ROOM', 'AREA');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CANCELLED', 'POSTPONED', 'SCHEDULED', 'RESCHEDULED', 'UNSCHEDULED');

-- CreateTable
CREATE TABLE "Credentials" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "accessTokenExpiresAt" INTEGER,
    "refreshToken" TEXT,
    "refreshTokenExpiresIn" INTEGER,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PUBLIC',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "userVerified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "type" "AccountType" NOT NULL,
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

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Musician" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "bandcampUrl" TEXT,
    "spotifyUrl" TEXT,
    "hometown" TEXT,
    "basedIn" TEXT,
    "instruments" TEXT[],

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Band" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "bandcampUrl" TEXT,
    "spotifyUrl" TEXT,
    "hometown" TEXT,
    "basedIn" TEXT,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "VenueType" NOT NULL DEFAULT 'VENUE',
    "capacity" INTEGER NOT NULL DEFAULT 50,
    "servesAlcohol" BOOLEAN NOT NULL DEFAULT false,
    "servesFood" BOOLEAN NOT NULL DEFAULT false,
    "ageRestriction" BOOLEAN NOT NULL DEFAULT false,
    "minimumAge" INTEGER NOT NULL DEFAULT 0,
    "requiresReservation" BOOLEAN NOT NULL DEFAULT false,
    "reservationLink" TEXT,
    "privateAccess" BOOLEAN NOT NULL DEFAULT false,
    "googleBusinessUrl" TEXT,
    "tripadvisorUrl" TEXT,
    "opentableUrl" TEXT,
    "yelpUrl" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stage" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "type" "StageType" NOT NULL DEFAULT 'AREA',
    "capacity" INTEGER NOT NULL DEFAULT 50,
    "imageUrl" TEXT,
    "about" TEXT,

    CONSTRAINT "Stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "experienceSummary" TEXT,
    "services" TEXT[],
    "googleBusinessUrl" TEXT,
    "yelpUrl" TEXT,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "lastUpdatedById" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedById" TEXT,
    "managedById" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "websiteUrl" TEXT,
    "timeDoor" TIMESTAMP(3),
    "timeStart" TIMESTAMP(3),
    "timeStartPrevious" TIMESTAMP(3),
    "timeEnd" TIMESTAMP(3),
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "isChildFriendly" BOOLEAN NOT NULL DEFAULT false,
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "isAgeRestricted" BOOLEAN NOT NULL DEFAULT false,
    "minimumAge" INTEGER NOT NULL DEFAULT 0,
    "servesAlcohol" BOOLEAN NOT NULL DEFAULT false,
    "servesFood" BOOLEAN NOT NULL DEFAULT false,
    "requiresRegistration" BOOLEAN NOT NULL DEFAULT false,
    "registrationLink" TEXT,
    "requiresTicket" BOOLEAN NOT NULL DEFAULT false,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastEvent" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "websiteUrl" TEXT,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "PastEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTemplate" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "lastUpdatedById" TEXT NOT NULL,
    "templateName" TEXT NOT NULL,
    "templateDescription" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slugBase" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "websiteUrl" TEXT,
    "duration" INTEGER,
    "timeDoor" TIMESTAMP(3),
    "timeStart" TIMESTAMP(3),
    "timeEnd" TIMESTAMP(3),
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "isChildFriendly" BOOLEAN NOT NULL DEFAULT false,
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "isAgeRestricted" BOOLEAN NOT NULL DEFAULT false,
    "minimumAge" INTEGER NOT NULL DEFAULT 0,
    "servesAlcohol" BOOLEAN NOT NULL DEFAULT false,
    "servesFood" BOOLEAN NOT NULL DEFAULT false,
    "requiresRegistration" BOOLEAN NOT NULL DEFAULT false,
    "registrationLink" TEXT,
    "requiresTicket" BOOLEAN NOT NULL DEFAULT false,
    "venueId" TEXT,
    "stageId" TEXT,
    "organizerId" TEXT,

    CONSTRAINT "EventTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventKeyword" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EventKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueKeyword" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "VenueKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountAssociateUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountsFavoritedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AffiliatedAccounts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BandToEventTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VenueToVenueKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventAdministrators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventEditors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserBookmarkedEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventRegisteredUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventTemplateToMusician" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventKeywordToPastEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventKeywordToEventTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Credentials_userId_idx" ON "Credentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_sessionToken_key" ON "UserSession"("sessionToken");

-- CreateIndex
CREATE INDEX "UserSession_userId_idx" ON "UserSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_slug_key" ON "Account"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_accountId_key" ON "Musician"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Band_accountId_key" ON "Band"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_accountId_key" ON "Venue"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_accountId_key" ON "Organizer"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PastEvent_slug_key" ON "PastEvent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_displayName_key" ON "Genre"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "EventKeyword_displayName_key" ON "EventKeyword"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "VenueKeyword_displayName_key" ON "VenueKeyword"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountAssociateUsers_AB_unique" ON "_AccountAssociateUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountAssociateUsers_B_index" ON "_AccountAssociateUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountsFavoritedByUser_AB_unique" ON "_AccountsFavoritedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountsFavoritedByUser_B_index" ON "_AccountsFavoritedByUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToGenre_AB_unique" ON "_AccountToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToGenre_B_index" ON "_AccountToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AffiliatedAccounts_AB_unique" ON "_AffiliatedAccounts"("A", "B");

-- CreateIndex
CREATE INDEX "_AffiliatedAccounts_B_index" ON "_AffiliatedAccounts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToPastEvent_AB_unique" ON "_MusicianToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToPastEvent_B_index" ON "_MusicianToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToMusician_AB_unique" ON "_BandToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToMusician_B_index" ON "_BandToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToEvent_AB_unique" ON "_BandToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToEvent_B_index" ON "_BandToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToPastEvent_AB_unique" ON "_BandToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToPastEvent_B_index" ON "_BandToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToEventTemplate_AB_unique" ON "_BandToEventTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToEventTemplate_B_index" ON "_BandToEventTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VenueToVenueKeyword_AB_unique" ON "_VenueToVenueKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_VenueToVenueKeyword_B_index" ON "_VenueToVenueKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventAdministrators_AB_unique" ON "_EventAdministrators"("A", "B");

-- CreateIndex
CREATE INDEX "_EventAdministrators_B_index" ON "_EventAdministrators"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventEditors_AB_unique" ON "_EventEditors"("A", "B");

-- CreateIndex
CREATE INDEX "_EventEditors_B_index" ON "_EventEditors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToGenre_AB_unique" ON "_EventToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToGenre_B_index" ON "_EventToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventKeyword_AB_unique" ON "_EventToEventKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventKeyword_B_index" ON "_EventToEventKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBookmarkedEvents_AB_unique" ON "_UserBookmarkedEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBookmarkedEvents_B_index" ON "_UserBookmarkedEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventRegisteredUsers_AB_unique" ON "_EventRegisteredUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventRegisteredUsers_B_index" ON "_EventRegisteredUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMusician_AB_unique" ON "_EventToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMusician_B_index" ON "_EventToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToGenre_AB_unique" ON "_EventTemplateToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToGenre_B_index" ON "_EventTemplateToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventTemplateToMusician_AB_unique" ON "_EventTemplateToMusician"("A", "B");

-- CreateIndex
CREATE INDEX "_EventTemplateToMusician_B_index" ON "_EventTemplateToMusician"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToPastEvent_AB_unique" ON "_GenreToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToPastEvent_B_index" ON "_GenreToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventKeywordToPastEvent_AB_unique" ON "_EventKeywordToPastEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_EventKeywordToPastEvent_B_index" ON "_EventKeywordToPastEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventKeywordToEventTemplate_AB_unique" ON "_EventKeywordToEventTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_EventKeywordToEventTemplate_B_index" ON "_EventKeywordToEventTemplate"("B");

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Musician" ADD CONSTRAINT "Musician_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stage" ADD CONSTRAINT "Stage_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastEvent" ADD CONSTRAINT "PastEvent_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "Stage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTemplate" ADD CONSTRAINT "EventTemplate_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAssociateUsers" ADD CONSTRAINT "_AccountAssociateUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountAssociateUsers" ADD CONSTRAINT "_AccountAssociateUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountsFavoritedByUser" ADD CONSTRAINT "_AccountsFavoritedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountsFavoritedByUser" ADD CONSTRAINT "_AccountsFavoritedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGenre" ADD CONSTRAINT "_AccountToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGenre" ADD CONSTRAINT "_AccountToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedAccounts" ADD CONSTRAINT "_AffiliatedAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliatedAccounts" ADD CONSTRAINT "_AffiliatedAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToPastEvent" ADD CONSTRAINT "_MusicianToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicianToPastEvent" ADD CONSTRAINT "_MusicianToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToMusician" ADD CONSTRAINT "_BandToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToMusician" ADD CONSTRAINT "_BandToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEvent" ADD CONSTRAINT "_BandToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEvent" ADD CONSTRAINT "_BandToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToPastEvent" ADD CONSTRAINT "_BandToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToPastEvent" ADD CONSTRAINT "_BandToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEventTemplate" ADD CONSTRAINT "_BandToEventTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToEventTemplate" ADD CONSTRAINT "_BandToEventTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueToVenueKeyword" ADD CONSTRAINT "_VenueToVenueKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VenueToVenueKeyword" ADD CONSTRAINT "_VenueToVenueKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "VenueKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAdministrators" ADD CONSTRAINT "_EventAdministrators_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventAdministrators" ADD CONSTRAINT "_EventAdministrators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEditors" ADD CONSTRAINT "_EventEditors_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventEditors" ADD CONSTRAINT "_EventEditors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGenre" ADD CONSTRAINT "_EventToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGenre" ADD CONSTRAINT "_EventToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventKeyword" ADD CONSTRAINT "_EventToEventKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventKeyword" ADD CONSTRAINT "_EventToEventKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmarkedEvents" ADD CONSTRAINT "_UserBookmarkedEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBookmarkedEvents" ADD CONSTRAINT "_UserBookmarkedEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventRegisteredUsers" ADD CONSTRAINT "_EventRegisteredUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventRegisteredUsers" ADD CONSTRAINT "_EventRegisteredUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusician" ADD CONSTRAINT "_EventToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMusician" ADD CONSTRAINT "_EventToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToGenre" ADD CONSTRAINT "_EventTemplateToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToGenre" ADD CONSTRAINT "_EventTemplateToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusician" ADD CONSTRAINT "_EventTemplateToMusician_A_fkey" FOREIGN KEY ("A") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTemplateToMusician" ADD CONSTRAINT "_EventTemplateToMusician_B_fkey" FOREIGN KEY ("B") REFERENCES "Musician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToPastEvent" ADD CONSTRAINT "_GenreToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToPastEvent" ADD CONSTRAINT "_GenreToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToPastEvent" ADD CONSTRAINT "_EventKeywordToPastEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToPastEvent" ADD CONSTRAINT "_EventKeywordToPastEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "PastEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToEventTemplate" ADD CONSTRAINT "_EventKeywordToEventTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "EventKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventKeywordToEventTemplate" ADD CONSTRAINT "_EventKeywordToEventTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "EventTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

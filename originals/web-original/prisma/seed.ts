import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import type { Prisma } from "@prisma/client";

import { genres } from "./data/genres";
import { states } from "./data/states";
import { regions } from "./data/nm-regions";
import { cities } from "./data/nm-cities";
import { zipcodes } from "./data/nm-zipcodes";
import { neighborhoods as neighborhoodABQ } from "./data/neighborhoods-abq";
import { neighborhoods as neighborhoodSF } from "./data/neighborhoods-sf";

import { musicians, groups } from "./data/performers";
import { organizers } from "./data/organizers";
import { venues } from "./data/venues";

// import { newEventsFormatted } from "./data/events";
import { events, eventsRaw } from "./data/events-newest";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createSlug(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with "-"
    .replace(/--+/g, "-"); // Replace multiple "-" with a single "-"

  return slug;
}

async function main() {
  // create genres
  console.log("Creating genres...");
  await prisma.genre.createMany({ data: genres, skipDuplicates: true });

  // create states
  console.log("Creating states...");
  await prisma.state.createMany({ data: states, skipDuplicates: true });
  await sleep(2000);

  // get new mexico state
  const nm = await prisma.state.findUnique({ where: { shortCode: "NM" } });
  if (!nm) throw new Error("NM not found");

  // format zipcodes with stateId
  const zipcodeData: Prisma.ZipcodeCreateManyInput[] = [];
  zipcodes.forEach((zip) => {
    zipcodeData.push({
      ...zip,
      stateId: nm.id,
    });
  });

  // create zipcodes
  console.log("Creating zipcodes...");
  await prisma.zipcode.createMany({ data: zipcodeData, skipDuplicates: true });
  await sleep(2000);

  // get new zipcodes
  const newZipcodes = await prisma.zipcode.findMany();
  if (!newZipcodes) throw new Error("Zipcodes not found");

  // format regions with stateId
  const regionData: Prisma.RegionCreateManyInput[] = [];
  regions.forEach((region) => {
    regionData.push({
      ...region,
      stateId: nm.id,
    });
  });

  // create regions
  console.log("Creating regions...");
  await prisma.region.createMany({ data: regionData, skipDuplicates: true });
  await sleep(2000);

  // get new regions
  const newRegions = await prisma.region.findMany();
  if (!newRegions) throw new Error("Regions not found");

  // format cities with regionId and stateId
  console.log("Formatting cities...");
  let citiesData: Prisma.CityCreateManyInput[] = [];
  cities.forEach((city) => {
    const { region, ...cityData } = city;
    citiesData.push({
      ...cityData,
      regionId:
        newRegions.find((r) => r.name === region)?.id ||
        newRegions.find((r) => r.slug === "nm-undesignated")!.id,
      stateId: nm.id,
      uniqueName: `${city.name}, ${nm.shortCode}`,
    });
  });

  // create cities
  console.log("Creating cities...");
  await prisma.city.createMany({ data: citiesData, skipDuplicates: true });
  await sleep(2000);

  // get all cities
  const newCities = await prisma.city.findMany();
  if (!newCities) throw new Error("Cities not found");

  // get abq and sf
  const abq = await prisma.city.findUnique({ where: { uniqueName: "Albuquerque, NM" } });
  if (!abq) throw new Error("ABQ not found");
  const sf = await prisma.city.findUnique({ where: { uniqueName: "Santa Fe, NM" } });
  if (!sf) throw new Error("SF not found");

  // format neighborhoods with cityId
  console.log("Formatting neighborhoods...");
  const neighborhoodsData: Prisma.NeighborhoodCreateManyInput[] = [];
  neighborhoodABQ.forEach((neighborhood) => {
    neighborhoodsData.push({
      ...neighborhood,
      cityId: abq.id,
      uniqueName: `${neighborhood.name}, Albuquerque, NM`,
    });
  });
  neighborhoodSF.forEach((neighborhood) => {
    neighborhoodsData.push({
      ...neighborhood,
      cityId: sf.id,
      uniqueName: `${neighborhood.name}, Santa Fe, NM`,
    });
  });

  // create neighborhoods
  console.log("Creating neighborhoods...");
  await prisma.neighborhood.createMany({ data: neighborhoodsData, skipDuplicates: true });
  await sleep(2000);

  // create streets through venues
  console.log("Formatting streets...");
  const streetsData: Prisma.StreetCreateManyInput[] = [];
  venues.forEach((venue) => {
    streetsData.push({
      name: venue.streetId,
      uniqueName: `${venue.streetId}, ${venue.cityId}, NM`,
      cityId: newCities.find((c) => c.name === venue.cityId)?.id!,
    });
  });

  // create streets
  console.log("Creating streets...");
  await prisma.street.createMany({ data: streetsData, skipDuplicates: true });
  await sleep(2000);

  // get new streets
  const newStreets = await prisma.street.findMany();
  if (!newStreets) throw new Error("Streets not found");

  // format musicians with basedInId
  console.log("Formatting musicians...");
  const musiciansData: Prisma.MusicianCreateManyInput[] = [];
  musicians.forEach((musician) => {
    musiciansData.push({
      ...musician,
      performerType: "musician",
      slug: createSlug(musician.name),
      basedInId: abq.id,
    });
  });

  // create musicians
  console.log("Creating musicians...");
  await prisma.musician.createMany({ data: musiciansData, skipDuplicates: true });
  await sleep(2000);

  // get new musicians
  const newMusicians = await prisma.musician.findMany();
  if (!newMusicians) throw new Error("error fetching musician");

  // format groups with basedInId and members
  console.log("Formatting groups...");
  let groupMemberMap: { [key: string]: { id: string }[] } = {};
  const groupsData: Prisma.MusicGroupCreateManyInput[] = [];
  groups.forEach((group) => {
    const members: { id: string }[] = [];
    if (group.members && group.members.length) {
      groupMemberMap[group.name] = [];
      group.members.forEach((member) => {
        const data = newMusicians.find((x) => x.name === member.name.trim());
        if (!data) {
          console.log("MEMBER NOT FOUND: ", member.name);
          return;
        }
        members.push({ id: data.id });
        groupMemberMap[group.name].push({ id: data!.id });
      });
    }
    groupsData.push({
      name: group.name,
      avatar: group.avatar,
      performerType: "group",
      slug: createSlug(group.name),
      basedInId: abq.id,
    });
  });

  // create groups
  console.log("Creating groups...");
  await prisma.musicGroup.createMany({ data: groupsData, skipDuplicates: true });
  await sleep(2000);

  // update groups with members
  console.log("Updating groups with members...");
  Object.keys(groupMemberMap).forEach(async (groupName) => {
    await prisma.musicGroup.update({
      where: { slug: createSlug(groupName) },
      data: { members: { connect: groupMemberMap[groupName] } },
    });
  });

  // create organizers
  console.log("Creating organizers...");
  await prisma.organizer.createMany({ data: organizers, skipDuplicates: true });
  await sleep(2000);

  // format venues with cityId
  console.log("Formatting venues...");
  const venuesData: Prisma.VenueCreateManyInput[] = [];
  venues.forEach((venue) => {
    const {
      complete,
      cityId,
      stateId,
      zipCodeId,
      streetId,
      streetNumber,
      stages,
      neighborhoodId,
      ...venueData
    } = venue;

    const cityRegion = newCities.find((c) => c.name === cityId)?.regionId;
    const regionId =
      newRegions.find((r) => r.name === cityRegion)?.id ||
      newRegions.find((r) => r.slug === "nm-undesignated")!.id;

    venuesData.push({
      addressLong: complete,
      addressShort: complete.split(",").slice(0, 2).join(),
      stateId: nm.id,
      cityId: newCities.find((c) => c.name === cityId)!.id,
      regionId,
      zipcodeId: newZipcodes.find((z) => z.code === zipCodeId)!.id,
      streetId: newStreets.find((s) => s.name === streetId)!.id,
      streetNumber: streetNumber.toLocaleString("en-US"),
      ...venueData,
    });
  });

  // create venues
  console.log("Creating venues...");
  await prisma.venue.createMany({ data: venuesData, skipDuplicates: true });
  await sleep(2000);

  // get new venues
  const newVenues = await prisma.venue.findMany();
  if (!newVenues) throw new Error("error fetching venues");

  // format stages with venueId
  console.log("Formatting stages...");
  const venueStagesData: Prisma.StageCreateManyInput[] = [];
  venues.forEach((venue) => {
    if (!venue.stages) {
      if (venue.type === "RESTAURANT") {
        return venueStagesData.push({
          name: "Main Dining",
          type: "AREA",
          venueId: newVenues.find((v) => v.name === venue.name)!.id,
          slug: createSlug(`Main Dining at ${venue.name}`),
        });
      }
      return venueStagesData.push({
        name: "Main Stage",
        type: "STAGE",
        venueId: newVenues.find((v) => v.name === venue.name)!.id,
        slug: createSlug(`Main Stage at ${venue.name}`),
      });
    }
    venue.stages.forEach((stage) => {
      venueStagesData.push({
        name: stage.name,
        type: stage.type,
        venueId: newVenues.find((v) => v.name === venue.name)!.id,
        slug: createSlug(`${stage.name} at ${venue.name}`),
      });
    });
  });

  // create stages
  console.log("Creating stages...");
  await prisma.stage.createMany({ data: venueStagesData, skipDuplicates: true });
  await sleep(2000);

  // getting unique performers
  console.log("Getting unique performers...");
  const musiciansSet = new Set<string>();
  const groupsSet = new Set<string>();
  eventsRaw.forEach(async (event) => {
    const performerSlug = createSlug(event.performer);
    if (event.solo) {
      musiciansSet.add(performerSlug);
    } else {
      groupsSet.add(performerSlug);
    }
  });

  // checking for existing performers and creating
  console.log("Checking for existing musicians...");
  Array.from(musiciansSet).forEach(async (musician) => {
    const existingMusician = await prisma.musician.findUnique({
      where: { slug: musician },
    });
    if (!existingMusician) {
      console.log("Creating musician...");
      console.log("MUSICIAN: ", musician);
      await prisma.musician.create({
        data: {
          name: musician,
          slug: musician,
          performerType: "musician",
          basedInId: abq.id,
        },
      });
    }
  });
  // checking for existing groups and creating
  console.log("Checking for existing groups...");
  Array.from(groupsSet).forEach(async (group) => {
    const existingGroup = await prisma.musicGroup.findUnique({
      where: { slug: group },
    });
    if (!existingGroup) {
      console.log("Creating group...");
      console.log("GROUP: ", group);
      await prisma.musicGroup.create({
        data: {
          name: group,
          slug: group,
          performerType: "group",
          basedInId: abq.id,
        },
      });
    }
  });

  // // create events
  // console.log("Creating events...");
  // events.forEach(async (event) => {
  //   try {
  //     await prisma.event.upsert({
  //       where: { slug: event.slug },
  //       create: event,
  //       update: {},
  //     });
  //   } catch (e) {
  //     console.log("ERROR on", event.slug);
  //     console.error(e);
  //   }
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

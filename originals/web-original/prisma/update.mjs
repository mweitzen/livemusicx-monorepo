import { addDays } from "date-fns";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const events = await prisma.event.findMany();

  events.forEach(
    async (event) =>
      await prisma.event.update({
        where: { id: event.id },
        data: {
          timeDoor: event.timeDoor ? addDays(event.timeDoor, 60) : null,
          timeStart: addDays(event.timeStart, 60),
          timeEnd: event.timeEnd ? addDays(event.timeEnd, 60) : null,
        },
      }),
  );
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

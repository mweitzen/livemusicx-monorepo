import { faker } from "@faker-js/faker";
import { Prisma, $Enums } from "../generated";
import { locations } from "../seed-data/locations";

/**
 * Set seed for consistent results
 */
faker.seed(33);

function generateUsers(count: number) {
  return Array.from({ length: count }).map(() => {
    const role = faker.helpers.enumValue($Enums.UserRole);
    const type =
      role === "USER" ? "FAN" : faker.helpers.enumValue($Enums.AccountType);
    const name = faker.person.fullName();
    const id = faker.string.uuid();

    return {
      id,
      role,
      type,
      name,
      isActive: faker.datatype.boolean(0.75),
      isVerified: faker.datatype.boolean(0.5),
      createdAt: faker.date.past({ years: 2 }),
      lastUpdatedAt: faker.date.past({ years: 1 }),
      password: "password",
      email: faker.internet.email({
        allowSpecialCharacters: false,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      }),
      image: faker.image.avatar(),
      phone: faker.phone.number({ style: "national" }),
      homeLocationId: faker.helpers.arrayElement(locations).id,
    } satisfies Prisma.UserCreateManyInput;
  });
}

export const users = generateUsers(50);

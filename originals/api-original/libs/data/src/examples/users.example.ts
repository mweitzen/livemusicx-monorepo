import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

import { User } from '../entities/user/base.entity';

const generateUsers = async (number: number) => {
  const users: User[] = [];

  for (let i = 0; i < number; i++) {
    // Generate Fake Information
    const id = randomUUID();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const isActive = faker.datatype.boolean();
    const username = faker.internet.userName({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create New User
    const user = new User();

    user.id = id;
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.isActive = isActive;
    user.email = email;
    user.password = hashedPassword;

    users.push(user);
  }

  return users;
};

export const exampleUsers: Promise<User[]> = generateUsers(10);

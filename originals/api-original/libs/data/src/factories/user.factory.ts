import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User } from '../entities/user/base.entity';
import * as bcrypt from 'bcrypt';

export const UserFactory = define(User, () => {
  // Generate Fake Information
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${firstName.charAt(0).toLowerCase()}-${lastName.toLowerCase()}`;
  const isActive = faker.datatype.boolean();
  const email = faker.internet.email();
  const password = 'password';
  bcrypt.hash(password, 12);

  // Create New User
  const user = new User();

  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.isActive = isActive;
  user.email = email;
  user.password = password;

  return user;
});

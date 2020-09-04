import { User } from './user';

export class Room {
  id: string;
  address: string;
  description: string;
  numBeds: number;
  pricePerDay: number;
  owner: User;
}

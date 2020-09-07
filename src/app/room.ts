import { User } from './user';

export class Room {
  id: string;
  owner: User;
  title: string;
  country: string;
  city: string;
  area: string;
  address: string;
  description: string;
  numBeds: number;
  pricePerDay: number;

  constructor() {
      this.owner = new User();
      console.log('MOLIS TO EFTIAXA BRO');
  }
}

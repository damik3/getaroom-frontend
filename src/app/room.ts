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
  }

  set(r: Room): void {
    this.id = r.id;
    this.owner.id = r.owner.id;
    this.owner.username = r.owner.username;
    this.title = r.title;
    this.country = r.country;
    this.city = r.city;
    this.address = r.address;
    this.description = r.description;
    this.numBeds = r.numBeds;
    this.pricePerDay = r.pricePerDay;
  }
}

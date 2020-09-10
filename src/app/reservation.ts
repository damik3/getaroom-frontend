import { User } from './user';
import { Room } from './room';

export class Reservation {
  user: User;
  room: Room;
  price: number;
  dateFrom: string;
  dateTo: string;

  constructor() {
    this.user = new User();
    this.room = new Room();
  }
}

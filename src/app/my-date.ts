const currYear = 2020;

export class MyDate {

  // Sad I know...
  static years = [2020, 2021];
  static months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  static days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  day: number;
  month: number;
  year: number;

  constructor() {
    this.day = 0;
    this.month = 0;
    this.year = 0;
  }

  set(year: number, month: number, day: number): void {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  set2(date: MyDate): void {
    this.day = date.day;
    this.month = date.month;
    this.year = date.year;
  }

  isValid(): boolean {
    return (this.year >= currYear) && (this.year <= currYear + 1)
      && (this.month >= 1) && (this.month <= 12)
      && (this.day >= 1) && (this.day <= 30);
  }

  toString(): string {
    let s = '';
    s += this.year.toString();
    s += '-';
    s += (this.month < 10) ? '0' + this.month.toString() : this.month.toString();
    s += '-';
    s += (this.day < 10) ? '0' + this.day.toString() : this.day.toString();
    return s;
  }

  isBefore(d: MyDate): boolean {
    if (this.year < d.year) {
      return true;
    }
    else if (this.year === d.year && this.month < d.month) {
      return true;
    }
    else if (this.year === d.year && this.month === d.month && this.day < d.day) {
      return true;
    }
    else {
      return false;
    }
  }
}

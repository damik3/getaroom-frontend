const currYear = 2020;

export class MyDate {
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
}

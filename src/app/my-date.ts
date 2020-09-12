const currYear = 2020;

export class MyDate {

  // Sad I know...
  static years = [2020, 2021];
  static months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  static days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  static monthDays = [31, 28, 31, 30, 31, 30,
                      31, 31, 30, 31, 30, 31];



  year: number;
  month: number;
  day: number;



  constructor() {
    this.day = 0;
    this.month = 0;
    this.year = 0;
  }



  // Compute d2 - d1
  static diff(d1: MyDate, d2: MyDate): number {
    d1.fix();
    d2.fix();

    let n1 = d1.year * 365 + d1.day;

    for (let i = 0; i < d1.month - 1; i++) {
      n1 += this.monthDays[i];
    }

    let n2 = d2.year * 365 + d2.day;

    for (let i = 0; i < d2.month - 1; i++) {
      n2 += this.monthDays[i];
    }

    return n2 - n1;
  }



  // Sometimes using [(ngModel)] year, month, or day end up of type string.
  // This function fixes this
  fix(): void {
    this.year = +this.year;
    this.month = +this.month;
    this.day = +this.day;
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
    this.fix();
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
    this.fix();
    d.fix();
    if (this.year !== d.year) {
      return this.year < d.year;
    }
    else if (this.month !== d.month) {
      return this.month < d.month;
    }
    else if (this.day !== d.day) {
      return this.day < d.day;
    }
    else {
      return false;
    }
  }
}

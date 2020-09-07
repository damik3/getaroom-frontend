export class Validate {
    static text(s: string): boolean {
        return !(!s || 0 === s.length);
    }
}

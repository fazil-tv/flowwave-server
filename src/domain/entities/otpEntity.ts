export class Otp {
    constructor(
        public value: string,
        public expirationTime: Date,
    ) {}

    isValid(currentTime: Date): boolean {
        return currentTime <= this.expirationTime;
    }
}
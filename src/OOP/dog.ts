import { Animal } from "./animal";

export class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }

    speak() {
        console.log("Woof!");
    }
}
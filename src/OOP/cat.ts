import { Animal } from "./animal";

export class Cat extends Animal {
    constructor(name: string, public color: string) {
        super(name); // calling the constructor of the parent class
    }

    speak() {
        console.log("Meow!");
    }
}
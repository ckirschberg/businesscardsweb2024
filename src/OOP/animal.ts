import { Move } from "./move";

export abstract class Animal implements Move { 
    constructor(public name: string) { }

    run() {
        console.log(`${this.name} is running...`);
    }

    abstract speak() // now, every cat and dog must have this method
}
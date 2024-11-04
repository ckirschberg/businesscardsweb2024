import { Animal } from "./animal";
import { Cat } from "./cat";
import { Dog } from "./dog";
import { Move } from "./move";

// const cat: Move = new Cat("Charlie", "black");
const cat = new Cat("Charlie", "black");
console.log("Cat name: " +   cat.name + " color: " + cat.color);

const dog = new Dog("Fido", "Golden Retriever");
console.log("Dog name: " + dog.name + " breed: " + dog.breed);

cat.run()
dog.run()

cat.speak();
dog.speak();

// const animal = new Animal("Generic Animal");
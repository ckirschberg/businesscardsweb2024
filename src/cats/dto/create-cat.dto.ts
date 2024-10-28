import { IsNotEmpty } from "class-validator";

export class CreateCatDto {
  @IsNotEmpty()
  name: string;

  age: number;
  
  @IsNotEmpty({message: 'Breed is required you silly user'})
  breed: string;
}
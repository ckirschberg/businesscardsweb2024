import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateBusinessCardDto {
    @IsNotEmpty()
    firstname: string;
  
    @IsNotEmpty()
    lastname: string;
  
    @IsNotEmpty()
    title: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    about: string;
  
    interests: string;
}

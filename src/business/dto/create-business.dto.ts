import { IsNotEmpty } from "class-validator";

export class CreateBusinessDto {
    @IsNotEmpty()
    name: string;
}

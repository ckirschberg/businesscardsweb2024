import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessCardDto } from './create-business-card.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBusinessCardDto extends PartialType(CreateBusinessCardDto) {
    
    @IsNotEmpty()
    _id: string;
}

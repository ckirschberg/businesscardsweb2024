import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessCardDto } from './create-business-card.dto';

export class UpdateBusinessCardDto extends PartialType(CreateBusinessCardDto) {
    _id: string;
}

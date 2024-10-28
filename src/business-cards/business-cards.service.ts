import { Injectable } from '@nestjs/common';
import { CreateBusinessCardDto } from './dto/create-business-card.dto';
import { UpdateBusinessCardDto } from './dto/update-business-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessCard } from './entities/business-card.entity';
import { Model } from 'mongoose';

@Injectable()
export class BusinessCardsService {
  constructor(@InjectModel(BusinessCard.name) private businessCardModel: Model<BusinessCard>) {}

  
  create(createBusinessCardDto: CreateBusinessCardDto) {
    const created = new this.businessCardModel(createBusinessCardDto);
    return created.save();
  }

  findAll() {
    return this.businessCardModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} businessCard`;
  }

  update(id: number, updateBusinessCardDto: UpdateBusinessCardDto) {
    return `This action updates a #${id} businessCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessCard`;
  }
}

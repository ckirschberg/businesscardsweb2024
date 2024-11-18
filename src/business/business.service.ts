import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from './entities/business.entity';
import { Model } from 'mongoose';
import { CreateBusinessCardDto } from '../business-cards/dto/create-business-card.dto';

@Injectable()
export class BusinessService {

  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  async linkBusinessCardToBusiness(id: string, createBusinessCardDto: CreateBusinessCardDto) {
    const business: BusinessDocument = await this.businessModel.findById(id);
    business.businessCards.push(createBusinessCardDto);
    return business.save();
    
    // return this.businessModel.findByIdAndUpdate(id, { $push: { businessCards: createBusinessCardDto } });
  }

  create(createBusinessDto: CreateBusinessDto) {
    const created = new this.businessModel(createBusinessDto);
    return created.save();
  }

  findAll() {
    return this.businessModel.find().populate('businessCards');
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}

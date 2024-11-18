import { Injectable } from '@nestjs/common';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { CreateBusinessCardDto } from '../business-cards/dto/create-business-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from "mongoose";
import { Business, BusinessDocument } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { BusinessCard } from '../business-cards/entities/business-card.entity';
import { log } from 'console';

@Injectable()
export class BusinessService {

  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  async addBusinessCard(id: string, businessCard) {
    let updateBusiness = await this.businessModel.findById(id);
// console.log("updateBusiness", updateBusiness);
// console.log("businessCard", businessCard);


    updateBusiness.businessCards.push(businessCard);
    return await updateBusiness.save();


    // await this.businessModel.findByIdAndUpdate(id, {
    //   $push: { businessCards: businessCardId },
    // });
  
  }
  async deleteBusinessCard(id: string, bcId: string) {
    const updateBusiness = await this.businessModel.findById(id);

    const filteredBcs = updateBusiness.businessCards.filter(
      (businessCard: any) => {
        return businessCard.toString() !== bcId;
      },
    );
    updateBusiness.businessCards = filteredBcs;

    return updateBusiness.save();
  }

  
  create(createBusinessDto: CreateBusinessDto) {
    const created = new this.businessModel(createBusinessDto);
    return created.save();
  }


  
  findAll() {
    return this.businessModel.find().populate('businessCards').exec();
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
  async deleteMany() {
    return this.businessModel.deleteMany({}).exec();
  }

}

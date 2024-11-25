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
import { SearchDTO } from './dto/search-business.dto';


@Injectable()
export class BusinessService {

  constructor(@InjectModel(Business.name) private businessModel: Model<Business>) {}

  searchBusiness(search: SearchDTO) {
    const filter: any = {};

    if (search.name) {
      // Case-insensitive and partial matchsearch
      filter.name = { $regex: search.name, $options: 'i' }; 
    }

    // This type of search on inline data (businessCards) only
    // works when the data is saved inline, not when it is
    // referenced as a subdocument.
    if (search.bcEmail) {
      // case sensitive exact match search
      filter['businessCards.email'] = search.bcEmail;
    }
    if (search.bcFirstname) {
      filter['businessCards.firstname'] = { $regex: search.bcFirstname, $options: 'i' }; // Case-insensitive
    }
    // We don't have any minPrice / maxPrice data, but this is
    // just to show how to filter using $gte and $lte.

    // if (search.minPrice || search.maxPrice) {
    //   filter.price = {};
    //   if (search.minPrice) filter.price.$gte = search.minPrice;
    //   if (search.maxPrice) filter.price.$lte = search.maxPrice;
    // }
    // if (search.tags) {
    //   filter.tags = { $all: search.tags }; // Matches all tags
    // }
    
    // console.log('Generated Filter:', JSON.stringify(filter, null, 2));
    
    return this.businessModel.find(filter).exec();
  }



  async addBusinessCard(id: string, businessCard) {
    let updateBusiness = await this.businessModel.findById(id);
// console.log("updateBusiness", updateBusiness);
// console.log("businessCard", businessCard);

// console.log("businessCard", businessCard);

    updateBusiness.businessCards.push(businessCard);
    // console.log("updateBusiness", updateBusiness);
    
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

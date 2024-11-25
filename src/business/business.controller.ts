import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';
import { CreateBusinessCardDto } from '../business-cards/dto/create-business-card.dto';
import { BusinessCard } from '../business-cards/entities/business-card.entity';
import { ObjectId } from 'mongoose';
import * as mongoose from "mongoose";
import { SearchDTO } from './dto/search-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}


  //@Query
  //Get vs Post

  @Get("search")
  searchBusiness(@Query() search: SearchDTO) {
    return this.businessService.searchBusiness(search);
  }

  @Post(':id/business-cards')
  addBusinessCard(@Param('id') id: string,
  @Body() businessCard: BusinessCard,
) {
  // console.log("businessCard", businessCard);
  // console.log("business id", id);

  return this.businessService.addBusinessCard(id, businessCard);
}
@Delete(':id/businesscards/:bcId')
deleteBusinessCard(@Param('id') id: string,@Param('bcId') bcId: string): Promise<Business> {
    
  return this.businessService.deleteBusinessCard(id, bcId);
}


  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }
}

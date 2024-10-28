import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessCardsService } from './business-cards.service';
import { CreateBusinessCardDto } from './dto/create-business-card.dto';
import { UpdateBusinessCardDto } from './dto/update-business-card.dto';

@Controller('business-cards')
export class BusinessCardsController {
  constructor(private readonly businessCardsService: BusinessCardsService) {}

  @Post()
  create(@Body() createBusinessCardDto: CreateBusinessCardDto) {
    return this.businessCardsService.create(createBusinessCardDto);
  }

  @Get()
  findAll() {
    return this.businessCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessCardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessCardDto: UpdateBusinessCardDto) {
    return this.businessCardsService.update(+id, updateBusinessCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessCardsService.remove(+id);
  }
}

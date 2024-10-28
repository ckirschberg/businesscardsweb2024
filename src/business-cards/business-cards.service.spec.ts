import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCardsService } from './business-cards.service';

describe('BusinessCardsService', () => {
  let service: BusinessCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCardsService],
    }).compile();

    service = module.get<BusinessCardsService>(BusinessCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

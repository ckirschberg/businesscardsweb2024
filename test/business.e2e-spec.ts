import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { AppModule } from '../src/app.module';
import { TestModule } from '../src/test.module';
import exp from 'constants';
import { BusinessService } from '../src/business/business.service';
import { BusinessCardsService } from '../src/business-cards/business-cards.service';
import { CreateBusinessCardDto } from '../src/business-cards/dto/create-business-card.dto';

describe('BusinessController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let businessService: BusinessService;
  let businessCardService: BusinessCardsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    userService = moduleFixture.get(UsersService);
    businessService = moduleFixture.get(BusinessService);
    businessCardService = moduleFixture.get(BusinessCardsService);

    await userService.deleteMany();
    await businessService.deleteMany();
    await businessCardService.deleteMany();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors) => {
          // Transform errors to include field and message
          const formattedErrors = errors.map((error) => ({
            field: error.property,
            message: Object.values(error.constraints).join(', '),
          }));
  
          // Throw BadRequestException with formatted errors
          return new BadRequestException(formattedErrors);
        },
      }));
    await app.init();
  });


  async function signupValidUser() {
    const createUserDto = {
      username: 'test@test.dk',
      password: 'testtest'
    }
    // ACT
    const { body: result } = await request(app.getHttpServer())
    .post('/auth/signup')
    .send(createUserDto)
    
    return result;
  }
  async function loginValidUser(): Promise<{access_token: string | undefined}> {
    const user = await signupValidUser();
    // ACT
    const { body: result } = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      username: user.username,
      password: user.password
    })
    return result;
  }

  describe('business controller', () => {
    it('should add a valid business card to a business', async () => {
      // Create a business
      // Create a business-card
      // Add business-card to business
      
      // ARRANGE
      const businessResponse = await businessService.create({name: 'Test Business'});
      const businessCardResponse: any = await businessCardService.create(
        {firstname: 'Test', lastname: 'Test', title: 'Test', email: 'test@test.dk', about: 'Test', interests: 'Test'} as CreateBusinessCardDto 
      )
      
      console.log("businessResponse", businessResponse);
      
      

    //   businessCardResponse._id = businessCardResponse._id.toString();
      console.log("businessCardResponse", businessCardResponse);

      // ACT
      const { body: result } = await request(app.getHttpServer())
      .post('/business/'+ businessResponse._id.toString() + '/business-cards')
      .send(businessCardResponse._doc)

      console.log("result", result);
      

      const { body: result2 } = await request(app.getHttpServer())
      .get('/business')
      // ASSERT
    //   expect(result.businessCards).toContainEqual(businessCardResponse);
      
      console.log("result2", result2[0]);
      
    });
    });
});
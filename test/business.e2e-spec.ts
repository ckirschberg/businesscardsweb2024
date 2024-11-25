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
    it('should add a valid business card to a business and retrieve the related data afterwards', async () => {
      // Create a business
      // Create a business-card
      // Add business-card to business
      
      // ARRANGE
      const businessResponse = await businessService.create({name: 'Test Business'});
      const businessCardResponse: any = await businessCardService.create(
        {firstname: 'Test', lastname: 'Test', title: 'Test', email: 'test@test.dk', about: 'Test', interests: 'Test'} as CreateBusinessCardDto 
      )
      // console.log("businessCardResponse", businessCardResponse);

      // ACT
      const { body: result } = await request(app.getHttpServer())
      .post('/business/'+ businessResponse._id.toString() + '/business-cards')
      .send(businessCardResponse._doc)

      expect(result.businessCards[0]).toBeDefined();
      
      const { body: findAll } = await request(app.getHttpServer())
      .get('/business')
      
      // ASSERT
      expect(findAll[0].businessCards[0].firstname).toBe('Test');
      
      // console.log("result2", result2[0]);
      
    });
    it("should find a business with a specific name", async () => {
      // ARRANGE
      const businessResponse = await businessService.create({name: 'Test Business'});
      const businessResponse2 = await businessService.create({name: 'Dont find this'});
      
      // ACT
      const { body: result } = await request(app.getHttpServer())
                                .get('/business/search?name=' + businessResponse.name)

      // console.log("result", result);
      
      // ASSERT
      expect(result[0].name).toEqual('Test Business');
      expect(result.length).toEqual(1);
    });

    it("should find a business card with a specific email", async () => {
      // ARRANGE
      const businessResponse = await businessService.create({name: 'Test Business'});
      const businessResponse2 = await businessService.create({name: 'Dont find this'});
      const businessCardResponse: any = await businessCardService.create(
        {firstname: 'Test', lastname: 'Test', title: 'Test', email: 'test@test.dk', about: 'Test', interests: 'Test'} as CreateBusinessCardDto 
      )
      const response = await businessService.addBusinessCard(businessResponse._id.toString(), businessCardResponse._doc)
// console.log(response);
// console.log("resultTest", resultTest[0].businessCards);
      
      // ACT
      const { body: result } = await request(app.getHttpServer())
                                .get('/business/search?bcEmail=' + businessCardResponse.email)

      // console.log("result", result);
      
      // ASSERT
      expect(result[0].businessCards[0].email).toEqual('test@test.dk');
      expect(result[0].name).toEqual('Test Business');
      expect(result.length).toEqual(1);
    })
    it("should find a business card with a partial firstname", async () => {
      // ARRANGE
      const businessResponse = await businessService.create({name: 'Test Business'});
      const businessResponse2 = await businessService.create({name: 'Dont find this'});
      const businessCardResponse: any = await businessCardService.create(
        {firstname: 'Test', lastname: 'Test', title: 'Test', email: 'test@test.dk', about: 'Test', interests: 'Test'} as CreateBusinessCardDto 
      )
      const response = await businessService.addBusinessCard(businessResponse._id.toString(), businessCardResponse._doc)
      const searchForFirstname = 'te'
      
      // ACT
      const { body: result } = await request(app.getHttpServer())
                                .get('/business/search?bcFirstname=' + searchForFirstname)

      // console.log("result", result);
      
      // ASSERT
      expect(result[0].businessCards[0].firstname).toEqual('Test');
      expect(result[0].name).toEqual('Test Business');
      expect(result.length).toEqual(1);
    })
    it("should get empty result when searching for something that is not there", async () => {
      // ARRANGE
      const businessResponse = await businessService.create({name: 'Test Business'});
      const businessResponse2 = await businessService.create({name: 'Dont find this'});
      const businessCardResponse: any = await businessCardService.create(
        {firstname: 'Test', lastname: 'Test', title: 'Test', email: 'test@test.dk', about: 'Test', interests: 'Test'} as CreateBusinessCardDto 
      )
      const response = await businessService.addBusinessCard(businessResponse._id.toString(), businessCardResponse._doc)
      const searchForFirstname = 'not there'
      
      // ACT
      const { body: result } = await request(app.getHttpServer())
                                .get('/business/search?bcFirstname=' + searchForFirstname)

      // ASSERT
      expect(result.length).toEqual(0);
    })
  });
});

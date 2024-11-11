import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { TestModule } from '../src/test.module';
import { UsersService } from '../src/users/users.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    userService = moduleFixture.get<UsersService>(UsersService);

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          exceptionFactory: (errors) => {
            // Transform errors to include field and message
            const formattedErrors = errors.map((error) => ({
              field: error.property,
              message: Object.values(error.constraints).join(', '),
            }));
    
            // Throw BadRequestException with formatted errors
            return new BadRequestException(formattedErrors);
          },
        })
      );
    await app.init();
    await userService.deleteMany();
  });




  describe('AuthController /auth/signup', () => {
    it('should signup a valid user', async () => {
        
        // Arrange
        const validUser: CreateUserDto = {username: 'test@test.dk', password: 'password'};
        const expectedObject = {username: 'test@test.dk', password: 'password'}

        // Act
        const  { body }  = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(validUser)
          .expect(201) // assert

        expect(body._id).toBeDefined();
        expect(body).toMatchObject(expectedObject);  
      });
      
      it("should not signup an invalid user with invalid username (not email)", async () => {
        // Arrange
        const validUser: CreateUserDto = {username: 'test', password: 'password'};

        // Act
        const  { body }  = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(validUser)
          .expect(400) // assert

          // assert
        expect(body.message[0].message).toEqual("username must be an email")
      });
  });
  
  describe('AuthController /auth/login', () => {
    it('should return a token when logging in', async () => {
        // create a user through the user service
        // login by calling the endpoint

        // Arrange
        await userService.create({username: 'test@test.dk', password: 'password'});

        const { body } = await request(app.getHttpServer())
          .post('/auth/login')
          .send({username: 'test@test.dk', password: 'password'})
          .expect(200) // assert

        expect(body.access_token).toBeDefined();
    })
  });

});

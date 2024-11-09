import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { AppModule } from '../src/app.module';
import { TestModule } from '../src/test.module';
import exp from 'constants';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    userService = moduleFixture.get(UsersService);
    await userService.deleteMany();

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

  describe('/auth/signup (POST)', () => {
    it('should create user with valid input', async () => {
      // ARRANGE
      const createUserDto = {
        username: 'test@test.dk',
        password: 'testtest'
      }
      // ACT
      const { body: result } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(201);


      // ASSERT    
      expect(result.username).toBe('test@test.dk');
      expect(result.password).toBe('testtest');
      expect(result._id).toBeDefined();
    });

    it('should give error message for invalid input', async () => {
      // ARRANGE
      const createUserDto = {
        username: 'test',
        password: 'test'
      }
      // ACT
      const { body: result } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(400);

      // ASSERT 
      expect(result.message[0]["message"]).toBe('username must be an email');
      expect(result.message[1]["message"]).toBe('password must be longer than or equal to 6 characters');
    });
  });

  describe('/auth/login (POST)', () => {
    it('should get access token when logging in', async () => {
      // ARRANGE
      const user = await signupValidUser();
      // ACT
      const { body: result } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: user.username,
        password: user.password
      })
      .expect(200);
      // ASSERT
      expect(result.access_token).toBeDefined();
    });

    it('should get unauthorized exception when login is invalid', async () => {
      // ACT
      await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test'
      })
      .expect(401);
    });
  });
  describe('/auth/profile (GET)', () => {
    it("should access profile with valid token", async () => {
      // ARRANGE
      const user = await loginValidUser();
      // ACT
      const { body: result } = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${user.access_token}`)
      .expect(200);
      // ASSERT
      expect(result.username).toBe("test@test.dk");
    });
    it("should get unauthorized exception with invalid token", async () => {
      // ACT
      await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

});

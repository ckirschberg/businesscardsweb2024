
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema'

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  
  async deleteMany() {
    return this.userModel.deleteMany({}).exec();
  }
  
//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
//   }

//   async remove(id: string): Promise<User> {
//     return this.userModel.findByIdAndRemove(id).exec();
//   }
}
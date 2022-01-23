import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getLoggedInUserDetails(user: User): Promise<User> {
    return await this.userModel.findById(user._id, {
      password: 0,
      _id: 0,
    });
  }
}

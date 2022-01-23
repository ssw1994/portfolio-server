import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/auth-credentials.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Cart, CartDocument } from '../shop/carts/schemas/cart.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(credentials: CreateUserDto): Promise<void> {
    const { username, password } = credentials;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCart = new this.cartModel({ products: [] });
    await userCart.save();
    const user = new this.userModel({
      username,
      password: hashedPassword,
      tasks: [],
      skills: [],
      cartId: userCart._id,
    });
    try {
      await user.save();
    } catch (error) {
      //   if (error == '') {
      //       throw
      //   }
      console.error(error);
    }
  }

  async signIn(credentials: CreateUserDto): Promise<{ accessToken: string }> {
    const { username, password } = credentials;
    const user = await this.userModel.findOne({ username });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}

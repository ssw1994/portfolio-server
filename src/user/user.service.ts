import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { CreateAddressDto } from './dtos/address.dto';
import {
  Address,
  AddressDocument,
} from '../shop/orders/schemas/address.schema';
import {
  Contact,
  ContactDocument,
} from '../shop/orders/schemas/contacts.schema';
import { CreateContactDto } from './dtos/createcontact.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}
  async getLoggedInUserDetails(user: User): Promise<User> {
    return await this.userModel.findById(user._id, {
      password: 0,
      _id: 0,
    });
  }

  async addAddress(address: CreateAddressDto, user: User): Promise<Address> {
    const {
      country,
      state,
      city,
      postal_code,
      street_name,
      street_number,
      isCurrentAddress,
      stateName,
      countryName,
      addressType,
      userId,
      _id,
      landMark,
    } = address;

    const payload = {
      country,
      state,
      city,
      postal_code,
      street_name,
      street_number,
      isCurrentAddress,
      userId: userId ? userId : user._id,
      countryName,
      stateName,
      addressType,
      landMark,
    };

    let addressDoc;
    if (!_id) {
      addressDoc = new this.addressModel(payload);
      return addressDoc.save();
    } else {
      addressDoc = await this.addressModel.findByIdAndUpdate(_id, payload);
      return addressDoc;
    }
  }

  async getExitingUserAddresses(user: User) {
    return this.addressModel.find({ userId: user._id });
  }

  async createContact(user: User, contact: CreateContactDto): Promise<Contact> {
    const { firstName, lastName, mobile, email, _id } = contact;
    const payload = {
      firstName,
      lastName,
      mobile,
      email,
      userId: user._id,
    };
    let contactDoc;
    if (!_id) {
      contactDoc = new this.contactModel(payload);
      return contactDoc.save();
    } else {
      contactDoc = await this.contactModel.findByIdAndUpdate(_id, payload);
      return contactDoc;
    }
  }
}

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { Skill, SkillDocument } from './schema/skill.schema';
import { ISkill } from './skill.model';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}
  async addSkill(skills: CreateSkillDto[], user: User): Promise<ISkill[]> {
    const allSkillsDocs = skills.map((skill) => {
      const { skillName, tags, experience, description } = skill;

      return new this.skillModel({
        skillName,
        tags,
        experience,
        description,
        userId: user._id,
      });
    });

    try {
      let details = await this.skillModel.insertMany(allSkillsDocs);
      return details;
    } catch (error) {
      console.error(error);
    }
  }

  async getSkills(user: User): Promise<ISkill[]> {
    return this.skillModel.find({ userId: user._id }).exec();
  }

  async deleteSkill(id: string): Promise<ISkill> {
    try {
      const deleted = await this.skillModel.findByIdAndRemove(id);
      return deleted;
    } catch (error) {
      throw new NotFoundException(`skill with id ${id} not found`);
    }
  }
}

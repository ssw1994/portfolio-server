import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ISkill } from './skill.model';
import { SkillService } from './skill.service';

@UseGuards(AuthGuard())
@Controller('skills')
export class SkillController {
  constructor(public skilservice: SkillService) {}

  @Post()
  async addSkill(
    @Body() body: { skills: CreateSkillDto[] },
    @GetUser() user: User,
  ): Promise<ISkill[]> {
    return await this.skilservice.addSkill(body.skills, user);
  }

  @Get()
  async getSkills(@GetUser() user: User): Promise<ISkill[]> {
    return await this.skilservice.getSkills(user);
  }

  @Delete('/:id')
  async deleteSkill(@Param('id') id: string): Promise<ISkill> {
    return await this.skilservice.deleteSkill(id);
  }
}

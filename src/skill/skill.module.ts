import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Skill, SkillSchema } from './schema/skill.schema';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    AuthModule,
  ],
})
export class SkillModule {}

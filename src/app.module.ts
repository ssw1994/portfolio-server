import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SkillModule } from './skill/skill.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
@Module({
  imports: [
    BlogsModule,
    TaskModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/dev',
      //'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
      //'mongodb+srv://esachin:ssw1994@cluster0.xd6pt.mongodb.net/tasks?retryWrites=true&w=majority',
    ),
    AuthModule,
    SkillModule,
    UserModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

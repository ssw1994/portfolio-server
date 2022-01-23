import { Controller, Get, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Get()
  blogs() {
    return this.blogService.getBlogs();
  }

  @Get(':/id')
  getBlogDetails() {
    return this.blogService.getBlogDetails();
  }

  @Post()
  createBlog() {
    return this.blogService.createBlogs();
  }
}

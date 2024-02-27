import { Body, Controller, Get, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostCreationDto } from './dto/post-creation.dto'

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) { }
    
    @Get()
    getAllPosts() {
        return this.postsService.getAll()
    }

  @Post('create')
  createPost(@Body() dto: PostCreationDto) {
    return this.postsService.create(dto)
  }
}

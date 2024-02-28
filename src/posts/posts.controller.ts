import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostCreationDto } from './dto/post-creation.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAll()
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getById(id)
  }

  @Get('image/:postId')
  getPostImageById(@Param('postId') postId: number) {
    return this.postsService.getPostImageById(postId)
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Req() req: Request, @Body() dto: PostCreationDto, @UploadedFile() image: any) {
    const protocol = req.protocol
    const host = req.get('Host')
    const origin = `${protocol}://${host}/`

    return this.postsService.create(dto, image, origin)
  }

  @Delete(':id')
  deletePost(@Param('id') id: number) {
    return this.postsService.delete(id)
  }
}

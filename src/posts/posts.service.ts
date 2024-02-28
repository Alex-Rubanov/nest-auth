import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from './posts.model'
import { PostCreationDto } from './dto/post-creation.dto'
import { FilesService } from '../files/files.service'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  async getAll() {
    return await this.postRepository.findAll({ include: { all: true } })
  }

  async getById(id: number) {
    return await this.postRepository.findOne({ where: { id }, include: { all: true } })
  }

  async getPostImageById(id: number) {
    const post = await this.postRepository.findOne({ where: { id }, raw: true })

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }

    return { imageUrl: post.imageUrl }
  }

  async create(dto: PostCreationDto, image: any, origin: string) {
    const fileName = await this.filesService.createFile(image)
    const filePath = origin + fileName

    return await this.postRepository.create({ ...dto, imageUrl: filePath })
  }

  async delete(id: number) {
    try {
      await this.postRepository.destroy({ where: { id } })

      return { message: 'Post was successfully deleted' }
    } catch (err) {
      throw new HttpException('Error occurred while deleting post', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

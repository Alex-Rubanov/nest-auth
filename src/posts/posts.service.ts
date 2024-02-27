import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from './posts.model'
import { PostCreationDto } from './dto/post-creation.dto'

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async getAll() {
    return await this.postRepository.findAll({ include: { all: true } })
  }

  async create(dto: PostCreationDto) {
    const post = await this.postRepository.create({ ...dto })
    return post
  }
}

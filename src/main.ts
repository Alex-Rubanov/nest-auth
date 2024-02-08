import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { SwaggerConfig } from './config/configuration'

const start = async () => {
  const PORT = process.env.PORT ?? 5001

  const app = await NestFactory.create(AppModule)
  const document = SwaggerModule.createDocument(app, SwaggerConfig)

  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => console.log(`Server has started on port ${PORT}...`))
}

start()

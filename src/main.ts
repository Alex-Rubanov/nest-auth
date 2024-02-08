import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const start = async () => {
  const PORT = process.env.PORT ?? 5001

  const app = await NestFactory.create(AppModule)

  await app.listen(PORT, () => console.log(`Server has started on port ${PORT}...`))
}

start()
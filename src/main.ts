import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './shared/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appliationPort = configuration().port;

  await app.listen(appliationPort, () => {
    console.log(`Fastfeet is running in port ${appliationPort}`);
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './shared/config/configuration';
import { HttpExceptionFilter } from './shared/errors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appliationPort = configuration().port;

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appliationPort, () => {
    console.log(`Fastfeet is running in port ${appliationPort}`);
  });
}
bootstrap();

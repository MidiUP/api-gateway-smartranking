import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = (): any => {
    return momentTimezone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(8080);
}
bootstrap();
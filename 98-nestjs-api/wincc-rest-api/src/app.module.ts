import { Module, MiddlewareConsumer, CacheModule } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { AppService } from './app.service';
import { WinCCRuntimeModule } from './wincc-runtime/wincc-runtime.module';
import { LoggerMiddleware } from './logger.middleware';
import { UserConfigService } from './user-config/user-config.service';
import { UserConfigController } from './user-config/user-config.controller';

@Module({
  imports: [
    WinCCRuntimeModule,
    CacheModule.register({
      max: 100,
      ttl: 1,
    }),
  ],
  controllers: [TagsController, UserConfigController],
  providers: [AppService, UserConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}

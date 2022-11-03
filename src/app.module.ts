import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [MikroOrmModule.forRoot(), CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

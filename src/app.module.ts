import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserRepository } from './user-repository/user-repository';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}

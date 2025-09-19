import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TeacherModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

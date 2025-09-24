import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/db.service';

@Module({
  imports:[
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        secret: config.get('JWT_SECRET'),
        signOptions: {expiresIn: '3600s'}
      })

    })
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],

})
export class AuthModule {}

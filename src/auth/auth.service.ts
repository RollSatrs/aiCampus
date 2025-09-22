import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/db.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ){console.log('AuthService создан')}

    async register(@Body() dto: RegisterDto){
        const existing = await this.prisma.user.findUnique({where: {email: dto.email}})
        if (existing) throw new Error('Пользователь с этим адресом электронной почты уже существует.');
        const hashed = await bcrypt.hash(dto.password, 10);
        if(dto.role === 'TEACHER'){
            const user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: dto.password,
                    role: 'TEACHER',

                }
            })
        }
    }
}

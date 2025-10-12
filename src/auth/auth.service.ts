import { Body, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/db.service';
import { RegisterDto, RegisterDtoResponse } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { access } from 'fs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) { console.log('AuthService создан') }

    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) throw new Error('Пользователь с этим адресом электронной почты уже существует.');

        const hashed = await bcrypt.hash(dto.password, 10);

        let user;
        if (dto.role === 'TEACHER') {
            user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: hashed,
                    role: 'TEACHER',
                    teacher: { create: { department: dto.department ?? '' } }
                },
                include: { teacher: true }
            });
        }
        else if (dto.role === 'STUDENT') {
            user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: hashed,
                    role: 'STUDENT',
                    student: {
                        create: { department: dto.department ?? '' }
                    },
                },
                include: { student: true }
            });
        }
        else { // ADMIN
            user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: hashed,
                    role: 'ADMIN',
                }
            });
        }



        // создаём JWT
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwt.signAsync(payload);

        return {
            access_token: token
        };
    }

    async login(email: string, password: string) {
        console.log('login')
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) { throw new UnauthorizedException('Недействительные учетные данные') }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            throw new HttpException('Неверный email или пароль', HttpStatus.UNAUTHORIZED )

        }
        const payload = { sub: user.id, email: user.email, role: user.role }
        const token = await this.jwt.signAsync(payload)
        return {
            message: 'Вкод успешный',
            access_token: token,
        }
    }
}

import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
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
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
        if (existing) throw new Error('Пользователь с этим адресом электронной почты уже существует.');
        const hashed = await bcrypt.hash(dto.password, 10);
        if (dto.role === 'TEACHER') {
            const user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: hashed,
                    role: 'TEACHER',
                    teacher: { create: { department: dto.departmen ?? '' } }
                },
                include: { teacher: true }
            })
            return plainToInstance(RegisterDtoResponse, user)
        }
        if (dto.role === 'STUDENT') {
            const user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: hashed,
                    role: 'STUDENT',
                }
            })
            delete (user as any).password
            return user
        }
        if (dto.role === 'ADMIN') {
            const user = await this.prisma.user.create({
                data: {
                    fullname: dto.fullname,
                    email: dto.email,
                    password: hashed,
                    role: 'ADMIN',
                }
            })
            delete (user as any).password
            return user
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) { throw new UnauthorizedException('Недействительные учетные данные') }
        const match = await bcrypt.compare(password, user.password)
        if (!match) { throw new UnauthorizedException('Пароль неверный') }
        const payload = { sub: user.id, email: user.email, role: user.role }
        const token = await this.jwt.signAsync(payload)
        return {
            access_token: token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        }
    }
}

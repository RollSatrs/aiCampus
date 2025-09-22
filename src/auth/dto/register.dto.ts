import { OmitType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    fullname: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    role?: 'STUDENT' | 'TEACHER' | 'ADMIN'

    @IsOptional()
    @IsString()
    departmen?: string
}

export class RegisterDtoResponse extends OmitType(RegisterDto, ['password']) {
}
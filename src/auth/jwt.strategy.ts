import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/database/db.service";
import { JwtPayload } from "../auth/interfaces/jwt-payload.interface"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private prisma: PrismaService, private configEnv: ConfigService){
        if(!configEnv.get('JWT_SECRET')){
            throw new Error('JWT_SECRET не найден')
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configEnv.get<string>('JWT_SECRET', 'secret'),
        })
    }
    async validate(payload: JwtPayload){
        const user = await this.prisma.user.findUnique({where:{id: payload.sub}})
        if(!user) return null
        const {password, ...rest} = user
        console.log(rest)
        return rest
    }
}
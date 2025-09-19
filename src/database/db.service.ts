import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
  async onModuleInit() {
    await this.$connect(); // подключаемся к базе при старте
  }

  async onModuleDestroy() {
    await this.$disconnect(); // отключаемся при остановке приложения
  }
}


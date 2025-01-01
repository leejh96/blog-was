import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma } from './prisma.client';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // 모듈 초기화 시 데이터베이스 연결
    await this.$connect(); // Prisma 연결
    console.log('Prisma connected');
  }

  async onModuleDestroy() {
    // 모듈 종료 시 데이터베이스 연결 종료
    await this.$disconnect(); // Prisma 연결 종료
    console.log('Prisma disconnected');
  }

  async transaction<T>(callback: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.$transaction(async (prisma) => {
      return callback(prisma);
    });
  }

  get client() {
    return prisma; // PrismaClient를 반환
  }
}

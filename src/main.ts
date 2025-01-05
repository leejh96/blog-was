import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true, // DTO로 자동 변환 (class-transformer 사용)
            whitelist: true, // DTO에 정의되지 않은 속성 제거
            forbidNonWhitelisted: true, // 허용되지 않은 속성이 요청에 포함되면 에러 반환
        }),
    );

    const configService = app.get(ConfigService);
    const port = configService.get<string>('PORT') || 3000;
    await app.listen(port);

    console.log(`${port}포트 서버 실행중 ...`);
}
bootstrap();

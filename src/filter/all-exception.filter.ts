import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 기본 상태 코드와 메시지 설정
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // 1. HTTP 예외 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message || 'HTTP Exception occurred';
    }
    // 2. Prisma 예외 처리
    else if (exception instanceof PrismaClientKnownRequestError) {
      // Prisma 에러 코드에 따른 상태 코드 및 메시지 설정
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'Duplicate entry detected';
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
      } else if (exception.code === 'P2003') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
      } else {
        message = 'Unexpected database error occurred';
      }
    }
    // 3. 기타 예외 처리
    else if (exception instanceof Error) {
      message = exception.message || 'Unexpected error occurred';
    }

    // 클라이언트 응답
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { utcToKst } from 'share/util/dayjs';
import { duplicatedData } from 'share/error-msg/server';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 기본 상태 코드와 메시지 설정
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    // 1. HTTP 예외 처리
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        if (Array.isArray(exceptionResponse.message)) {
          // ValidationPipe의 에러 처리
          message = exceptionResponse.message[0]; // 배열 형태의 메시지 가져오기
        } else if (typeof exceptionResponse.message === 'string') {
          // JWT Error 처리
          message = exceptionResponse.message; // 배열 형태의 메시지 가져오기
        }
      } else {
        message = exception.message || 'HTTP Exception occurred';
      }
    } else if (exception instanceof PrismaClientKnownRequestError) {
      // 2. Prisma 예외 처리
      // Prisma 에러 코드에 따른 상태 코드 및 메시지 설정
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = duplicatedData(exception.meta.modelName, exception.meta.target);
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
      } else if (exception.code === 'P2003') {
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
      } else {
        message = 'Unexpected database error occurred';
      }
    } else if (exception instanceof Error) {
      // 3. 기타 예외 처리
      message = exception.message || 'Unexpected error occurred';
    }
    // 클라이언트 응답
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: utcToKst(new Date()),
      path: request.url,
    });
  }
}

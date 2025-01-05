import { HttpStatus } from "@nestjs/common";
import { successMsg, failMsg } from "share/error-msg/dto";

export const defaultSuccessRes = {
    success: true,
    statusCode: HttpStatus.OK,
    message: successMsg,
};

export const defaultFailRes = {
    success: false,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: failMsg,
};
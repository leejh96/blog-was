export const serverError =
    '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
export const existUser = '이미 존재하는 유저입니다.';
export const notExistUser = '존재하지 않는 유저입니다.';
export const invalidPassword = '적절하지 않은 비밀번호입니다.';
export const notExistAuthHeader = 'Authorization 헤더가 없습니다.';
export const invalidToken = '유효하지 않은 토큰입니다.';
export const existPostCategory = '이미 존재하는 카테고리입니다.';
export const isNotAuthUser = '인증되지 않은 유저입니다.';
export const notExistCategory = '존재하지 않는 카테고리입니다.'
// prisma 용
export const duplicatedData = (model, target) =>
    `${model}의 ${target} 값이 이미 존재하는 값 입니다.`;

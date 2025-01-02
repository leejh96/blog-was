export const invalidPassword = '비밀번호는 최소 8자리, 최대 20자리 이며 영문자와 숫자를 조합해야 합니다.';
export const invalidEmailForm = '올바른 이메일 형식을 입력하세요.';
export const invalidString = (field: string) => `${field}이(가) 문자열이 아닙니다.`;
export const invalidLength = (field: string, max: number) => `${field}은(는) 최대 ${max}자까지 입력 가능합니다.`;
export const invalidCharacter = (field: string, min:number, max:number) => {
    if (field === '태그') {
        return `${field}은(는) 최소 ${min} 최대 ${max}자이며, 영문자, 숫자, 한글만 포함될 수 있습니다.`
    } else {
        return `${field}은(는) 최소 ${min} 최대 ${max}자이며, 영문자나 한글만 포함될 수 있습니다.`
    }
};
export const invalidPhoneNumber = '유효하지 않은 전화번호 형식입니다.';
export const invalidNumber = (field: string) => `${field}이(가) 숫자가 아닙니다.`;
export const invalidFiled = (field: string) => `유효하지 않은 ${field}입니다.`;
export const invalidJwtToken = 'JWT 토큰 형식이 유효하지 않습니다.'
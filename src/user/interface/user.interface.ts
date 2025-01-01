import { USER_GENDER, USER_PROVIDER, USER_ROLE, USER_STATUS } from "share/var/user.enum";

export interface User {
    userIdx: number,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    nickname: string,
    tag: string,
    phoneNumber: string,
    gender: USER_GENDER,
    role: USER_ROLE,
    provider: USER_PROVIDER,
    dateOfBirth: Date,
    status: USER_STATUS,
    profileImage: string | null,
    enable: boolean,
    createdAt: Date,
    updatedAt: Date,
};
type SignupUserOmittedFields = 'userIdx' | 'enable' | 'createdAt' | 'updatedAt';
export interface SignupUserInfo extends Omit<User, SignupUserOmittedFields> {}
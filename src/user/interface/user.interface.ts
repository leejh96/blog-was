import {
    USER_GENDER,
    USER_PROVIDER,
    USER_ROLE,
    USER_STATUS,
} from 'share/var/user.enum';

export interface User {
    userIdx: number;
    email: string;
    name: string;
    nickname: string;
    password: string;
    gender?: USER_GENDER;
    role: USER_ROLE;
    lastLoginTime?: Date | string;
    status: USER_STATUS;
    enable: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}
type SignupUserOmittedFields =
    | 'userIdx'
    | 'enable'
    | 'createdAt'
    | 'updatedAt'
    | 'lastLoginTime'
    | 'dateOfBirth'
    | 'profileImage'
    | 'provider';
export interface SignupUserInfo extends Omit<User, SignupUserOmittedFields> {}

type UserOmittedFields = 'password' | 'enable' | 'createdAt' | 'updatedAt';
export interface UserInfo extends Omit<User, UserOmittedFields> {}

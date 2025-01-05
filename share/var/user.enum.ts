export enum USER_STATUS {
    INACTIVE, // 비활성화 상태
    ACTIVE, // 활성화 상태
    SUSPENDED, // 일시 정지 상태
    BANNED, // 영구 정지 상태
    DELETED, // 삭제된 상태
}

export enum USER_ROLE {
    USER,
    ADMIN,
}

export enum USER_GENDER {
    MALE,
    FEMALE,
    OTHER,
}

export enum USER_PROVIDER {
    LOCAL,
    GOOGLE,
}

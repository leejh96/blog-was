// import dayjs from 'dayjs';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

// 플러그인 로드
dayjs.extend(utc);
dayjs.extend(timezone);

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const dateFormat = 'YYYY-MM-DD';
// kst -> utc
export const kstToUtc = (kst) => dayjs.tz(kst, 'Asia/Seoul').toDate();

// utc -> kst
export const utcToKst = (utc) =>
    dayjs(utc).tz('Asia/Seoul').format(dateTimeFormat);

// 현재 UTC 시간
export const nowUtc = dayjs().utc().format();

// 입력한시간 Date로 포매팅
export const formatDate = (time) => dayjs(time).format(dateFormat);

import MessageBundle from './utils/MessageBundle';

export const mdyCalendarBundle = new MessageBundle(
  {
    de: 'dd.MM.yyyy', // 26.02.1988
    en: 'MM/dd/yyyy', // 02/26/1988
    ja: 'yyyy/MM/dd', // 1988/02/26
    ko: 'yyyy.MM.dd', // 1988.02.26
    nl: 'dd-MM-yyyy', // 26-02-1988
    ru: 'dd.MM.yyyy', // 26.02.1988
    tr: 'dd.MM.yyyy', // 26.02.1988
    zh: 'yyyy年LLLd日', // 2016年Feb26日
  },
  {
    default: 'dd/MM/yyyy', // 26/02/1988
  },
);

export const myCalendarBundle = new MessageBundle(
  {
    de: 'MM.yy', // 02.88
    ja: 'yy/MM', // 88/02
    ko: 'yy.MM', // 88.02
    nl: 'MM-yy', // 02-88
    ru: 'MM.yy', // 02.88
    tr: 'MM.yy', // 02.88
    zh: 'yy年LLL', // 88年Feb
  },
  {
    default: 'MM/yy', // 02/88
  },
);

export const timeBundle = new MessageBundle(
  {
    en: 'h:mma', // 10:25PM
    es: 'H:mm', // 22:25 (no zero)
    ko: 'a h:mm', // PM 10:25
  },
  {
    default: 'HH:mm', // 22:25
  },
);

export const dateMicroBundle = new MessageBundle(
  {
    de: 'd. LLL', // 1. Jan
    en: 'LLL d', // Jan 1
    es: "d 'de' LLL", // 1 de Jan
    ja: 'M月d日', // 1月1日
    ko: 'LLL d일', // Jan 1일
    pt: "d 'de' LLL", // 1 de Jan
    ru: 'd LLL г.', // 1 Jan г.
    zh: 'LLLd日', // Jan1日
  },
  {
    default: 'd LLL', // 1 Jan
  },
);

export const dateShortBundle = new MessageBundle(
  {
    de: 'd. LLL yy', // 1. Jan 16
    en: 'LLL d, yy', // Jan 1, 16
    es: "d 'de' LLL 'de' yy", // 1 de Jan de 16
    ja: 'yy年M月d日', // 16年1月1日
    ko: 'yy년 LLL d일', // 16년 Jan 1일
    pt: "d 'de' LLL 'de' yy", // 1 de Jan de 16
    ru: 'd LLL yy г.', // 1 Jan 16 г.
    zh: 'yy年LLLd日', // 2016年Jan1日
  },
  {
    default: 'd LLL yy', // 1 Jan 16
  },
);

export const dateMediumBundle = new MessageBundle(
  {
    de: 'dd. LLL yyyy', // 01. Jan 2016
    en: 'LLL dd, yyyy', // Jan 01, 2016
    es: "dd 'de' LLL 'de' yyyy", // 01 de Jan de 2016
    ja: 'yyyy年M月dd日', // 2016年1月01日
    ko: 'yyyy년 LLL dd일', // 2016년 Jan 01일
    pt: "dd 'de' LLL 'de' yyyy", // 01 de Jan de 2016
    ru: 'dd LLL yyyy г.', // 01 Jan 2016 г.
    zh: 'yyyy年LLLdd日', // 2016年Jan01日
  },
  {
    default: 'dd LLL yyyy', // 01 Jan 2016
  },
);

export const dateLongBundle = new MessageBundle(
  {
    de: 'd. LLLL yyyy', // 1. January 2016
    en: 'LLLL d, yyyy', // January 1, 2016
    es: "d 'de' LLLL 'de' yyyy", // 1 de January de 2016
    ja: 'yyyy年M月d日', // 2016年1月1日
    ko: 'yyyy년 LLLL d일', // 2016년 January 1일
    pt: "d 'de' LLLL 'de' yyyy", // 1 de January de 2016
    ru: 'd LLLL yyyy г.', // 1 January 2016 г.
    zh: 'yyyy年LLLLd日', // 2016年January1日
  },
  {
    default: 'd LLLL yyyy', // 1 January 2016
  },
);

export const rangeFromDayBundle = new MessageBundle(
  {
    de: 'd. LLL', // 1. Jan
    en: 'LLL d', // Jan 1
    es: "d 'de' LLL", // 1 de Jan
    ja: 'M月d日', // 1月1日
    ko: 'LLL d일', // Jan 1일
    pt: "d 'de' LLL", // 1 de Jan
    ru: 'd LLL г.', // 1 Jan г.
    zh: 'LLLd日', // Jan1日
  },
  {
    default: 'd LLL', // 1 Jan
  },
);

export const rangeToDayBundle = new MessageBundle(
  {
    de: 'd. yyyy', // 1. 2016
    en: 'd, yyyy', // 1, 2016
    es: "d 'de' yyyy", // 1 de 2016
    ja: 'yyyy年d日', // 2016年1日
    ko: 'yyyy년 d일', // 2016년 D일
    pt: "d 'de' yyyy", // 1 de 2016
    ru: 'd yyyy г.', // 1 2016 г.
    zh: 'yyyy年d日', // 2016年1日
  },
  {
    default: 'd yyyy', // 1 2016
  },
);

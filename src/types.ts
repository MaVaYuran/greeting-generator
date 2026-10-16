export enum OccasionType {
  BIRTHDAY = 'День Рождения',
  NEW_YEAR = 'Новый Год',
}

export enum ToneType {
  OFICCIAL = 'Официальный',
  FRIENDLY = 'Дружеский',
  ROMANTIC = 'Романтический',
  HUMOROUS = 'Юмористический',
  TOUCHING = 'Трогательный',
  ADULT = '18+',
}

export type LanguageType = 'Русский' | 'Белорусский' | 'English' | 'Polski' | 'Turkce' | 'Deutsch';
// export const OccasionType = {
//   BIRTHDAY: 'День Рождения',
//   NEW_YEAR: 'Новый Год',
// } as const;
// export type OccasionType = (typeof OccasionType)[keyof typeof OccasionType];

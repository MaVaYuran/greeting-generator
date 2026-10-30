import { Globe, ImageIcon } from 'lucide-react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { LANGUAGES } from '../constants-l';
import type { LanguageType, ToneType } from '../types';
import { ToneSelector } from './ToneSelector';

interface IExtraDetailSectionProps {
  error: string | null;
  language: string;
  selectedTone: ToneType;
  isImageEnabled: boolean;
  setIsImageEnabled: Dispatch<SetStateAction<boolean>>;
  setTone: Dispatch<SetStateAction<ToneType>>;
  setLanguage: Dispatch<SetStateAction<LanguageType>>;
}

export const ExtraDetailsSection: FC<IExtraDetailSectionProps> = ({
  error,
  language,
  selectedTone,
  isImageEnabled,
  setIsImageEnabled,
  setTone,
  setLanguage,
}) => {
  return (
    <section className="space-y-4">
      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-sm">
          3
        </span>
        Настройки
      </h3>

      {/* выбор тона */}
      <ToneSelector selectedTone={selectedTone} setTone={setTone} />

      <div className="grid grid-cols-1 sm:grid-cals-2 mt-4 gap-4 ">
        <div className="relative group">
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Язык
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 pl-3 left-0 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-gray-400  group-focus-within:text-purple-500 transition-colors" />
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as LanguageType)}
              className="block w-full pl-9 pr-8 py-3 bg-white border-2 border-gray-100 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all appearance-none cursor-pointer">
              {LANGUAGES.map(lang => (
                <option value={lang} key={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <label
          className={`relative flex items-center p-3 rounded-xl border-2 cursor-pointer w-full h-[52px] mt-6 transition-all duration-200 select-none
          ${isImageEnabled ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white hover:border-purple-200'}
          `}>
          <input
            type="checkbox"
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 accent-purple-600"
            checked={isImageEnabled}
            onChange={e => setIsImageEnabled(e.target.checked)}
          />
          <span
            className={`ml-3 text-sm font-medium ${isImageEnabled ? 'text-purple-700' : 'text-gray-700'}`}>
            Сгенерировать открытку
          </span>
          {isImageEnabled && <ImageIcon className="w-4 h-4 ml-auto text-purple-600" />}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm ml-1 animate-pulse">{error}</p>}
    </section>
  );
};

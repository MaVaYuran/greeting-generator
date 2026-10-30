import { Calendar, Heart, User } from 'lucide-react';
import type { FC, Dispatch, SetStateAction } from 'react';

interface IUserDetailSectionProps {
  name: string;
  age: string;
  interests: string;
  error: string | null;
  setName: Dispatch<SetStateAction<string>>;
  setAge: Dispatch<SetStateAction<string>>;
  setInterests: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string | null>>;
}
export const UserDetailsSection: FC<IUserDetailSectionProps> = ({
  name,
  age,
  interests,
  error,
  setName,
  setAge,
  setInterests,
  setError,
}) => {
  return (
    <section className="space-y-4">
      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-sm">
          2
        </span>
        О получателе
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 relative group">
          <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Имя *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 pl-3 left-0 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              className={`
                block w-full pl-9 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all
                ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-purple-500 '}
                `}
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Maria"
            />
          </div>
        </div>
        <div className="col-span-1 relative group">
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Возраст</label>
          <div className="relative">
            <div className="absolute inset-y-0 pl-3 left-0 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            </div>
            <input
              className="block w-full pl-9 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all
               border-gray-100 focus:border-purple-500"
              type="number"
              min={1}
              max={150}
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="18"
            />
          </div>
        </div>
      </div>
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
          Интересы и увлечения
        </label>
        <div className="relative">
          <div className="absolute top-3.5 left-3 flex items-start pointer-events-none">
            <Heart className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <textarea
            value={interests}
            onChange={e => setInterests(e.target.value)}
            rows={2}
            placeholder="Путешествия, кодинг, котики"
            className="block  w-full pl-9 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all
               border-gray-100 focus:border-purple-500 resize-none"
          />
        </div>
      </div>
    </section>
  );
};

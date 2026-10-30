import { Cake, Snowflake, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { OccasionType, ToneType, type LanguageType } from './types';
import { generateGreeting, generateGreetingImage } from './services/gemini-service';
import Header from './components/Header';
import AppTitle from './components/AppTitle';
import { OccasionButton } from './components/OccasionButton';
import { UserDetailsSection } from './components/UserDetailsSection';
import { ExtraDetailsSection } from './components/ExtraDetailsSection';
import { GenerateButton } from './components/GenerateButon';
import { ResultSection } from './components/ResultSection';

function App() {
  const [occasion, setOccasion] = useState<OccasionType>(OccasionType.BIRTHDAY);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [tone, setTone] = useState<ToneType>(ToneType.OFICCIAL);
  const [language, setLanguage] = useState<LanguageType>('Polski');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [generatedImageURL, setGeneratedImageURL] = useState<string | null>(null);
  const [isImageEnabled, setIsImageEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (): Promise<void> => {
    if (!name.trim()) {
      setError('Пожалуйста введите имя адресата');
      return;
    }
    setError(null);
    setLoading(true);
    setGeneratedText('');
    setGeneratedImageURL(null);

    try {
      const tasks: Promise<any>[] = [
        generateGreeting(occasion, name, age, interests, tone, language),
      ];
      if (isImageEnabled) {
        tasks.push(generateGreetingImage(occasion, tone, interests));
      }

      const results = await Promise.all(tasks);
      const textResult = results[0];
      setGeneratedText(textResult);
      if (isImageEnabled && results[1]) {
        setGeneratedImageURL(results[1]);
      }
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ff]">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 sm:py-12 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <AppTitle />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Левая колонка */}
            <div className="lg:col-span-5 space-y-10">
              {/* Выбор  типа праздника */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">
                      1
                    </span>
                    Выберите праздник
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <OccasionButton
                    label={OccasionType.BIRTHDAY}
                    icon={Cake}
                    selected={occasion === OccasionType.BIRTHDAY}
                    onClick={() => setOccasion(OccasionType.BIRTHDAY)}
                  />
                  <OccasionButton
                    label={OccasionType.NEW_YEAR}
                    icon={Snowflake}
                    selected={occasion === OccasionType.NEW_YEAR}
                    onClick={() => setOccasion(OccasionType.NEW_YEAR)}
                  />
                </div>
              </section>
              {/* 2section  */}
              <UserDetailsSection
                name={name}
                age={age}
                interests={interests}
                error={error}
                setName={setName}
                setAge={setAge}
                setInterests={setInterests}
                setError={setError}
              />
              <ExtraDetailsSection
                error={error}
                language={language}
                selectedTone={tone}
                isImageEnabled={isImageEnabled}
                setIsImageEnabled={setIsImageEnabled}
                setTone={setTone}
                setLanguage={setLanguage}
              />
              <GenerateButton onClick={handleGenerate} isLoading={loading}>
                <Sparkles
                  className={`w-5 h-5 ${loading ? 'animate-spin' : 'group-hover:animate-pulse'}`}
                />
                {loading ? 'Сочиняем...' : 'Сгенерировать'}
              </GenerateButton>
            </div>
            {/* Правая колонка */}
            <div className="lg:col-span-7 h-full">
              <ResultSection
                isLoading={loading}
                content={generatedText}
                imageURL={generatedImageURL}
              />
            </div>
            {/* <div className="lg:col-span-7 h-full">{generatedText}</div> */}
          </div>

          <br />
        </div>
      </main>
    </div>
  );
}

export default App;

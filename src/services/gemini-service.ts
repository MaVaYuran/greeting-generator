import { GoogleGenAI } from '@google/genai';
import { OccasionType, ToneType, type LanguageType } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType,
): Promise<string> => {
  try {
    const prompt = `
    Напиши уникальное поздравление на языке: ${language}.

    Повод:${occasion},
   Для кого: ${name},
   Возраст: ${age ? age : 'Не указан'},
   Интересы/хобби:${interests ? interests : 'Не указаны'},
   Тон: ${tone}  
   
   Инструкции по стилю (адаптируй под культурный контекст языка ${language} ):
   -Официальный: сдержанный, уважительный.
   -Дружеский: тёплый, неформальный.
   -Юмористический: весёлый, забавный, с добрпой шуткой.
   -Романтический: нежный, любящий, чувственный.
   -Трогательный: душевный, эмоциональный.
   - 18+: дерзкое, с перчинкой, сарказмом или взрослыми шутками (только если уместно для контекста 18+).

   Общие требования:
   - Обязательно учитывай возраст и интересы человека.
   - Длина: от 2 до 5 предложений.
   - Используй 2-3 подходящих эмодзи.
   - Форматороание: просто текст, без markdown заголовков.
   - Язык ответа: строго ${language}. 
   `;
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        temperature: tone === ToneType.ADULT ? 0.9 : 0.8,
      },
    });

    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (generatedText) {
      console.log('[generateGreeting]', generatedText);
    } else {
      console.warn('[generatedGreeting] Текст не найден в ответе API');
    }
    return generatedText ?? '';
  } catch (error) {
    console.error('Gemini text API error', error);
    throw new Error('[generateGreeting] Ошибка генерации');
  }
};

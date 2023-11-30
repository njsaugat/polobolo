import i18n from "i18next";
import { SetStateAction, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
export const languages = [
  { key: "en", nativeName: "English" },
  { key: "de", nativeName: "Deutsch" },
  { key: "es", nativeName: "Spanish" },
  { key: "hi", nativeName: "Hindi" },
  { key: "ne", nativeName: "Nepali" },
] as const;
export type Language = (typeof languages)[number];
export type LanguageContext = {
  language: Language;
  setLanguage: React.Dispatch<SetStateAction<Language>>;
  changeLanguage: (language: Language) => void;
};
export const LanguageContext = createContext<LanguageContext>({
  language:
    languages.find((language) => language.key === i18n.language) ??
    languages[0],
  setLanguage: () => {},
  changeLanguage: () => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setLanguage] = useState<Language>(
    languages.find((language) => language.key === i18n.language) ?? languages[0]
  );

  const changeLanguage = (language: Language) =>
    i18n.changeLanguage(language.key);

  return (
    <LanguageContext.Provider
      value={{
        language: selectedLanguage,
        setLanguage: setLanguage,
        changeLanguage: changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

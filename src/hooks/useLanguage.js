import { useState, useEffect } from 'react';

// Импортируем переводы
import ruTranslations from '../locales/ru.json';
import enTranslations from '../locales/en.json';

const translations = {
    ru: ruTranslations,
    en: enTranslations
};

export const useLanguage = () => {
    const [language, setLanguage] = useState('ru');

    useEffect(() => {
        // Загружаем сохраненный язык из localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && translations[savedLanguage]) {
            setLanguage(savedLanguage);
        }
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'ru' ? 'en' : 'ru';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value[k];
            if (value === undefined) return key; // Возвращаем ключ если перевод не найден
        }

        return value;
    };

    return { language, toggleLanguage, t };
};
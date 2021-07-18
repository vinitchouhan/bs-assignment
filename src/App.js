import React, {useState} from 'react';
import Header from './components/header/Header';
import './App.css';
import Main from './components/main/Main';
import { LocaleContext } from './localeContext';

// importing locale translations
import English from './locale/en.json';
import German from './locale/de.json';

function App() {

  const [locale, setLocale] = useState('en-en'); // Setting Default language to English
  const [translation, setTranslation] = useState(English);  // Setting default translation to English

  // function to change the language and set the translation according to language
  const changeLocale = (locale) => {
    setLocale(locale);
    locale==='de-de'? setTranslation(German):setTranslation(English);
  }

  return (
    <LocaleContext.Provider value={{locale, translation}} >
      <Header changeLocale={changeLocale} />
      <Main />
    </LocaleContext.Provider>
  );
}

export default App;

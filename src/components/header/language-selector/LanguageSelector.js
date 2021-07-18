import React, { useContext } from 'react';
import classes from './LanguageSelector.module.css';
import engFlag from '../../../assets/images/en-flag.png';
import gerFlag from '../../../assets/images/german-flag.png';
import { LocaleContext } from '../../../localeContext';

const LanguageSelector = ({changeLocale}) =>{
    const {locale} = useContext(LocaleContext);
    return (
        
        <div className={classes.wrapper}>
            <div className={`${classes.selector} ${locale==='en-en'?classes.activeLanguage:null}`} onClick={()=>{changeLocale('en-en')}}> <img src={engFlag} alt='england flag' className={classes.languageFlag} /> English</div>
            <div className={`${classes.selector} ${locale==='de-de'?classes.activeLanguage:null}`} onClick={()=>{changeLocale('de-de')}}> <img src={gerFlag} alt='germany flag' className={classes.languageFlag} /> Deutsche</div>
        </div>
    );  
}

export default LanguageSelector;
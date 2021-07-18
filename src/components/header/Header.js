import React from 'react';
import classes from './Header.module.css';
import HeaderLogo from '../../assets/images/header-logo.png';
import LanguageSelector from './language-selector/LanguageSelector';

const Header = ({changeLocale}) => {
    let className = `mainContainer ${classes.headerWrapper}`
    return (
        <div className={classes.header}>
            <div className={className}>
                <img src={HeaderLogo} className={classes.logoImage} alt='Bluestacks Logo' />
                <LanguageSelector changeLocale={changeLocale} />
            </div>

        </div>

    );
}
export default Header;
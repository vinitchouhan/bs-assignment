import React, { useContext } from 'react';
import classes from './Main.module.css';
import Tabs from './tabs/Tabs';
import { LocaleContext } from '../../localeContext';

const Main = () => {
    const {translation} = useContext(LocaleContext);
    return (
        <div className={classes.mainWrapper}>
            <div className='mainContainer'>
                <h1 className={classes.mainHeading}>{translation.title}</h1>
                <Tabs />
            </div>
        </div>
    );
}

export default Main;
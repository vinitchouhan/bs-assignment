import React from 'react';
import classes from './Popup.module.css';

//Component to show popup overlay and render it's children inside
const Popup = (props) => {

    return (
        <div className={classes.popupMainContainer}>
            <div className={classes.overlay} onClick={props.hidePopup}></div>
            {props.children}
        </div>
    );
}

export default Popup;
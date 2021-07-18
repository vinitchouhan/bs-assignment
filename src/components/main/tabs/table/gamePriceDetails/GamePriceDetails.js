import React from 'react';
import classes from './GamePriceDetails.module.css';

const GamePriceDetails = ({ hidePopup, gameDetails}) => {

    return (
            <div className={classes.popupContentContainer}>
                <div className={classes.popupTopRow}>
                    <img src={require('../../../../../assets/images/'+gameDetails.image_url).default} alt='Game' />
                    <div className={classes.gameName}>
                        <div>{gameDetails.name}</div>
                        <i>{gameDetails.region}</i>
                    </div>
                </div>
                <h3 className={classes.pricingHeading}>Pricing</h3>
                <div className={classes.subscriptionType}>
                    <div className={classes.name}>1 Week - 1 Month</div>
                    <div className={classes.price}>$ {(gameDetails.price).toFixed(2)}</div>
                    
                </div>
                <div className={classes.subscriptionType}>
                    <div className={classes.name}>6 Months</div>
                    <div className={classes.price}>$ {(gameDetails.price*6).toFixed(2)}</div>
                </div>
                <div className={classes.subscriptionType}>
                    <div className={classes.name}>1 Year</div>
                    <div className={classes.price}>$ {(gameDetails.price*12).toFixed(2)}</div>
                </div>
                <div className={classes.closeButton} onClick={hidePopup}>Close</div>
                
            </div>
    );
}

export default GamePriceDetails;
import React, { useContext, useState } from "react";
import classes from './Table.module.css';
import priceImage from '../../../../assets/images/Price.png'
import calenderImage from '../../../../assets/images/calender.png'
import fileImage from '../../../../assets/images/file.png'
import statisticsImage from '../../../../assets/images/statistics-report.png'
import Popup from "../../../popup/Popup";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import GamePriceDetails from './gamePriceDetails/GamePriceDetails';
import gameDataInit from '../../../../data/gameData'
import { LocaleContext } from "../../../../localeContext";

const Table = ({selectedCampaignIndex}) => {
    const [gameDetailsFlag, setgameDetailsFlag] = useState(0);      // Flag to check weather game pricing details are showing or not
    const [calenderFlag, setcalenderFlag] = useState(0);            // Flag to check if calender is visible or not
    const [selectedGameIndex, setselectedGameIndex] = useState(0);  // To check which game is selected so that selected date could be applied to the same
    const [gameData, setGameData] = useState(gameDataInit.body);    // Store Game Data to state from sample file
    const {locale,translation} = useContext(LocaleContext);         // Consume selected language and translations from LocaleCOntext

    // Function to show pricing Popup
    const showPrice = (selectedGameIndex) => {
        setgameDetailsFlag(1);
        setselectedGameIndex(selectedGameIndex);
    }
    // Function to close Popup (both for prcing and calender)
    const hidePopup = () => {
        setgameDetailsFlag(0);
        setcalenderFlag(0);
    }
    // Function to open Popup with calender
    const changeDate = (selectedGameIndex) => {
        setcalenderFlag(1);
        setselectedGameIndex(selectedGameIndex);
    }
    // Function to handle date change from Calender component and set the state as per changed data
    const handleDateChange = (value) => {
        setcalenderFlag(0);
        value = (new Date(value).getTime());
        let game = {...gameData[selectedGameIndex],createdOn:value};
        let newGameData = [...gameData]
        newGameData[selectedGameIndex] = game;
        setGameData(newGameData);
    }
    // Function to get 3 char month name 
    const getMonth = (timestamp) =>{
        let date = new Date(timestamp);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()];
    }
    // Function to get Year and Date from time stamp
    const dateConverter = (timestamp) =>{
        let date = new Date(timestamp);
        return date.getFullYear() + ', ' + ("0" + date.getDate()).slice(-2);
    }
    // Functon to get the days difference from today
    const timeDiff = (timestamp) =>{
        return Math.floor((new Date()-new Date(timestamp))/(1000*60*60*24));
    }

    return (
        <React.Fragment>
            <div className={classes.table}>
                <div className={classes.tableHeader}>
                    <div className={classes.flex1}> {translation.date} </div>
                    <div className={classes.flex2}> {translation.campaign} </div>
                    <div className={classes.flex1}> {translation.view} </div>
                    <div className={classes.flex3}> {translation.actions} </div>
                </div>
                {gameData.map((game, i) => {
                    if(selectedCampaignIndex===0 && timeDiff(game.createdOn)>=0 ){
                        return null;
                    }
                    if(selectedCampaignIndex===1 && timeDiff(game.createdOn)!==0 ){
                        return null;
                    }
                    if(selectedCampaignIndex===2 && timeDiff(game.createdOn)<=0 ){
                        return null;
                    }
                    let humanDiff = <i className={classes.timeDiff}>{Math.abs(timeDiff(game.createdOn))} {translation.days} {timeDiff(game.createdOn)<0?translation.ahead:translation.ago}</i> 
                                
                    return (
                        <div key={i} className={classes.tableBody}>
                            <div className={`${classes.flex1} ${classes.tableDate}`}>
                                <div className={classes.date}>{translation[getMonth(game.createdOn)] } {dateConverter(game.createdOn)}</div>
                                {(timeDiff(game.createdOn)!==0) ? humanDiff:null}
                            </div>
                            <div className={`${classes.flex2} ${classes.gameDetailsWrapper}`}>
                                <img src={require('../../../../assets/images/'+game['image_url']).default} className={classes.gameImage} alt='Game' />
                                <div className={classes.gameDetails}>
                                    <div>{game.name}</div>
                                    <i>{game.region}</i>
                                </div>

                            </div>
                            <div className={`${classes.flex1} ${classes.viewPricing}`} onClick={() => { showPrice(i) }}> <img src={priceImage} className={classes.tableIcon} alt='price' /> {translation.view_pricing}</div>
                            <div className={`${classes.flex3} ${classes.actionItems}` }>
                                <div className={classes.actionsItem}><img src={fileImage} className={classes.tableIcon} alt='CSV' /> {translation.csv}</div>
                                <div className={classes.actionsItem}><img src={statisticsImage} className={classes.tableIcon} alt='Report' /> {translation.report}</div>
                                <div className={classes.actionsItem} onClick={()=>{changeDate(i)}}><img src={calenderImage} className={classes.tableIcon} alt='Schedule Again' /> {translation.schedule_again}</div>
                            </div>
                        </div>
                    );
                })}


            </div>
            {/* Showing the Popup and rendering the appropriate component (GamePriceDetails or Canelder) based on the gameDetailsFlag and calenderFlag */}
            {gameDetailsFlag || calenderFlag ? <Popup hidePopup={hidePopup} > {gameDetailsFlag ? <GamePriceDetails hidePopup={hidePopup} gameDetails={gameData[selectedGameIndex]} /> : <div className={classes.calenderWrapper}><Calendar locale={locale} onClickDay={handleDateChange} /> </div>} </Popup> : null}
        </React.Fragment>
    );

}

export default Table;
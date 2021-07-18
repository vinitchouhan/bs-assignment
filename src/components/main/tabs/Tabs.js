import React, { useContext, useState } from 'react';
import Table from './table/Table';
import classes from './Tabs.module.css';
import {LocaleContext} from '../../../localeContext';

const Tabs = () => {
    const campaignsTypes = ['upcoming_campaigns', 'live_campaigns', 'past_campaigns'];
    
    const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(0);

    const handleTabClick = (index)=>{
        setSelectedCampaignIndex(index);
    }

    const {translation} = useContext(LocaleContext);

    return (
        <React.Fragment>
            <div className={classes.tabsWrapper}>
                {
                    campaignsTypes.map((campaign,index) => {
                        return (
                            <div key={campaign} onClick={()=>{handleTabClick(index)}} className={index === selectedCampaignIndex? classes.activeTab:null}>
                                {translation[campaign]}
                            </div>
                        );
                    })
                }
            </div>

            <Table selectedCampaignIndex={selectedCampaignIndex} />
        </React.Fragment>
    );
}

export default Tabs;
import React from 'react';
import { Card } from '@mui/material';

import LowerMenu from './LowerMenu';
import UpperMenu from './UpperMenu';
import '../../CSS/ActualSiteWide.css'
import '../../CSS/OverviewMenu.css'


export default function OverviewMenu(props) {
    /**
     * This function sets up the header menu present accross the dashboard. The function passes the necessary information for set up to the UpperMenu component and LowerMenu component.
     */
    return (
        <Card>
            <UpperMenu
                company={props.company}
            />

            <LowerMenu
                site={props.site}
                siteFullName={props.siteFullName}
                siteList={props.siteList}
                setCurrentSite={props.setCurrentSite}
                page={props.page}
                access={props.access}
            />
        </Card>
    );
}

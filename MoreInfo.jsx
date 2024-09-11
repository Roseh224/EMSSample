import React from "react";
import { InfoRounded } from '@mui/icons-material';
import { Box, Popover, IconButton } from '@mui/material';

import '../../CSS/ActualSiteWide.css';
import '../../CSS/TopThird/SimpleWidget.css'


export default function MoreInfo(props) {
    /**
     * This function sets up the more info button, for all page components. 
     * When the button is clicked, a popover containing a description, provided
     * via props, will pop open. When the user clicks away, the popover will close.
     * Additionally, the buttons shoadow will change when the button has been 
     * clicked and the popover is open. 
     */
    return (
        <>
            <IconButton
                className={props.open ? 'selected_icon' : undefined}
                onClick={props.handlePopoverOpen} >
                <InfoRounded className='info_symbol' />
            </IconButton>
            <Popover
                className="info_popover"
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handlePopoverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box className="info_box">

                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        <p className="info_text">{props.info}</p>
                    </div>
                </Box>
            </Popover>
        </>
    )
}

import React from "react";
import { MoreVert } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Divider, MenuList, ListItemText } from '@mui/material';

export default function MenuComponent(props) {
    /**
     * This function sets up the menu button for the components across the dashboard.When the menu button is clicked, a menu opens. Can contain unit options and timscale options for the data its component is showing. However, unit options can be excluded if props.unitOptions is not set. Otherwise, the component will show the unit options provided to it. It will also show the timescale options provided to it, and when one of them is clicked the corresponding function provided will be run to change the units/timescale. The current unit/timescale will be highlighted, as well. The menu will close when a selection is made or when the user clicks away from it.    
     */
    const showTimespan = true;

    return (
        <>
            <IconButton
                className={props.moreOpen ? 'selected_icon' : undefined}
                aria-controls={props.open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={props.open ? 'true' : undefined}
                onClick={props.handleMoreOpen}
            >
                <MoreVert className='info_symbol' />
            </IconButton>
            <Menu
                id="basic-menu"
                className='more_menu'
                anchorEl={props.moreAnchorEl}
                open={props.moreOpen}
                onClose={props.handleMoreClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box className='more_contents_box'>
                    <MenuList dense>
                        {showTimespan && (
                            <Box className='more_contents_list'>
                                <p style={{ paddingLeft: '15px' }}>View Data for: </p>
                                {Object.entries(props.timeOptions).map(([key, value]) => (
                                    <MenuItem
                                        sx={{
                                            '&.Mui-selected': {
                                                backgroundColor: props.timespan.includes(value) ? '#f0e9ea' : 'transparent',
                                            },
                                        }}
                                        selected={props.timespan.includes(value)}
                                        key={key}
                                        onClick={() => props.handleSelectDate(value)}
                                    >
                                        <ListItemText inset >{value}</ListItemText>
                                    </MenuItem>
                                ))}
                            </Box>
                        )}
                        {/* Following executed if unit options availalbe */}
                        {props.unitOptions != undefined && (
                            <Box className='more_contents_list'>
                                {showTimespan && <Divider className='menu_divider' />}
                                <p style={{ paddingLeft: '15px' }}>View Data in: </p>
                                {/* // Following code is a complicated way of checking what unit is selected, and highlighting accordingly. */}
                                {Object.entries(props.unitOptions).map(([key, value]) => (

                                    <MenuItem
                                        key={key}
                                        onClick={() => props.handleSelectUnit(value)}
                                        sx={{
                                            '&.Mui-selected': {
                                                backgroundColor: ((props.units === 'g/m²/Day') || (props.units === 'mg/kg Soil') ?
                                                    ((value === 'Grams/m²/Day') || (value === 'Soil/Water Concentration (mg/kg)')) : ((value === 'Litres/m²/Day') || (value === "Vapor Concentration (%)"))) ? '#f0e9ea' : 'transparent',
                                            },
                                        }}
                                        selected={
                                            ((props.units === 'g/m²/Day') || (props.units === 'mg/kg Soil') ?
                                                ((value === 'Grams/m²/Day') || (value === 'Soil/Water Concentration (mg/kg)')) : ((value === 'Litres/m²/Day') || (value === "Vapor Concentration (%)")))}>
                                        <ListItemText inset >{value} </ListItemText>
                                    </MenuItem>
                                ))}
                            </Box>
                        )}
                    </MenuList>
                </Box>
            </Menu>
        </>
    )
}

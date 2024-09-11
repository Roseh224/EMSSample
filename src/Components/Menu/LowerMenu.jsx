import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import { Box, IconButton, AppBar, Menu, MenuItem, MenuList, Tabs, Tab, Stack, tabClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu'
import '../../CSS/ActualSiteWide.css';
import '../../CSS/OverviewMenu.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9E6E7A',
        }
    },
});

export default function LowerMenu(props) {
    /**
     * This function sets up the lower (white) part of the header menu. Its primary pruposes are to set up and handle selection from the list of site options available to the specific user, and setup and handle selection from the page navigation tabs available to the specific user.  
     */
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [accessPages, setAccessPages] = useState([]);
    const navigate = useNavigate();

    const handleSelect = (key) => {
        props.setCurrentSite(key);
        setOpen(false);
    }

    const handleSitesOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }

    const handleSitesClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    const handleTabChange = (newValue) => {
        /**
         * This function will redirect the user to whatever page they have selected from the page options, when a new page is clicked. If the current page is clicked, nothing happens.
         */
        if (newValue === props.page) {
            return;
        }
        else if (newValue === 'Plume Futures') {
            navigate('/PlumeFutures');
        }
        else if (newValue === 'WaterQuant Overview') {
            navigate('/WaterSense');
        }
        else if (newValue === 'Sense Technology') {
            navigate('/SenseTechnology');
        }
        else {
            navigate('/');
        }
    };

    useEffect(() => {
        /**
         * This function sets up a list of the pages that a user has access to, based on the response from the API call used at login. This list is later used to set up the tab options for the user.
         */
        if (props.access.length > 0) {
            const tempList = [
                props.access.includes('overview') ? 'Overview' : null,
                props.access.includes('water') ? 'WaterQuant Overview' : null,
                props.access.includes('plumefutures') ? 'Plume Futures' : null,
                'Sense Technology'
            ].filter(Boolean);
            // above filter removes the null vals. 
            setAccessPages(tempList);
        }
    }, [props.access])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='lower_menu_bar'>
                <Stack direction='row' className='lm_stack'>
                    <Stack direction='row' className='lm_start_stack'>
                        <IconButton
                            className={open ? 'lm_menu_button_selected' : 'lm_menu_button'}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleSitesOpen}
                        >
                            <MenuIcon className='lm_menu_icon' />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            className='more_menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleSitesClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Box className='menu_contents_box'>
                                <MenuList >
                                    <Box className='more_contents_list'>
                                        {Object.entries(props.siteList).map(([key, value]) => (
                                            <MenuItem className='menu_text' key={key} onClick={() => handleSelect(key)}>
                                                {value.fullName}
                                            </MenuItem>
                                        ))}
                                    </Box>
                                </MenuList>

                            </Box>
                        </Menu>
                        <h1 className='lm_site_name'> {props.siteFullName} </h1>
                    </Stack>

                    <ThemeProvider theme={theme}>
                        {props.access.length > 1 ? (
                            <Box className="lm_tab_container">
                                <Tabs
                                    value={props.page}
                                    className='lm_tabs'
                                    indicatorColor="primary"
                                    aria-label="secondary tabs example"
                                >
                                    {accessPages.map((item, index) => (
                                        <Tab
                                            key={index}
                                            value={item}
                                            label={item}
                                            className={`lm_indiv_tab ${props.page === item ? 'selected_tab' : ''}`}
                                            sx={{ textTransform: 'none' }}
                                            onClick={() => handleTabChange(item)}
                                        />
                                    ))
                                    }
                                </Tabs>
                            </Box>
                        ) : (
                            <Box className="lm_tab_container_two">
                                <Tabs
                                    value={props.page}
                                    className='lm_tabs'
                                    indicatorColor="primary"
                                    aria-label="secondary tabs example"
                                >
                                    {accessPages.map((item, index) => (
                                        <Tab
                                            key={index}
                                            value={item}
                                            label={item}
                                            className={`lm_indiv_tab_two ${props.page === item ? 'selected_tab' : ''}`}
                                            sx={{ textTransform: 'none' }}
                                            onClick={() => handleTabChange(item)}
                                        />
                                    ))
                                    }
                                </Tabs>
                            </Box>
                        )}

                    </ThemeProvider>
                </Stack>
            </AppBar>
        </Box>
    );
}
import React from 'react';
import { Stack, Box, IconButton, AppBar, Toolbar, Typography, MenuItem, Menu, ListItemIcon } from '@mui/material';
import { AccountCircle, MoreVert } from '@mui/icons-material';
import logo from '../../Images/OverviewPage/ems-logo-white.svg';


import '../../CSS/ActualSiteWide.css';
import '../../CSS/OverviewMenu.css';

import { deleteToken } from '../helpers/tokenUtils';
import { useNavigate } from 'react-router-dom';
import { LOGIN_TOKEN_NAME } from '../helpers/Constants';

export default function UpperMenu(props) {
    /**
     * This function sets up the top (green) part of the dashboard's headre menu. It's primarily aesthetics. Although, it does provide a more options button, which then opens a popover, providing the user with the option to logout. It then directs removes the relevant data from local storage, and redirects the user accordingly. 
     */
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const logout = () => {
        deleteToken(LOGIN_TOKEN_NAME);
        navigate('/');
    }

    const handleMoreOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }

    const handleMoreClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='top_menu_bar'>
                <Toolbar>
                    <Stack direction='row' className='tm_content_stack'>
                        <Stack direction='row' className='tm_logo_stack'>
                            <img src={logo} className='tm_logo' alt='' />
                            <Typography className='tm_logo_text'>ems</Typography>
                        </Stack>
                        <Stack direction='row' className='tm_account_stack'>
                            <h1 className='tm_account_text'>
                                {props.company}
                            </h1>

                            <AccountCircle className='tm_account_icon' />

                            <IconButton
                                className={open ? 'tm_more_selected' : 'tm_more_icon_button'}
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleMoreOpen}
                            >
                                <MoreVert className='tm_more_icon' />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                className='more_menu'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMoreClose}
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
                                    <Box className='more_contents_list'>
                                        <MenuItem onClick={logout} className='menu_text'>
                                            <ListItemIcon>
                                                <AccountCircle />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Box>
                                </Box>
                            </Menu>
                        </Stack>
                    </Stack>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
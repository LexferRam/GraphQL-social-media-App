import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';

export default function MenuAppBar() {
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substr(1);

    const [activeItem, setActiveItem] = React.useState(path);
    
    const handleItemClick = (e) => {
        setActiveItem(e.target.name);
    };

    return (
        <Box sx={{ flexGrow: 1, marginBottom: '3px' }}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <div style={{ flexGrow: 1 }}>
                        <Link to='/' style={linkStyles}>
                            <Button
                                name='home'
                                onClick={handleItemClick}
                                variant={activeItem === 'home' ? "outlined" : null}
                                style={{ textTransform: 'capitalize' }}
                                startIcon={<HomeRoundedIcon />}
                            >
                                Home
                            </Button>
                        </Link>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Link to='/login' style={linkStyles}>
                            <Button
                                name='login'
                                onClick={handleItemClick}
                                variant={activeItem === 'login' ? "outlined" : null}
                                style={{ textTransform: 'capitalize' }}
                                startIcon={<AccountCircle />}>
                                Login
                            </Button>
                        </Link>
                        <Link to='/register' style={linkStyles}>
                            <Button
                                name='register'
                                onClick={handleItemClick}
                                variant={activeItem === 'register' ? "outlined" : null}
                                style={{ textTransform: 'capitalize' }}
                                startIcon={<AppRegistrationRoundedIcon />}>
                                Register
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const linkStyles = { textDecoration: 'none', color:'#1976d2' }
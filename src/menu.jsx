import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Menu() {
    return (
        <AppBar style={{ width: '100vw' }}>
            <Toolbar sx={{ background: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    DataFeedNews
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cambia el color al pasar el ratón
                        },
                    }}
                >
                    Fuentes
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/news"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cambia el color al pasar el ratón
                        },
                    }}
                >
                    Noticias
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Menu;

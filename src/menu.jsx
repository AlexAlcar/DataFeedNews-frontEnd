import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Menu() {
    return (
        <AppBar style={{
            width:'100vw',
            position: 'fixed',
            }}>
            <Toolbar sx={{ background: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    DataFeed
                </Typography>
                <Button color="inherit" component={Link} to="/">Elegir Fuentes</Button>
                <Button color="inherit" component={Link} to="/news">Ver Noticias</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Menu;
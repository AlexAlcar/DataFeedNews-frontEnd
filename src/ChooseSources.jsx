import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function ChooseSources() {
    const [rssUrl, setRssUrl] = useState('');
    const [sources, setSources] = useState(JSON.parse(localStorage.getItem('rssSources')) || []);

    const addSource = () => {
        if (rssUrl.trim() !== '') {
            const updatedSources = [...sources, rssUrl.trim()];
            setSources(updatedSources);
            localStorage.setItem('rssSources', JSON.stringify(updatedSources));
            setRssUrl('');
        }
    };

    const removeSource = (index) => {
        const updatedSources = [...sources];
        updatedSources.splice(index, 1);
        setSources(updatedSources);
        localStorage.setItem('rssSources', JSON.stringify(updatedSources));
    };

    return (
        <Paper className='scale-in-center' elevation={5}
            sx={{
                mt: '80px',
                p: 2,
                background: 'whiteSmoke',
                width: '70vw',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column'
            }}>
            <Typography variant="h4" gutterBottom>
                Elegir fuentes de noticias
            </Typography>
            <TextField
                label="URL de la fuente RSS"
                variant="outlined"
                fullWidth
                value={rssUrl}
                onChange={(e) => setRssUrl(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />
            <Button variant="contained" onClick={addSource} sx={{ background: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}>Agregar Fuente</Button>
            <List style={{ marginTop: '1rem' }}>
                {sources.map((source, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={source} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => removeSource(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default ChooseSources;

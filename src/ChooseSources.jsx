import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import rssList from './rssList.json'; // Importa el archivo JSON

function ChooseSources() {
    const [rssUrl, setRssUrl] = useState('');
    const [sources, setSources] = useState(JSON.parse(localStorage.getItem('rssSources')) || []);

    const addSource = () => {
        if (rssUrl.trim() !== '') {
            // Verificar si la fuente ya existe en la lista
            if (!sources.includes(rssUrl.trim())) {
                const updatedSources = [...sources, rssUrl.trim()];
                setSources(updatedSources);
                localStorage.setItem('rssSources', JSON.stringify(updatedSources));
                setRssUrl('');
            } else {
                alert('La fuente ya está agregada.');
            }
        }
    };

    const removeSource = (index) => {
        const updatedSources = [...sources];
        updatedSources.splice(index, 1);
        setSources(updatedSources);
        localStorage.setItem('rssSources', JSON.stringify(updatedSources));
    };

    const subscribeToSource = (url) => {
        if (!sources.includes(url)) {
            const updatedSources = [...sources, url];
            setSources(updatedSources);
            localStorage.setItem('rssSources', JSON.stringify(updatedSources));
        } else {
            alert('La fuente ya está suscrita.');
        }
    };

    return (
        <div style={{ paddingTop: '80px', width: '100vw', display:'flex', flexDirection:'column', alignItems:'center' }} className='scale-up-center'>
            <Paper elevation={5} sx={{ background: 'whiteSmoke', p: 2, mb: 4 }} >
                <Typography variant="h4" gutterBottom>
                    Añadir fuentes de noticias
                </Typography>
                <TextField
                    label="URL de la fuente RSS"
                    variant="outlined"
                    fullWidth
                    value={rssUrl}
                    onChange={(e) => setRssUrl(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                />
                <Button variant="contained" onClick={addSource} sx={{ width: '200px', background: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}>Agregar Fuente</Button>

                <List style={{ marginTop: '1rem', width: '80vw' }}>
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

            <Paper elevation={5} style={{ width:'70vw'}}>
                <Typography variant="h5" style={{ textAlign: 'center', marginBottom: 2 }}>Algunas webs de interés</Typography>

                <List>
                    {rssList.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item.nombre} secondary={item.url} />
                            <ListItemSecondaryAction>
                                <Button
                                    size='small'
                                    sx={{ background: 'linear-gradient( 110.3deg, rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}
                                    variant="contained"
                                    onClick={() => subscribeToSource(item.url)}
                                >
                                    Suscribirse
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>

        </div>
    );
}

export default ChooseSources;

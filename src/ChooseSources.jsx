import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import rssList from './rssList.json'; // Importa el archivo JSON

function ChooseSources() {
    const [rssUrl, setRssUrl] = useState('');
    const [sources, setSources] = useState(JSON.parse(localStorage.getItem('rssSources')) || []);
    const [favicons, setFavicons] = useState({});

    useEffect(() => {
        // Función para cargar los favicons al montar el componente
        const loadFavicons = async () => {
            const faviconMap = {};
            for (const item of rssList) {
                try {
                    const response = await fetch(`https://www.google.com/s2/favicons?sz=64&domain=${item.url}`);
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    faviconMap[item.url] = url;
                } catch (error) {
                    console.error('Error al obtener el favicon para', item.url);
                }
            }
            setFavicons(faviconMap);
        };

        loadFavicons();
    }, []);
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
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '80px' }} className='scale-up-center'>
            <Paper elevation={5} sx={{ background: 'whiteSmoke', width: '70vw', p: 2, mb: 4 }} >
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
                <Button variant="contained" onClick={addSource} sx={{ width:'200px', background: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}>Agregar Fuente</Button>

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

            <Paper elevation={5} sx={{ background: 'white', width: '70vw', p: 2 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>Algunas webs de interés</Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>Favicon</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rssList.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {favicons[item.url] && <img src={favicons[item.url]} alt="Favicon" width={32} height={32} />}
                                    </TableCell>
                                    <TableCell>{item.nombre}</TableCell>
                                    <TableCell>{item.url}</TableCell>
                                    <TableCell>
                                        <Button size='small' sx={{ background: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }} variant="contained" onClick={() => subscribeToSource(item.url)}>Suscribirse</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default ChooseSources;

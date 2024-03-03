import React, { useState, useEffect } from 'react';
import {  Typography, Accordion, AccordionSummary, AccordionDetails, List,  ListItemText, Link, Divider, Paper, Snackbar, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';

function ViewNews() {
    const [news, setNews] = useState([]);
    const [expandedSources, setExpandedSources] = useState({});
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const rssSources = JSON.parse(localStorage.getItem('rssSources'));
        if (rssSources && rssSources.length > 0) {
            Promise.all(
                rssSources.map(source =>
                    fetch(`https://datafeedbackend.azurewebsites.net/api/News?rssUrl=${source}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => data.map(item => ({ ...item, source })))
                        .catch(error => {
                            console.error('Error fetching news:', error);
                            setErrorSnackbarOpen(true);
                            return [];
                        })
                )
            ).then(newsData => {
                const mergedNews = newsData.flat();
                setNews(mergedNews);
                // Inicializar el estado de expansión para todas las fuentes como colapsadas
                const initialExpandedSources = {};
                rssSources.forEach(source => {
                    initialExpandedSources[source] = false;
                });
                setExpandedSources(initialExpandedSources);
            }).catch(error => console.error('Error fetching news:', error))
                .finally(() => setLoading(false));
        }
    }, []);

    //Agrupar por fuente
    const groupBySource = (news) => {
        const groupedNews = {};
        news.forEach(item => {
            if (!groupedNews[item.source]) {
                groupedNews[item.source] = [];
            }
            groupedNews[item.source].push(item);
        });
        return groupedNews;
    };

    const handleExpandSource = (source) => {
        setExpandedSources({
            ...expandedSources,
            [source]: !expandedSources[source]
        });
    };

    const handleCloseSnackbar = () => {
        setErrorSnackbarOpen(false);
    };

    return (
        <>
            <Paper sx={{ mt: 5, p: 2, background: 'whiteSmoke',  mt: '80px',width: '97vw', }} className='scale-in-center' elevation={5}>
                <Typography variant="h4" gutterBottom>
                    Últimas Noticias:
                </Typography>
                {loading ? ( 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress />
                        <Typography variant="body1" style={{ marginLeft: '16px' }}>Cargando...</Typography>
                    </div>
                ) : (
                    Object.entries(groupBySource(news)).map(([source, newsForSource], index) => (
                        <div key={index} style={{
                            border: '1px solid grey',
                            marginBottom: '16px',
                            borderRadius: '4px',
                            boxShadow: '0 8px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                        }}>
                            <Accordion expanded={expandedSources[source]} onChange={() => handleExpandSource(source)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ fontWeight: 'bold', color: 'linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )' }}>
                                    <Typography variant="h5">
                                        {source.split('/')[2]} ({newsForSource.length})
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        {newsForSource.map((item, index) => (
                                            <Accordion key={index} sx={{ border: '1px solid lightGray' }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <ListItemText
                                                        primary={<Typography sx={{ fontWeight: 'bold', fontSize: '1.1em' }}>{item.title}</Typography>}
                                                        secondary={dayjs(item.date).format('DD/MM/YYYY, HH:mm:ss')}
                                                    />
                                                </AccordionSummary>
                                                <AccordionDetails style={{ overflowWrap: 'break-word' }}>
                                                    <Typography style={{ maxWidth: '100%', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: item.content }} />
                                                    <Divider />
                                                    <Typography>Url: <Link href={item.url}>{item.url}</Link></Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))
                )}
            </Paper>
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Ha ocurrido un error al cargar algunas noticias."
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </>
    );
}

export default ViewNews;
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ListaPazienti = () => {
  const [pazienti, setPazienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPazienti = async () => {
      try {
        setLoading(true);
        setErrore(null);

        // Recupera il token dal localStorage
        const token = localStorage.getItem('token');

        // Configurazione degli headers (anche se il token è null, proviamo la richiesta)
        const config = token ? {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        } : {};

        console.log('Tentativo di fetch pazienti...');

        const { data } = await api.get('/pazienti', config);

        // Gestione della risposta del backend
        const list = Array.isArray(data) ? data : (data?.content || []);
        setPazienti(list);

      } catch (err) {
        console.error("Errore durante il recupero dei pazienti:", err);

        // Gestione specifica degli errori
        if (err.response?.status === 403) {
          setErrore("Accesso negato. Potresti non avere i permessi necessari o il token potrebbe essere scaduto.");
        } else if (err.response?.status === 401) {
          setErrore("Token scaduto o non valido. Effettua nuovamente il login.");
        } else if (err.response?.status === 404) {
          setErrore("Endpoint non trovato. Verifica la configurazione del server.");
        } else if (err.response?.status >= 500) {
          setErrore("Errore del server. Riprova più tardi.");
        } else if (err.code === 'NETWORK_ERROR' || !err.response) {
          setErrore("Errore di connessione. Verifica che il server sia attivo.");
        } else {
          setErrore(`Errore durante il caricamento dei pazienti: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPazienti();
  }, []);

  // Funzione per ricaricare i dati
  const handleReloadPazienti = () => {
    setLoading(true);
    setErrore(null);
    // Ricarica i dati
    window.location.reload();
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Elenco Pazienti
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" component={Link} to="nuovo">
            Nuovo paziente
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : errore ? (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {errore}
            </Alert>
            <Button variant="outlined" onClick={handleReloadPazienti}>
              Riprova
            </Button>
          </Box>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Cognome</TableCell>
                  <TableCell>Telefono</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Azioni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(pazienti) && pazienti.length > 0 ? (
                  pazienti.map((paziente) => (
                    <TableRow key={paziente.id}>
                      <TableCell>{paziente.id}</TableCell>
                      <TableCell>{paziente.nome}</TableCell>
                      <TableCell>{paziente.cognome}</TableCell>
                      <TableCell>{paziente.telefono}</TableCell>
                      <TableCell>{paziente.email}</TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/pazienti/${paziente.id}`)}
                        >
                          Dettagli
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body2" color="textSecondary">
                        Nessun paziente trovato
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default ListaPazienti;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import api from '../../services/api';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
dayjs.locale('it');

const ListaDiete = () => {
  const { id } = useParams();
  const [diete, setDiete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDiete = async () => {
      try {
        const { data } = await api.get('/diete', { params: { idPaziente: id } });
        setDiete(data);
      } catch (e) {
        console.error(e);
        setError('Errore nel caricamento delle diete');
      } finally {
        setLoading(false);
      }
    };
    fetchDiete();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box mt={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box mt={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        mt={4}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h5">Diete</Typography>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to={`/pazienti/${id}/diete/nuova`}
        >
          Nuova dieta
        </Button>
      </Box>

      {diete.length === 0 ? (
        <Typography sx={{ mt: 2 }}>Nessuna dieta disponibile</Typography>
      ) : (
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Descrizione</TableCell>
              <TableCell>Data visita</TableCell>
              <TableCell>Peso&nbsp;(kg)</TableCell>
              <TableCell>Altezza&nbsp;(cm)</TableCell>
              <TableCell>Circonf. vita&nbsp;(cm)</TableCell>
              <TableCell>BMI</TableCell>
              <TableCell>Massa musc.&nbsp;(kg)</TableCell>
              <TableCell>Massa grassa&nbsp;(kg)</TableCell>
              <TableCell>Liquidi&nbsp;(kg)</TableCell>
              <TableCell>Note cliniche</TableCell>
              <TableCell align="right">Azioni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diete.map((dieta) => (
              <TableRow key={dieta.id}>
                <TableCell>{dieta.descrizione}</TableCell>
                <TableCell>
                  {dieta.dataVisita
                    ? dayjs(dieta.dataVisita).format('DD/MM/YYYY')
                    : '-'}
                </TableCell>
                <TableCell>{dieta.pesoKg ?? '-'}</TableCell>
                <TableCell>{dieta.altezzaCm ?? '-'}</TableCell>
                <TableCell>{dieta.circonferenzaVitaCm ?? '-'}</TableCell>
                <TableCell>{dieta.bmi ?? '-'}</TableCell>
                <TableCell>{dieta.massaMuscolare ?? '-'}</TableCell>
                <TableCell>{dieta.massaGrassa ?? '-'}</TableCell>
                <TableCell>{dieta.liquidi ?? '-'}</TableCell>
                <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {dieta.noteCliniche ?? '-'}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/pazienti/${id}/diete/${dieta.id}/modifica`}
                  >
                    Modifica
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default ListaDiete;

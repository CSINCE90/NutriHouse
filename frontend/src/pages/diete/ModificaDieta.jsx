import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../services/api";

/**
 * Questa pagina modifica i dati di una visita clinica (ex‑DietaGiornaliera).
 * Manteniamo il percorso /diete/:id/modifica per compatibilità,
 * ma le label e i campi sono quelli anamnestici.
 */

const schema = Yup.object({
  dataVisita: Yup.date().required("Data obbligatoria"),
  pesoKg: Yup.number().required().min(20).max(300),
  altezzaCm: Yup.number().min(50).max(250),
  circonferenzaVitaCm: Yup.number().min(30).max(200).nullable(),
  bmi: Yup.number().min(10).max(60).nullable(),
  massaMuscolare: Yup.number().min(0).max(150).nullable(),
  massaGrassa: Yup.number().min(0).max(150).nullable(),
  liquidi: Yup.number().min(0).max(150).nullable(),
  noteCliniche: Yup.string().max(2000).nullable(),
});

const ModificaDieta = () => {
  const { id, dietaId } = useParams(); // id paziente, id visita
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      dataVisita: "",
      pesoKg: "",
      altezzaCm: "",
      circonferenzaVitaCm: "",
      bmi: "",
      massaMuscolare: "",
      massaGrassa: "",
      liquidi: "",
      noteCliniche: "",
    },
    validationSchema: schema,
    onSubmit: async (vals) => {
      try {
        await api.put(`/diete/${dietaId}`, {
          idPaziente: Number(id),
          dataVisita: vals.dataVisita,
          pesoKg: vals.pesoKg,
          altezzaCm: vals.altezzaCm || null,
          circonferenzaVitaCm: vals.circonferenzaVitaCm || null,
          bmi: vals.bmi || null,
          massaMuscolare: vals.massaMuscolare || null,
          massaGrassa: vals.massaGrassa || null,
          liquidi: vals.liquidi || null,
          noteCliniche: vals.noteCliniche || null,
        });
        setFeedback("Visita aggiornata con successo");
        setTimeout(
          () => navigate(`/pazienti/${id}/diete`, { replace: true }),
          1200
        );
      } catch (e) {
        console.error(e);
        setError("Errore durante l'aggiornamento della visita");
      }
    },
    enableReinitialize: true,
  });

  /* Carica dati esistenti */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/diete/${dietaId}`);
        formik.setValues({
          dataVisita: data.dataVisita || dayjs().format("YYYY-MM-DD"),
          pesoKg: data.pesoKg ?? "",
          altezzaCm: data.altezzaCm ?? "",
          circonferenzaVitaCm: data.circonferenzaVitaCm ?? "",
          bmi: data.bmi ?? "",
          massaMuscolare: data.massaMuscolare ?? "",
          massaGrassa: data.massaGrassa ?? "",
          liquidi: data.liquidi ?? "",
          noteCliniche: data.noteCliniche ?? "",
        });
      } catch (e) {
        console.error(e);
        setError("Errore nel caricamento dei dati");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dietaId]);

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Modifica Visita Clinica
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Data visita */}
          <TextField
            fullWidth
            margin="normal"
            type="date"
            label="Data visita"
            name="dataVisita"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dataVisita}
            onChange={formik.handleChange}
            error={formik.touched.dataVisita && Boolean(formik.errors.dataVisita)}
            helperText={formik.touched.dataVisita && formik.errors.dataVisita}
          />

          {/* Peso & Altezza */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Peso (kg)"
                name="pesoKg"
                type="number"
                inputProps={{ step: 0.1 }}
                value={formik.values.pesoKg}
                onChange={formik.handleChange}
                error={formik.touched.pesoKg && Boolean(formik.errors.pesoKg)}
                helperText={formik.touched.pesoKg && formik.errors.pesoKg}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Altezza (cm)"
                name="altezzaCm"
                type="number"
                value={formik.values.altezzaCm}
                onChange={formik.handleChange}
                error={formik.touched.altezzaCm && Boolean(formik.errors.altezzaCm)}
                helperText={formik.touched.altezzaCm && formik.errors.altezzaCm}
              />
            </Grid>
          </Grid>

          {/* Circonferenza & BMI */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Circonferenza vita (cm)"
                name="circonferenzaVitaCm"
                type="number"
                value={formik.values.circonferenzaVitaCm}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="BMI"
                name="bmi"
                type="number"
                inputProps={{ step: 0.1 }}
                value={formik.values.bmi}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>

          {/* Body composition */}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Massa muscolare (kg)"
                name="massaMuscolare"
                type="number"
                inputProps={{ step: 0.1 }}
                value={formik.values.massaMuscolare}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Massa grassa (kg)"
                name="massaGrassa"
                type="number"
                inputProps={{ step: 0.1 }}
                value={formik.values.massaGrassa}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Liquidi (kg)"
                name="liquidi"
                type="number"
                inputProps={{ step: 0.1 }}
                value={formik.values.liquidi}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>

          {/* Note cliniche */}
          <TextField
            fullWidth
            multiline
            rows={3}
            margin="normal"
            label="Note cliniche"
            name="noteCliniche"
            value={formik.values.noteCliniche}
            onChange={formik.handleChange}
          />

          {/* Azioni */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" component={Link} to={`/pazienti/${id}/diete`}>
              Annulla
            </Button>
            <Button variant="contained" type="submit">
              Salva
            </Button>
          </Box>
        </form>

        <Snackbar
          open={!!feedback}
          autoHideDuration={3000}
          onClose={() => setFeedback("")}
        >
          <Alert severity="success">{feedback}</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ModificaDieta;
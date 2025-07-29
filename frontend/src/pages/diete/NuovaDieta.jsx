import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createDieta } from "../../services/api"; // usiamo ancora lo stesso wrapper per non cambiare import
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";

export default function NuovaDieta() {
  // In realtà ora è “Nuova Visita” ma lasciamo il nome componente/route per compatibilità
  const navigate = useNavigate();
  const { id } = useParams(); // id paziente

  /* ======= Validation schema ======= */
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

  return (
    <Formik
      initialValues={{
        dataVisita: new Date().toISOString().slice(0, 10),
        pesoKg: "",
        altezzaCm: "",
        circonferenzaVitaCm: "",
        bmi: "",
        massaMuscolare: "",
        massaGrassa: "",
        liquidi: "",
        noteCliniche: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createDieta({
            idPaziente: Number(id),
            dataVisita: values.dataVisita,
            pesoKg: values.pesoKg,
            altezzaCm: values.altezzaCm || null,
            circonferenzaVitaCm: values.circonferenzaVitaCm || null,
            bmi: values.bmi || null,
            massaMuscolare: values.massaMuscolare || null,
            massaGrassa: values.massaGrassa || null,
            liquidi: values.liquidi || null,
            noteCliniche: values.noteCliniche || null,
          });

          navigate(`/pazienti/${id}/diete`, { replace: true });
        } catch (err) {
          console.error("Errore salvataggio visita", err);
          alert("Impossibile salvare la visita 😢");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Paper sx={{ p: 4, maxWidth: 720, mx: "auto" }}>
            <Typography variant="h5" gutterBottom>
              Nuova visita
            </Typography>

            <Grid container spacing={2}>
              {/* Data visita */}
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  type="date"
                  name="dataVisita"
                  label="Data visita"
                  InputLabelProps={{ shrink: true }}
                  helperText={<ErrorMessage name="dataVisita" />}
                  error={Boolean(<ErrorMessage name="dataVisita" />)}
                />
              </Grid>

              {/* Peso & Altezza */}
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="pesoKg"
                  label="Peso (kg)"
                  type="number"
                  inputProps={{ step: 0.1 }}
                  helperText={<ErrorMessage name="pesoKg" />}
                  error={Boolean(<ErrorMessage name="pesoKg" />)}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="altezzaCm"
                  label="Altezza (cm)"
                  type="number"
                  helperText={<ErrorMessage name="altezzaCm" />}
                  error={Boolean(<ErrorMessage name="altezzaCm" />)}
                />
              </Grid>

              {/* Circonferenza & BMI */}
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="circonferenzaVitaCm"
                  label="Circonferenza vita (cm)"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="bmi"
                  label="BMI"
                  type="number"
                  inputProps={{ step: 0.1 }}
                />
              </Grid>

              {/* Body composition */}
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="massaMuscolare"
                  label="Massa muscolare (kg)"
                  type="number"
                  inputProps={{ step: 0.1 }}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="massaGrassa"
                  label="Massa grassa (kg)"
                  type="number"
                  inputProps={{ step: 0.1 }}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="liquidi"
                  label="Liquidi corporei (kg)"
                  type="number"
                  inputProps={{ step: 0.1 }}
                />
              </Grid>

              {/* Note cliniche */}
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  multiline
                  rows={3}
                  name="noteCliniche"
                  label="Note cliniche"
                />
              </Grid>

              {/* Submit */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Salvataggio…" : "Salva visita"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)}
                  >
                    Annulla
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}
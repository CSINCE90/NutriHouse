import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Paper,
  Grid,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../services/api";

export default function NuovoPiano() {
  const navigate = useNavigate();

  /* ========== state for drop‑downs ========== */
  const [pazienti, setPazienti] = useState([]);


 

  /* fetch patients on mount */
  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/pazienti").then((r) => r.data);
        setPazienti(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Errore caricamento pazienti", err);
      }
    })();
  }, []);

  const defaultPasti = [
    "colazione",
    "merenda",
    "pranzo",
    "spuntino",
    "cena",
  ];

  const validationSchema = Yup.object({
    idPaziente: Yup.number()
      .transform((_, orig) => (orig === '' ? undefined : Number(orig)))
      .required("Seleziona un paziente"),
    nome: Yup.string().required("Nome obbligatorio"),
    descrizione: Yup.string(),
    numeroPasti: Yup.number().min(1).max(10).required(),
    schemaPasti: Yup.array()
      .of(Yup.string().required("Campo obbligatorio"))
      .min(1),
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 780, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Nuovo Piano Alimentare
      </Typography>

      <Formik
        initialValues={{
          idPaziente: "",
          nome: "",
          descrizione: "",
          numeroPasti: 5,
          schemaPasti: defaultPasti,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.post("/piani", {
              idPaziente: Number(values.idPaziente),
              nome: values.nome,
              descrizione: values.descrizione,
              numeroPasti: values.numeroPasti,
              schemaPasti: values.schemaPasti.slice(0, values.numeroPasti),
            });
            navigate("/piani", { replace: true });
          } catch (err) {
            console.error("Errore creazione piano", err);
            alert("Errore durante il salvataggio del piano");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* Paziente */}
            <Field
              as={TextField}
              select
              fullWidth
              name="idPaziente"
              label="Seleziona paziente"
              margin="normal"
              onChange={(e) => {
                const val = e.target.value;
                setFieldValue("idPaziente", val);
              }}
            >
              {pazienti.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nome} {p.cognome} (id:{p.id})
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage
              name="idPaziente"
              component="div"
              style={{ color: "red" }}
            />

            <Field
              as={TextField}
              fullWidth
              label="Nome"
              name="nome"
              margin="normal"
            />
            <ErrorMessage
              name="nome"
              component="div"
              style={{ color: "red" }}
            />

            <Field
              as={TextField}
              fullWidth
              multiline
              rows={3}
              label="Descrizione"
              name="descrizione"
              margin="normal"
            />

            {/* Numero pasti */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography sx={{ mr: 2 }}>Numero pasti:</Typography>
              <IconButton
                size="small"
                onClick={() => {
                  if (values.numeroPasti > 1) {
                    setFieldValue("numeroPasti", values.numeroPasti - 1);
                    setFieldValue(
                      "schemaPasti",
                      values.schemaPasti.slice(0, -1)
                    );
                  }
                }}
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
              <Typography>{values.numeroPasti}</Typography>
              <IconButton
                size="small"
                onClick={() => {
                  if (values.numeroPasti < 10) {
                    setFieldValue("numeroPasti", values.numeroPasti + 1);
                    setFieldValue("schemaPasti", [
                      ...values.schemaPasti,
                      `pasto ${values.numeroPasti + 1}`,
                    ]);
                  }
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Box>

            {/* Lista dinamica nomi pasti */}
            <Typography sx={{ mt: 3, mb: 1 }}>Nomina i pasti</Typography>
            <Grid container spacing={2}>
              {values.schemaPasti
                .slice(0, values.numeroPasti)
                .map((pasto, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <TextField
                      fullWidth
                      label={`Pasto ${idx + 1}`}
                      value={pasto}
                      onChange={(e) => {
                        const nuovaLista = [...values.schemaPasti];
                        nuovaLista[idx] = e.target.value;
                        setFieldValue("schemaPasti", nuovaLista);
                      }}
                    />
                  </Grid>
                ))}
            </Grid>

            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvataggio…" : "Crea Piano"}
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}


import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../services/api";

export default function ModificaPiano() {
  const { id } = useParams(); // id piano
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/piani/${id}`);
        // fallback nel caso schemaPasti sia null/empty
        setInitial({
          nome: data.nome || "",
          descrizione: data.descrizione || "",
          numeroPasti: data.numeroPasti ?? (data.schemaPasti?.length || 5),
          schemaPasti:
            data.schemaPasti && data.schemaPasti.length
              ? data.schemaPasti
              : ["colazione", "merenda", "pranzo", "spuntino", "cena"],
        });
      } catch (err) {
        console.error("Errore caricamento piano", err);
        alert("Impossibile caricare il piano");
        navigate("/piani", { replace: true });
      }
    })();
  }, [id, navigate]);

  if (!initial) return null; // oppure loader

  const validationSchema = Yup.object({
    nome: Yup.string().required("Nome obbligatorio"),
    descrizione: Yup.string(),
    numeroPasti: Yup.number().min(1).max(10).required(),
    schemaPasti: Yup.array().of(Yup.string().required()).min(1),
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Modifica Piano Alimentare
      </Typography>

      <Formik
        enableReinitialize
        initialValues={initial}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await api.put(`/piani/${id}`, {
              nome: values.nome,
              descrizione: values.descrizione,
              numeroPasti: values.numeroPasti,
              schemaPasti: values.schemaPasti.slice(0, values.numeroPasti),
            });
            navigate("/piani", { replace: true });
          } catch (err) {
            console.error("Errore update piano", err);
            alert("Errore durante l'aggiornamento");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
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

            {/* Numero Pasti */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Typography sx={{ mr: 2 }}>Numero pasti:</Typography>
              <IconButton
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
                <RemoveIcon />
              </IconButton>
              <Typography>{values.numeroPasti}</Typography>
              <IconButton
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
                <AddIcon />
              </IconButton>
            </Box>

            {/* Nomi pasti dinamici */}
            <Typography sx={{ mt: 3, mb: 1 }}>Nomina i pasti</Typography>
            <Grid container spacing={2}>
              {values.schemaPasti.slice(0, values.numeroPasti).map((pasto, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <TextField
                    fullWidth
                    label={`Pasto ${idx + 1}`}
                    value={pasto}
                    onChange={(e) => {
                      const lista = [...values.schemaPasti];
                      lista[idx] = e.target.value;
                      setFieldValue("schemaPasti", lista);
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
              {isSubmitting ? "Salvataggio…" : "Aggiorna Piano"}
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
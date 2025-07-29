import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import api from "../../services/api";

export default function PianiIndex() {
  const [piani, setPiani] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/piani");
        setPiani(data);
      } catch (err) {
        console.error("Errore fetch piani", err);
      }
    })();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Piani alimentari</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/piani/nuovo"
          color="primary"
        >
          Nuovo piano
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrizione</TableCell>
            <TableCell>N. pasti</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {piani.map((p) => (
            <TableRow
              key={p.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/piani/${p.id}`)}
            >
              <TableCell>{p.nome}</TableCell>
              <TableCell>{p.descrizione?.slice(0, 60)}…</TableCell>
              <TableCell>{p.numeroPasti}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.PianoAlimentare;
import com.nutrihouse.backend.service.PianoAlimentareService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/piani")
@RequiredArgsConstructor
public class PianoAlimentareController {

    private final PianoAlimentareService pianoService;

    /* ============== CRUD base ============== */

    @GetMapping                     // GET /piani
    public List<PianoAlimentare> getAll() {
        return pianoService.findAll();
    }

    @GetMapping("/{id}")            // GET /piani/{id}
    public PianoAlimentare getById(@PathVariable Integer id) {
        return pianoService.findById(id);
    }

    @PostMapping                    // POST /piani
    public PianoAlimentare create(@RequestBody PianoAlimentare piano) {
        return pianoService.save(piano);
    }

    @PutMapping("/{id}")            // PUT /piani/{id}
    public PianoAlimentare update(@PathVariable Integer id,
                                  @RequestBody PianoAlimentare piano) {
        piano.setId(id);            // assicuro l’ID
        return pianoService.save(piano);
    }

    @DeleteMapping("/{id}")         // DELETE /piani/{id}
    public void delete(@PathVariable Integer id) {
        pianoService.delete(id);
    }

    /* ============== filtro per paziente ============== */

    @GetMapping("/paziente/{pazienteId}")   // GET /piani/paziente/{pazienteId}
    public List<PianoAlimentare> byPaziente(@PathVariable Integer pazienteId) {
        return pianoService.findByPaziente(pazienteId);
    }
}
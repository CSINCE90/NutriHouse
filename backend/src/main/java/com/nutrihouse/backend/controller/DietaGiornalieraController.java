package com.nutrihouse.backend.controller;

import com.nutrihouse.backend.model.DietaGiornaliera;
import com.nutrihouse.backend.service.DietaGiornalieraService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/diete")
@RequiredArgsConstructor
public class DietaGiornalieraController {

    private final DietaGiornalieraService dietaGiornalieraService;

    @GetMapping
    public List<DietaGiornaliera> getAll() {
        return dietaGiornalieraService.findAll();
    }

    @PostMapping
    public DietaGiornaliera create(@RequestBody DietaGiornaliera dieta) {
        return dietaGiornalieraService.save(dieta);
    }

    //eliminare
    @DeleteMapping("{id}")
    public void delete(@PathVariable Integer id) {
        dietaGiornalieraService.delete(id);
    }

    //PUT
    @PutMapping("{id}")
    public DietaGiornaliera update(@PathVariable Integer id, @RequestBody DietaGiornaliera dieta) {
        dieta.setId(id);
        return dietaGiornalieraService.save(dieta);
    }

    /**
     * Restituisce le diete giornaliere per un paziente specifico.
     */
    @GetMapping("/paziente/{pazienteId}")
    public List<DietaGiornaliera> getByPaziente(@PathVariable Integer pazienteId) {
        return dietaGiornalieraService.findByPazienteId(pazienteId);
    }

    // DietaGiornalieraController.java
@GetMapping("/pazienti/{id}/diete")
public List<DietaGiornaliera> getDieteByPaziente(@PathVariable Integer id) {
    return dietaGiornalieraService.findByPazienteId(id);
}
}

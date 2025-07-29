package com.nutrihouse.backend.service;

import com.nutrihouse.backend.model.PianoAlimentare;
import com.nutrihouse.backend.repository.PianoAlimentareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class PianoAlimentareService {

    private final PianoAlimentareRepository pianoRepository;

    public List<PianoAlimentare> findAll() {
        return pianoRepository.findAll();
    }

    public PianoAlimentare save(PianoAlimentare piano) {
        return pianoRepository.save(piano);
    }

    /**
     * Restituisce un piano alimentare per id, oppure lancia EntityNotFoundException.
     */
    public PianoAlimentare findById(Integer id) {
        return pianoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Piano alimentare non trovato"));
    }

    /**
     * Elimina un piano alimentare per id.
     */
    public void delete(Integer id) {
        pianoRepository.deleteById(id);
    }

    /**
     * Elenca tutti i piani collegati a un paziente specifico.
     * Richiede che il repository esponga findByPaziente_Id.
     */
    public List<PianoAlimentare> findByPaziente(Integer pazienteId) {
        return pianoRepository.findByPaziente_Id(pazienteId);
    }
}

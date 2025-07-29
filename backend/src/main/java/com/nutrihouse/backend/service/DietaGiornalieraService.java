package com.nutrihouse.backend.service;

//import com.nutrihouse.backend.model.DietaAlimento;
import com.nutrihouse.backend.model.DietaGiornaliera;
import com.nutrihouse.backend.repository.DietaGiornalieraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DietaGiornalieraService {

    private final DietaGiornalieraRepository dietaRepository;

    public List<DietaGiornaliera> findAll() {
        return dietaRepository.findAll();
    }

    public DietaGiornaliera save(DietaGiornaliera dieta) {
        return dietaRepository.save(dieta);
    }

    public void delete(Integer id) {
        dietaRepository.deleteById(id);
    }

    //findbyId
    public DietaGiornaliera findById(Integer id) {
        return dietaRepository.findById(id).orElse(null);
    }

    /**
     * Restituisce tutte le diete giornaliere associate a un paziente specifico.
     */
    public List<DietaGiornaliera> findByPazienteId(Integer pazienteId) {
        return dietaRepository.findByPaziente_Id(pazienteId);
    }


    
}




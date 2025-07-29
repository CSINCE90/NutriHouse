package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.math.BigDecimal;

/**
 * Rappresenta la visita/controllo clinico giornaliero di un paziente.
 * Conserva i dati antropometrici rilevati quel giorno e un collegamento
 * al piano alimentare di riferimento.
 */
@Entity
@Table(name = "dieta_giornaliera") // manteniamo il nome tabellare originale
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DietaGiornaliera {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** Data della visita/controllo */
    @Column(name = "data_visita", nullable = false)
    private LocalDate dataVisita;

    /** Peso rilevato, in chilogrammi (precisione a 1 decimale) */
    @Column(name = "peso_kg", precision = 5, scale = 1)
    private BigDecimal pesoKg;

    /** Altezza in centimetri (opzionale, solitamente solo alla prima visita) */
    @Column(name = "altezza_cm")
    private Integer altezzaCm;

    /** Circonferenza vita in centimetri (opzionale) */
    @Column(name = "circonferenza_vita_cm")
    private Integer circonferenzaVitaCm;

    @Column(name = "bmi", precision = 5, scale = 2)
    private BigDecimal bmi;

    /** Massa muscolare (opzionale) */
    @Column(name = "massa_muscolare", precision = 5, scale = 1)
    private BigDecimal massaMuscolare;

    /** Massa grassa (opzionale) */
    @Column(name = "massa_grassa", precision = 5, scale = 1)
    private BigDecimal massaGrassa;

    /** Liquidi corporei in kg o % (opzionale) */
    @Column(name = "liquidi", precision = 5, scale = 1)
    private BigDecimal liquidi;

    /** Note cliniche o osservazioni del nutrizionista */
    @Column(name = "note_cliniche", columnDefinition = "TEXT")
    private String noteCliniche;

    /* ================= RELAZIONI ================ */

    /** Paziente a cui appartiene la visita */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_paziente", nullable = false)
    private Paziente paziente;

    /** Piano alimentare di riferimento (può essere nullo se ancora non assegnato) */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_piano")
    private PianoAlimentare piano;
}

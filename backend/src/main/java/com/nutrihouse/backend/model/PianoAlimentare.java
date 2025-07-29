package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Objects;

@Entity
@Table(name = "Piano_Alimentare")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PianoAlimentare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** Titolo del piano alimentare */
    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    /** Descrizione estesa del piano */
    @Column(name = "descrizione", columnDefinition = "TEXT")
    private String descrizione;

    /** Numero di pasti previsti dal piano (default 5) */
    @Column(name = "numero_pasti")
    private Integer numeroPasti = 5;

    /** Schema ordinato dei nomi dei pasti (colazione, pranzo, ...) */
    @ElementCollection
    @CollectionTable(name = "piano_pasti", joinColumns = @JoinColumn(name = "piano_id"))
    @Column(name = "nome_pasto")
    @OrderColumn(name = "ordine")
    private List<String> schemaPasti = new ArrayList<>(List.of(
            "colazione", "merenda", "pranzo", "spuntino", "cena"
    ));

    @Column(name = "data")
    private LocalDate data;


    @ManyToOne
    @JoinColumn(name = "id_paziente")
    private Paziente paziente;

    @OneToMany(mappedBy = "piano", cascade = CascadeType.ALL)
    private List<DietaGiornaliera> dieteGiornaliere;
}

package com.nutrihouse.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Paziente")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paziente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cognome;

    private String email;
    private String telefono;
    private String sesso;
    @Column(nullable = false)
    private java.time.LocalDate dataDiNascita;
    private Double peso;           // kg
    private Double altezza;        // cm
    @Column(columnDefinition = "TEXT")
    private String note;           // annotazioni libere
    private String codiceFiscale;

    @ManyToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
}
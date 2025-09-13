package com.codearp.application.domains;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import lombok.*;
import org.hibernate.annotations.Check;

import java.math.BigDecimal;

@Entity
@Table(name="products")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
@EqualsAndHashCode(exclude = {"description","price","quantity","version"})
@Check(constraints = "stock > quantity")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Lob
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private BigDecimal quantity;

    @Column(nullable = false)
    private BigDecimal stock;

    @Version
    private Long version;

    /**
     * ✅ Esto valida antes de persistir/actualizar con Hibernate Validator.
     * ❌ Pero no protege a nivel de BD (si otro cliente inserta directo en SQL).
     * 👉 Para que esto funcione necesitas tener Hibernate Validator: spring-boot-starter-validation
     */
    @AssertTrue(message = "El stock debe ser mayor que la cantidad")
    public boolean isStockValid() {
        return stock != null && quantity != null && stock.compareTo(quantity) > 0;
    }
}

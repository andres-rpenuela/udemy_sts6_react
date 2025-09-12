package com.codearp.application.repositories;

import com.codearp.application.domains.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

// Paradigma HATEOAS "Hypermedia As The Engine Of Application State" - Para spring rest data
@RepositoryRestController(path = "products") // Propcionar un servicio crud automaticamente 
public interface ProductRepository extends CrudRepository<Product,Long> {
}

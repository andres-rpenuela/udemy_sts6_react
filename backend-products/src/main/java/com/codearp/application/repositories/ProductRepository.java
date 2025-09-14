package com.codearp.application.repositories;

import com.codearp.application.domains.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.CrossOrigin;

// Paradigma HATEOAS "Hypermedia As The Engine Of Application State" - Para spring rest data
@CrossOrigin(origins =  {"http://localhost:5173/","http://localhost:4200/"})
@RepositoryRestController(path = "products") // Propcionar un servicio crud automaticamente
public interface ProductRepository extends CrudRepository<Product,Long> {
}

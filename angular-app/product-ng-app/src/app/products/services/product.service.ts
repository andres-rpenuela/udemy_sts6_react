import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public findAll():Product[]{
    return [];
  }

  public findById(id:number):Product{
    return {id:0,name:'',description:'',price:0,quantity:0,stock:0};
  }

  public create(product:Product):Product{
    const { id, ...productWithoutId } = product; // si el bakcend genera el id y no se quiere enviar desde el fronted
    return product;
  }

  public update(id:number,product:Product):Product{
    if(id != product.id ){
      throw "Operation not allowed"
    }
    return product;

  }

  public remove(id:number){

  }
}

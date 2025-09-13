import { udapted } from './../../../../../../react-app/src/services/ProductService';
import { ChangeDetectionStrategy, Component, inject, linkedSignal, WritableSignal } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { ProductFormComponent } from "../../products/components/product-form/product-form.component";
import { Product } from '../../products/interfaces/product.interface';
import { productEmpty } from '../../products/models/product.models';
import { JsonPipe } from '@angular/common';
import { ProductTableComponent } from "../../products/components/product-table/product-table.component";

@Component({
  selector: 'app-products-page',
  imports: [ProductFormComponent, JsonPipe, ProductTableComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsPageComponent {
  protected title = 'Products';
  private ProductService = inject(ProductService);

  protected products: WritableSignal<Product[]> = linkedSignal(() => []);
  protected productSelect: WritableSignal<Product> = linkedSignal<Product>(() => ({ ...productEmpty }))

  public createOrUpdated(product: Product) {
    console.log(product);
    this.products.update(p => [...p,product])
    this.removeProductSelect();
  }

  public editProduct(product: Product){
    console.log("edit")
    this.productSelect.set(product);
  }
  public removeProductSelect() {
    //this.productSelect.set({} as Product)
    this.productSelect.set({...productEmpty})
    //console.log(product);
  }

}

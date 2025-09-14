import { ChangeDetectionStrategy, Component, inject, linkedSignal, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { ProductService } from '../../products/services/product.service';
import { ProductFormComponent } from "../../products/components/product-form/product-form.component";
import { Product } from '../../products/interfaces/product.interface';
import { productEmpty } from '../../products/models/product.models';
import { JsonPipe } from '@angular/common';
import { ProductTableComponent } from "../../products/components/product-table/product-table.component";
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-page',
  imports: [ProductFormComponent, JsonPipe, ProductTableComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsPageComponent implements OnInit, OnDestroy{
  protected title = 'Products';
  private productService = inject(ProductService);

  private findProdcutsSubcription$:Subscription | null= null;

  private destroy$ = new Subject<void>();

  protected products: WritableSignal<Product[]> = linkedSignal(() => []);
  protected productSelect: WritableSignal<Product> = linkedSignal<Product>(() => ({ ...productEmpty }))

  ngOnInit(): void {
    this.findProdcutsSubcription$ = this.productService.findAll()
    .subscribe((products: Product[]) => {
      this.products.set(products);
    });
  }

  ngOnDestroy(): void {
    this.findProdcutsSubcription$?.unsubscribe();
  }
  public createOrUpdated(product: Product) {
    console.log(product);
    if( !product.id && product?.id==0 ){
        console.log("created...")
        this.productService.create(product).pipe(
          takeUntil(this.destroy$) // ✅ Se desuscribe automáticamente
        ).subscribe(product => {
          this.products.update(list => [...list, product]);
        });
    }else{
      console.log("updated...")
      this.productService.update(this.productSelect().id,product)
      .pipe(
          takeUntil(this.destroy$) // ✅ Se desuscribe automáticamente
        ).subscribe(product => {
        this.products.update(list =>
          list.map( p => p.id === product.id ? product : p )
        );
      });
      //this.productService.update(product.id,product);
    }
    // this.products.update(p => [...p,product])
    this.removeProductSelect();
  }

  public editProduct(product: Product){
    console.log("edit")
    this.productSelect.set(product);
  }

  public deleteProduct(id: number){
    console.log("delete");
    this.productService.remove(id)
    .pipe(
          takeUntil(this.destroy$) // ✅ Se desuscribe automáticamente
        )
    .subscribe( resp => this.products.update(list => list.filter(p => p.id != id ) ) )
  }

  public removeProductSelect() {
    //this.productSelect.set({} as Product)
    this.productSelect.set({...productEmpty})
    //console.log(product);
  }

}

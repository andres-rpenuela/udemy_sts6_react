import { ChangeDetectionStrategy, Component, effect, inject, input, OnChanges, output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { productEmpty } from '../../models/product.models';

@Component({
  selector: 'product-form',
  imports: [ReactiveFormsModule ],
  templateUrl: 'product-form.component.html',
  styleUrl: './product-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent{ // implements OnChanges{
  public productModel = input.required<Product>();
  public productEmmit = output<Product>();
  public resetProductModel = output<Product>();

  protected fb = inject(FormBuilder);
  protected form: FormGroup;


  // acutlaizado con effect()
  // ngOnChanges() {
  //   // Actualiza los valores del formulario si cambia productModel
  //   if (this.productModel()) {
  //     this.form.patchValue(this.productModel());
  //   } else {
  //     this.resetForm();
  //   }
  // }


  private fillForm = effect( () =>{
    this.form.patchValue(this.productModel())
  });

  constructor() {
    this.form = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  public submit() {
    if (this.form.valid) {
      this.productEmmit.emit(this.form.value);
      this.resetForm();
    }
  }

  public reset(){
    // esto !productEmpty.id, es por si se edita un registro que no se ha guarado en bbdd, pero se ha creado
    if(!productEmpty.id || productEmpty.id != 0){
      this.resetProductModel.emit({...productEmpty})
    }

    this.resetForm();
  }

  protected resetForm(){
    this.form.reset({...productEmpty});
    //this.form.reset();
  }
}

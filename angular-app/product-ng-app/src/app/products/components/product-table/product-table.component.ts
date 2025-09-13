import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-table',
  imports: [CurrencyPipe],
  templateUrl:'./product-table.component.html',
  styleUrl: './product-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent {
  public products = input.required<Product[]>();
  public edit= output<Product>();
  public delete= output<number>();


  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
 }


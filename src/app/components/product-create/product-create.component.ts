import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html'
})
export class ProductCreateComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    this.productForm = this.fb.group({
      name: [''],
      price: [0],
      category: [''],
      description: [''],
      stock: [0]
    });
  }

  onSubmit(): void {
    this.productService.createProduct(this.productForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      category: [''],
      stock: [0]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
  }


  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }


  onSubmit(): void {
    if (this.productForm.invalid) return;

    if (this.productId !== null) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}

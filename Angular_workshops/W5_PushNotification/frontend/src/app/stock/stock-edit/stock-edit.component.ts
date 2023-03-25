import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css'],
})
export class StockEditComponent implements OnInit {
  imagePreview!: string | ArrayBuffer | null;
  file?: File;

  //  { static: true }
  @ViewChild('productForm') productForm!: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.feedData(params['id']);
    });
  }

  feedData(id: number) {
    this.networkService.getProduct(id).subscribe(
      (data) => {
        var { id, name, price, stock, image } = { ...data };
        this.imagePreview = this.networkService.getProductImageURL(image);
        this.productForm.setValue({ id, name, price, stock });
      },
      (error) => {
        console.log(error.error.message);
        this.router.navigate(['/stock']);
      }
    );
  }

  onPreviewImage(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
      const metaImage = files[0];
      this.file = metaImage;

      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }

    const values = productForm.value;

    let product: Product = {
      name: values.name,
      price: values.price,
      stock: values.stock,
      image: this.file,
    };

    this.networkService.editProduct(values.id, product).subscribe({
      next: (data) => {
        this.location.back();
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}

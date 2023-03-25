import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductResponse } from 'src/app/models/product.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NetworkService } from 'src/app/services/network.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css'],
})
export class StockHomeComponent implements OnInit {
  displayedColumns = ['image', 'name', 'price', 'stock', 'action'];

  dataSource = new MatTableDataSource<ProductResponse>();

  textSearch!: string;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private networkService: NetworkService) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.feedData();
  }

  feedData() {
    this.networkService.getProducts().subscribe(
      (data) => {
        this.dataSource.data = data.map((item) => {
          item.image = this.networkService.getProductImageURL(item.image);
          return item;
        });
      },
      (error) => {
        console.log(JSON.stringify(error.error.message));
      },
      () => {
        console.log('feed network done');
      }
    );
  }

  search(event: Event | null) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = fliterValue.trim().toLowerCase();
  }

  clearSearch() {
    this.textSearch = '';
    this.search(null);
  }

  onClickDeleteProduct(product: ProductResponse) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete Product: ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.networkService.deleteProduct(product.id).subscribe(
          (data) => {
            this.feedData();
          },
          (error) => {
            console.log(JSON.stringify(error.error.message));
          }
        );
      }
    });
  }
}

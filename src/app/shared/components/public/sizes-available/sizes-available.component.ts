import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonModule } from 'primeng/button';
import { PRODUCT_SIZES } from '../../../../common/constants';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-sizes-available',
  standalone: true,
  imports: [CommonModule, ButtonModule, MatButtonModule, MatTooltip, MatIconModule, MatMenuModule, CarouselModule],
  templateUrl: './sizes-available.component.html',
  styleUrl: './sizes-available.component.scss',
})
export class SizesAvailableComponent {
  @Input() itemSizes: any[] = [];
  @Output() isSized: EventEmitter<number> = new EventEmitter<number>();

  selectedSize!: number;

  closeMenuTimeout: any;

  responsiveOptions: any[] | undefined;

  selectSize(size: number) {
    this.selectedSize = size;
    console.log(this.selectedSize);
  }

  emitSizedValue(value: number): void {
    this.isSized.emit(value); // Emitiendo el valor booleano
  }

  ngOnInit() {
    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '1220px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '1100px',
          numVisible: 3,
          numScroll: 1
      }
  ];
  }


}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-sizes-available',
  standalone: true,
  imports: [CommonModule, ButtonModule, MatButtonModule],
  templateUrl: './sizes-available.component.html',
  styleUrl: './sizes-available.component.scss'
})
export class SizesAvailableComponent {

  @Input() itemSizes : any[] = []

  selectedSize! : number;

  selectSize(size: number) {
    this.selectedSize = size;
  }

}

import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SizesAvailableComponent } from '../sizes-available/sizes-available.component';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DiscountPricePipe } from '../../../pipes/discountPrice/discount-price.pipe';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { DragDropModule } from 'primeng/dragdrop';
import { DragDropService } from '../../../services/dragdrop/drag-drop.service';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCard, RouterLink, DiscountPricePipe, CommonModule, SkeletonModule, DragDropModule, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {

  @Input() productSend?: any; // Recibe el producto del componente padre
  @Input() isLoading: boolean = true // Recibe el producto del componente padre
  @Input() delay: number = 0;

  public dialog = inject(MatDialog)
  dragDropService = inject(DragDropService)

  ngOnInit() {
    console.log(this.isLoading)
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: []
    ): void {
    const dialogRef = this.dialog.open(SizesAvailableComponent, {
      width: '60%',
      height: '75%',
      enterAnimationDuration,
      exitAnimationDuration,
      data
    });
    // Manejar el cierre del diálogo
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Si el diálogo se cerró con un resultado 'true', significa que un producto fue editado exitosamente.
        console.log('Producto editado, actualizando lista de productos...');
      /*  this.productEdited.emit(); // Vuelve a cargar los productos para reflejar los cambios*/
      } else {
        // Manejar otros casos, como cierre sin edición
        console.log('Diálogo cerrado sin edición');
      }
    });
  }

  dragStart() {
    this.dragDropService.setDraggedItem(this.productSend);
  }

  dragEnd() {
    this.dragDropService.clearDraggedItem();
  }

}

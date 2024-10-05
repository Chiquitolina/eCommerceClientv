import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SizesAvailableComponent } from '../sizes-available/sizes-available.component';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCard, RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() productSend?: any; // Recibe el producto del componente padre

  public dialog = inject(MatDialog)

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

}

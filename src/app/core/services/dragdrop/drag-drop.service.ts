import { Injectable } from '@angular/core';
import { Product } from '../../../shared/models/Products';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor() { }

  private draggedItem: any = null;

  setDraggedItem(item: Product) {
    this.draggedItem = item;
  }

  getDraggedItem() {
    return this.draggedItem;
  }

  clearDraggedItem() {
    this.draggedItem = null;
  }
  
}

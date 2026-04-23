import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampingItem } from '../../camping-list.service';

@Component({
  selector: 'app-manage',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  // Dados recebidos do pai (App)
  items = input.required<CampingItem[]>();

  // Eventos enviados para o pai (App)
  addItem = output<{ name: string }>();
  updateItem = output<{ item: CampingItem; name: string }>();
  deleteItem = output<number>();
  goToChecklist = output<void>();

  // Estado interno do formulário
  newItemName = '';
  editingItem: CampingItem | null = null;

  saveItem() {
    const name = this.newItemName.trim();
    if (!name) return;

    if (this.editingItem) {
      this.updateItem.emit({ item: this.editingItem, name });
    } else {
      this.addItem.emit({ name });
    }

    this.resetForm();
  }
  startEdit(item: CampingItem) {
    this.editingItem = item;
    this.newItemName = item.name;
  }

  resetForm() {
    this.editingItem = null;
    this.newItemName = '';
  }

  onDeleteItem(id: number) {
    if (this.editingItem?.id === id) this.resetForm();
    this.deleteItem.emit(id);
  }

  onGoToChecklist() {
    this.goToChecklist.emit();
  }
}

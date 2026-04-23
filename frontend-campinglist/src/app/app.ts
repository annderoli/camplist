import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampingListService, CampingItem } from './camping-list.service';
import { ManageComponent } from './components/manage/manage.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { SuccessComponent } from './components/success/success.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ManageComponent, ChecklistComponent, SuccessComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // --- Estado global da aplicação ---
  items = signal<CampingItem[]>([]);
  currentIndex = signal<number>(0);
  isLoading = signal<boolean>(true);
  view = signal<'manage' | 'checklist'>('manage');

  // A tela de sucesso aparece quando o checklist está ativo e todos os itens foram confirmados
  isFinished = computed(() =>
    this.items().length > 0 && this.currentIndex() >= this.items().length
  );

  constructor(private campingService: CampingListService) {}

  ngOnInit() {
    this.loadItems();
  }

  // --- Carregamento de dados ---
  loadItems() {
    this.isLoading.set(true);
    this.campingService.getItems().subscribe({
      next: (data) => { this.items.set(data); this.isLoading.set(false); },
      error: () => { this.isLoading.set(false); }
    });
  }

  // --- Ações da Tela de Gerenciamento ---
  onAddItem(event: { name: string }) {
    this.campingService.createItem({ ...event, isSeparated: false }).subscribe(() => this.loadItems());
  }

  onUpdateItem(event: { item: CampingItem; name: string }) {
    const updated = { ...event.item, name: event.name };
    this.campingService.updateItem(event.item.id, updated).subscribe(() => this.loadItems());
  }

  onDeleteItem(id: number) {
    this.campingService.deleteItem(id).subscribe(() => this.loadItems());
  }

  onGoToChecklist() {
    this.currentIndex.set(0);
    this.items.update(list => list.map(i => ({ ...i, isSeparated: false })));
    this.view.set('checklist');
  }

  // --- Ações da Tela de Checklist ---
  onMarkOk() {
    const current = this.items()[this.currentIndex()];
    if (!current) return;

    this.items.update(list =>
      list.map(item => item.id === current.id ? { ...item, isSeparated: true } : item)
    );
    this.campingService.markAsSeparated(current.id).subscribe();
    this.currentIndex.update(v => v + 1);
  }

  onBackToManage() {
    this.view.set('manage');
  }
}

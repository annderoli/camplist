import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampingItem } from '../../camping-list.service';

@Component({
  selector: 'app-checklist',
  imports: [CommonModule],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css'
})
export class ChecklistComponent {
  // Dados recebidos do pai (App)
  items = input.required<CampingItem[]>();
  currentIndex = input.required<number>();

  // Eventos enviados para o pai (App)
  markOk = output<void>();
  backToManage = output<void>();

  // Valores calculados localmente
  currentItem = computed(() => {
    const list = this.items();
    const idx = this.currentIndex();
    return idx < list.length ? list[idx] : null;
  });

  separatedCount = computed(() =>
    this.items().filter(item => item.isSeparated).length
  );

  totalCount = computed(() => this.items().length);

  progressPercent = computed(() =>
    (this.separatedCount() / this.totalCount()) * 100
  );

  onMarkOk() {
    this.markOk.emit();
  }

  onBackToManage() {
    this.backToManage.emit();
  }
}

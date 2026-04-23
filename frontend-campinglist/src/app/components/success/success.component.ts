import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampingItem } from '../../camping-list.service';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  // Dados recebidos do pai (App)
  items = input.required<CampingItem[]>();

  // Evento enviado para o pai (App)
  backToManage = output<void>();

  onBackToManage() {
    this.backToManage.emit();
  }
}

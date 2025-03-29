import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type MatCardAppearance = 'outlined' | 'raised';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl:'./card.component.html',
  styleUrls:["./card.styles.scss"]
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() footnote: string = '';
  @Input() appearance: MatCardAppearance = 'raised'; // Added appearance input
  @Input() customClasses: string[] = []
  @Output() cardClick = new EventEmitter<void>();

  onClick() {
    this.cardClick.emit();
  }
}

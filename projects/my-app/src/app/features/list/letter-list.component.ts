import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from 'design-system';
import { LetterListService } from './letter-list.service';
import { Letter } from '../../components/letter-form/letter-form.interfaces';
import { NavbarService } from '../../components/navbar/navbar.service';

@Component({
  selector: 'app-letter-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './letter-list.component.html',
  styleUrls:['./letter-list.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class LetterListComponent {
  constructor(private router: Router, private listService: LetterListService, private navService: NavbarService){}
  letters = signal<Letter[]>([]);

  ngOnInit(){
    this.listService.resetLetterSelection();
    this.listService.getLetters().subscribe({
      next: (data) => {
        this.letters.set(data)
      }, 
      error: (err) => console.error('Error fetching letters', err),
    });
  }

  onClick = (letter: Letter) => {
    this.listService.selectLetter(letter);  
    this.router.navigate(['/edit']);
  };
}
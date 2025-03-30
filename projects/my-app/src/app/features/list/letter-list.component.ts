import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent, ToastComponent, ToastService } from 'design-system';
import { LetterListService } from './letter-list.service';
import { Letter } from '../../components/letter-form/letter-form.interfaces';

@Component({
  selector: 'app-letter-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './letter-list.component.html',
  styleUrls:['./letter-list.component.scss'],
  encapsulation: ViewEncapsulation.None, 
})
export class LetterListComponent {
  constructor(private router: Router, private listService: LetterListService, private toastService: ToastService){
    //show toasts if there are any
    const navigation = this.router.getCurrentNavigation();
    const toastData = navigation?.extras?.state?.['toast'];
    if(toastData){
      this.toastService.triggerToast(toastData.type, toastData.message, 5000)
      history.replaceState({}, ''); // removes the state so that toast doesn't show on refresh
    }
  }
  letters = signal<Letter[]>([]);


  ngOnInit(){
    this.listService.getLetters().subscribe({
      next: (data) => {
        this.letters.set(data)
        this.listService.resetLetterSelection();
      }, 
      error: (err) => {
        this.toastService.triggerToast("error", "Operation couldn't complete. Check devTools", 5000)
      },
    });


  }

  onClick = (letter: Letter) => {
    this.listService.selectLetter(letter);  
    this.router.navigate(['/edit']);
  };


}
import { Injectable, signal } from '@angular/core';
import { Letter } from '../../components/letter-form/letter-form.interfaces';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LetterListService {
  private apiUrl = environment.apiUrl+"/letters"
  private selectedLetter = signal<Letter | null>(null);
  constructor(private http: HttpClient) {}

  getLetters(): Observable<Letter[]> {
    return this.http.get<Letter[]>(this.apiUrl).pipe(
      map(letters => letters.map(letter => ({
        ...letter,
        blockA: {
          ...letter.blockA,
          date: new Date(letter.blockA.date) // Convert to Date
        }
      })))
    );
  }

  selectLetter(data: Letter): void {
    this.selectedLetter.set(data);
  }

  resetLetterSelection():void{
    this.selectedLetter.set(null);

    console.log(this.selectedLetter());
    
  }

  getSelectedLetter(): Letter|null {
    return this.selectedLetter()
  }
}

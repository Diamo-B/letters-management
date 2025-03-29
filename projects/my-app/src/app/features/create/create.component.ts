import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../components/navbar/navbar.service';
import { PreviewLetterComponent } from '../../components/preview-letter/preview.component';
import { Router } from '@angular/router';
import { LetterComponent } from '../../components/letter-form/letter-form.component';
import { LetterListService } from '../list/letter-list.service';
import { Letter } from '../../components/letter-form/letter-form.interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, LetterComponent, PreviewLetterComponent],
  selector: 'app-letter',
  templateUrl: './create.template.html',
  styleUrl: './create.styles.scss',
})
export class CreateLetterComponent implements OnInit {
  receivedData: Letter | null = null; 

  constructor(
    private navbarService: NavbarService,
    private letterListService: LetterListService
  ) {}

  ngOnInit() {
    // Get selected letter from the service
    const selectedLetter: Letter | null = this.letterListService.getSelectedLetter();
    console.log(selectedLetter);
    

    if (selectedLetter) {
      this.receivedData = selectedLetter;
    }
  }

  get previewMode() {
    return this.navbarService.getPreviewMode();
  }
}

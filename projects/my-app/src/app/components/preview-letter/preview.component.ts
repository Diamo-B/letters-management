import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { LetterFormService } from '../letter-form/letter-form.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-letter-preview',
  templateUrl: './preview.template.html',
  styleUrl: './preview.styles.scss'
})
export class PreviewLetterComponent {
  constructor(private navbarService: NavbarService, private formService: LetterFormService) {}

  get isPreviewMode() {
    return this.navbarService.getPreviewMode()();
  }

  get form(){
    return this.formService.form;
  }
}

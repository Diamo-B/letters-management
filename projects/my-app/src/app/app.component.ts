import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarService } from './components/navbar/navbar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private navbarService: NavbarService) {}

  get previewMode() {
    return this.navbarService.getPreviewMode();
  }

  onClick() {
    alert('Button clicked!');
  }
}

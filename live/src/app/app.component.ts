import { Component } from '@angular/core';
import { FieldComponent } from './field/field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FieldComponent
  ],
  template: `
    <main>
      <app-field></app-field>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'live';
}

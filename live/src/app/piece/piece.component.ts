import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Piece } from '../piece'

@Component({
  selector: 'app-piece',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
    <div
      data-id="p{{piece.id}}"
      [ngClass]="piece.create ? 'new' : piece.dead ? 'gray' : piece.check ? 'selected' : ''"
      (click)="checkPiece()"
    ></div>
  `,
  styleUrl: './piece.component.css'
})
export class PieceComponent {

  @Input() piece!: Piece;

  checkPiece() {
    this.piece.check = !this.piece.check;
    console.info(this.piece.id)
  }
}
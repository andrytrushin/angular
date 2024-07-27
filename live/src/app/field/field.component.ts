import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieceComponent } from '../piece/piece.component';
import { Piece } from '../piece'

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [
    CommonModule,
    PieceComponent
  ],
  template: `
    <div>
      <app-piece *ngFor="let piece of pieces" [piece]="piece"></app-piece>
    </div>
    <div class="center top">
      <button (click)="gFig()">
        Глайдер
      </button>
      <button (click)="tFig()">
        Танец
      </button>
      <button (click)="bFig()">
        Тумблер
      </button>
      <button (click)="clear()" class="clear">
        Очистить
      </button>
    </div>
    <div class="center">
      <button (click)="calcStep()" class="step">
        Сделать шаг
      </button>
      <button (click)="run()" [ngClass]="runClass">
        {{name}}
      </button>
    </div>
  `,
  styleUrl: './field.component.css'
})

export class FieldComponent {

  name = 'Погнали';
  tid: null | ReturnType<typeof setTimeout> = null;
  runClass = '';
  pieces: Piece[] = [];
  readonly SIDE = 20;
  readonly pSIDE = this.SIDE - 1;
  readonly wSIDE = this.SIDE * this.SIDE;

  constructor() {
    for(let i = 0; i < this.wSIDE; i++)
    {
      this.pieces.push({
        id: i,
        check: false,
        create: false,
        dead: false,
        friends: 0
      });
    }
  }
  isCheck(idx: number) {
    return this.pieces[idx].check ? 1 : 0;
  }
  calcStep() {
    this.pieces.forEach((pie, idx) => {
      let
        i = idx - this.SIDE;

      pie.friends = 0;
      pie.create = false;
      pie.dead = false;

      if (i < 0)
        i = this.wSIDE + i;

      pie.friends += this.isCheck(i % this.SIDE == 0 ? i + this.pSIDE : i - 1);
      pie.friends += this.isCheck(i);
      pie.friends += this.isCheck(i % this.SIDE == this.pSIDE ? i - this.pSIDE : i + 1);
      pie.friends += this.isCheck(idx % this.SIDE == 0 ? idx + this.pSIDE : idx - 1);
      pie.friends += this.isCheck(idx % this.SIDE == this.pSIDE ? idx - this.pSIDE : idx + 1);
      i = idx + this.SIDE;

      if (i >= this.wSIDE)
        i -= this.wSIDE;

      pie.friends += this.isCheck(i % this.SIDE == 0 ? i + this.pSIDE : i - 1);
      pie.friends += this.isCheck(i);
      pie.friends += this.isCheck(i % this.SIDE == this.pSIDE ? i - this.pSIDE : i + 1);

      if (!pie.check && pie.friends > 2 && pie.friends < 4)
        pie.create = true;

      if (pie.check && (pie.friends < 2 || pie.friends > 3))
        pie.dead = true;

    });
    setTimeout(() => this.pieces.forEach(pie => {
      if (pie.dead)
      {
        pie.check = false;
        pie.dead = false;
      }
      if (pie.create)
      {
        pie.check = true;
        pie.create = false;
      }
    }), 100);
  }
  clear() {
    this.pieces.forEach(pie => pie.check = false);
  }
  run() {
    if (this.tid)
    {
      this.name = 'Погнали';
      this.runClass = '';
      clearInterval(this.tid);
      this.tid = null;
    }
    else
    {
      this.name = 'Стоп';
      this.runClass = 'run';
      this.tid = setInterval(
        () => this.calcStep(),
        300
      );
    }
  }
  gFig () {
    [228, 208, 188, 189, 210].forEach(num => this.pieces[num].check = true);
  }
  tFig () {
    [227, 207, 208, 269, 270, 250, 252, 233, 212, 168, 149, 170].forEach(num => this.pieces[num].check = true);
  }
  bFig () {
    [230, 210, 170, 148, 168, 188, 208, 228, 147, 167, 150, 170, 190, 210, 230, 151, 171, 251, 252, 232, 212, 247, 246, 226, 206].forEach(num => this.pieces[num].check = true);
  }
}
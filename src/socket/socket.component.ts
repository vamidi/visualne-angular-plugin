import { Component, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { Socket, IO, Input as VisualNEInput, SocketColorType } from 'visualne';
import { SocketType } from '../types';

@Component({
  selector: 'rete-socket',
  template: `<div *ngIf="socket"
                  [ngClass]="[type, socket.name, socketType, 'socket', map(extraClass)]"
                  [style.background]="checkSocketColor('used') ? socketColor : ''"
                  [ngStyle]="{ '--featured-image': socketColor } "
                  [title]="socket.name">
  </div>`,
  styleUrls: ['./socket.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketComponent implements AfterViewInit {
  @Input() socket!: Socket;
  @Input() io!: IO;
  @Input() extraClass!: string[];

  socketColor: string = '#fff';
  socketType: SocketColorType = 'normal';

  get type(): SocketType {
    return this.io instanceof VisualNEInput ? 'input' : 'output';
  }

  public ngAfterViewInit()
  {
    const c = this.socket;
    if(c) {
      const data = <any>c.data;
      this.socketColor = data.color;
      this.socketType = data.socketType ? data.socketType : 'normal';

      document.documentElement.style.setProperty('--socket-color', this.socketColor);
    }
  }

  public map(arr: string[]): string
  {
    return arr.join(' ');
  }

  public checkSocketColor(needle: string)
  {
    return this.extraClass.some(className => className === needle);
  }
}

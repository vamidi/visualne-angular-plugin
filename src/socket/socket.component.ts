import {
  Component,
  Input,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { Socket, IO, Input as VisualNEInput } from 'visualne';
import { SocketType } from '../types';

@Component({
  selector: 'visualne-socket',
  template: `
      <div [ngClass]="[type, connected, socket.name, 'socket', map(socketClass)]"
                  [style.border]="'1px solid ' + socket.Color"
                  [style.background-color]="connected ? socket.Color : ''"
                  [title]="socket.name">
      </div>`,
  styleUrls: ['./socket.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocketComponent
{
  @Input() socket!: Socket;
  @Input() io!: IO;
  @Input() socketClass: string[] = [];

  get type(): SocketType {
    return this.io instanceof VisualNEInput ? 'input' : 'output';
  }

  get connected(): string {
    return this.io.hasConnection() ? 'connected' : '';
  }

  public map(arr: string[]): string
  {
    return arr && arr.length ? arr.join(' ') : '';
  }

  public checkSocketColor(needle: string)
  {
    return this.socketClass ? this.socketClass.some(className => className === needle) : false;
  }
}

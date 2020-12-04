import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { IO, Input as VisualNEInput } from 'visualne';
import { NodeService } from './node.service';
import { SocketType } from './types';

@Directive({
  selector: '[visualne-socket]'
})
export class SocketDirective implements OnInit {
    @Input() io!: IO;

    constructor(private el: ElementRef, private service: NodeService) {}

    get type(): SocketType {
      return this.io instanceof VisualNEInput ? 'input' : 'output';
    }

    ngOnInit() {
      this.service.bindSocket(this.el.nativeElement, this.type, this.io);
    }
}

import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Control } from 'visualne';
import { NodeService } from './node.service';

@Directive({
  selector: '[visualne-control]'
})
export class ControlDirective implements OnInit {
  @Input('visualne-control') control!: Control;

  constructor(private el: ElementRef, private service: NodeService) {}

  ngOnInit() {
    this.service.bindControl(this.el.nativeElement, this.control);
  }
}

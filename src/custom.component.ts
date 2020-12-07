import {
  Component,
  Input,
  OnInit,
  Injector,
  ComponentFactoryResolver,
  ViewContainerRef,
  Type,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Control } from 'visualne';
import { AngularControl, Props } from './types';

@Component({
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit, OnDestroy {
  @Input() component!: Type<Component>;
  @Input() control!: AngularControl;
  @Input() props!: Props;

  constructor(
    private vcr: ViewContainerRef,
    private injector: Injector,
    private factoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    const factory = this.factoryResolver.resolveComponentFactory(this.component);
    const componentRef = factory.create(this.injector);
    const { props } = this;

    if (this.control && typeof this.control['onComponentAttached'] === 'function')
      this.control.onComponentAttached(componentRef.instance);

    for(let key in props) {
      if(props.hasOwnProperty(key)) {
        Object.defineProperty(componentRef.instance, key, {
          get() { return props[key]; },
          set(val) { props[key] = val; }
        })
      }
    }

    this.vcr.insert(componentRef.hostView);
  }

  ngOnDestroy() {
    if (this.control && typeof this.control['onComponentDetached'] === 'function')
      this.control.onComponentDetached();

    this.vcr.detach(0);
  }
}

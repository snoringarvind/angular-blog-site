import { Directive, Input, OnInit } from '@angular/core';
import { INSPECT_MAX_BYTES } from 'node:buffer';

@Directive({
  selector: '[appUseObserver]',
})
export class UseObserverDirective implements OnInit {
  constructor() {}

  @Input() threshold = 1;
  @Input() debounceTime = 0;

  ngOnInit() {}

  useIntersectionObserver(
    target: any,
    onIntersect: any,
    threshold: any,
    rootMargin: any
  ) {
    const Observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const current = target.current;

    Observer.observe(current);

    return () => {
      Observer.unobserve(current);
    };
  }
}

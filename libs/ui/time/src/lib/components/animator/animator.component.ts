import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core'
import { interval } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

@Component({
  selector: 'ui-animator',
  templateUrl: './animator.component.html',
  styleUrls: ['./animator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatorComponent implements OnInit {
  @Input() size: number
  @Input() index: number
  @Output() indexChange = new EventEmitter<number>()

  active = false
  animation$

  constructor() {}

  ngOnInit(): void {
    this.animation$ = interval(1000)
      .pipe(filter(() => this.active))
      .subscribe(() => this.setNextIndex())
  }

  toggleActive(): void {
    this.active = !this.active
  }

  setNextIndex(): void {
    this.index = (this.index + 1) % this.size
    this.indexChange.emit(this.index)
  }

  setPreviousIndex(): void {
    let index = this.index - 1
    if (index < 0) {
      index += this.size
    }
    this.index = index
    this.indexChange.emit(this.index)
  }
}

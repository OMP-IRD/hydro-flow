import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen'

@Component({
  selector: 'ui-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullscreenComponent implements OnInit {
  enabled: boolean

  constructor(    private _changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    fullscreenChange(() => {
      this.enabled = isFullscreen()
      this._changeDetectionRef.detectChanges()
    })
  }

  toggle() {
    toggleFullscreen(document.body)
  }
}

import { Component, OnInit } from '@angular/core'
import toggleFullscreen, {
  fullscreenChange,
  isFullscreen,
} from 'toggle-fullscreen'

@Component({
  selector: 'ui-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenComponent implements OnInit {
  enabled: boolean

  constructor() {}

  ngOnInit() {
    fullscreenChange(() => (this.enabled = isFullscreen()))
  }

  toggle() {
    toggleFullscreen(document.body)
  }
}

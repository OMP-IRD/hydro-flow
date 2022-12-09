import { HttpClient } from '@angular/common/http'
import { TranslateCompiler, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'

export const DEFAULT_LANG = 'fr'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/')
}

export function getLangFromHtml() {
  const html: HTMLElement = document.getElementsByTagName('html')[0]
  const lang = html.getAttribute('lang')
  return lang?.substr(0, 2)
}
export function getLangFromBrowser() {
  return navigator.language.substr(0, 2)
}
export function getDefaultLang() {
  return getLangFromHtml() || DEFAULT_LANG
}

export const TRANSLATE_DEFAULT_CONFIG = {
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    defaultLanguage: DEFAULT_LANG,
    deps: [HttpClient],
  },
}

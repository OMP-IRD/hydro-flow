import 'whatwg-fetch'

class Settings {
  apiUrl: ''

  init() {
    return fetch('assets/settings.json')
      .then((response) => response.json())
      .then((json) => {
        Object.assign(this, json)
      })
  }
}

const SETTINGS = new Settings()
export default SETTINGS

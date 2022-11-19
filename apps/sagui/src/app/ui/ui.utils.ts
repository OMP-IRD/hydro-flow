const TAB_COLOR_MAPPING = {
  n: '#00eb6c',
  '1': '#ffeb3b',
  '2': '#fcbd00',
  '3': '#ff4538',
  null: '#efefef',
}

export function alertCodeToColor(alertCode) {
  if (alertCode) {
    const code = alertCode[0]
    let level = code ? (code === 'n' ? 'n' : alertCode[1]) : 'null'
    if (Object.prototype.hasOwnProperty.call(TAB_COLOR_MAPPING, level)) {
      return TAB_COLOR_MAPPING[level]
    }
  }
  return TAB_COLOR_MAPPING.null
}

export function alertCodeToIcon(alertCode) {
  const code = alertCode && alertCode[0]
  return code && `assets/stations/${code}.png`
}

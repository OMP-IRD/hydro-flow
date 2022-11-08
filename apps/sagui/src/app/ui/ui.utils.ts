const TAB_COLOR_MAPPING = {
  n: '#81B29A',
  '1': '#F2CC8F',
  '2': '#E07A5F',
  '3': '#F4F1DE',
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

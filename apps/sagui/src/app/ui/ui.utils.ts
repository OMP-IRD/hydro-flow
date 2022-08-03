const TAB_COLOR_MAPPING = {
  n: '#81B29A',
  r1: '#F2CC8F',
  r2: '#E07A5F',
  null: '#F4F1DE',
}

export function alertCodeToColor(alertCode) {
  if (Object.prototype.hasOwnProperty.call(TAB_COLOR_MAPPING, alertCode)) {
    return TAB_COLOR_MAPPING[alertCode]
  }
  return TAB_COLOR_MAPPING.null
}

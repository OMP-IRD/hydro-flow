export const setRgbOpacity = function (rgb: string, opacity: number) {
  return rgb.replace(')', `, ${opacity})`)
}

/**
 * Convert Date object to MVT data parameter YYY-MM-dd
 * @param date
 */
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
    '0' + date.getDate()
  ).slice(-2)}`
}

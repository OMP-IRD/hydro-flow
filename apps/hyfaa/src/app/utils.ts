export const setRgbOpacity = function(rgb: string, opacity: number) {
  return rgb.replace(')', `, ${opacity})`)
}

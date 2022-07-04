/**
 * Convert Date object to MVT data parameter yyy-MM-dd
 * @param date
 */
export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
    '0' + date.getDate()
  ).slice(-2)}`
}

/**
 * Convert Date object to MVT data parameter yyyMMdd
 * @param date
 */
export const dateToyyyMMdd = (date: Date): string => {
  return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${(
    '0' + date.getDate()
  ).slice(-2)}`
}

/**
 * Convert Date object to MVT data parameter HHmm
 * @param date
 */
export const dateToHHmm = (date: Date): string => {
  return `${('0' + date.getHours()).slice(-2)}${('0' + date.getMinutes()).slice(
    -2
  )}`
}

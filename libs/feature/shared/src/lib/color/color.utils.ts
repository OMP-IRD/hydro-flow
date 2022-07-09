import chroma from 'chroma-js'

export function addOpacity(color: string, opactiy: number) {
  return chroma(color).alpha(opactiy).css()
}

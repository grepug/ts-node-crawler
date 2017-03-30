export const toDiscipline = function (d) {
  return d.slice(0, 2).toLowerCase()
}

export const slice = Array.prototype.slice

export const resolveBoolean = function (s): Boolean {
  s = s.slice(0, 1).toLowerCase()
  if (s === 'y') return true
  return false
}

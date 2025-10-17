const modifierFromLevel = level => {
  return Math.floor((level - 10) / 2)
}

const proficiencyBonusFromLevel = level => {
  return Math.ceil(level / 4) + 1
}

export {
  modifierFromLevel,
  proficiencyBonusFromLevel
}
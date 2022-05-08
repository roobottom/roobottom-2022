module.exports = (ms, negative = false) => {
  ms = negative ? ms * -1 : ms
  const msInYear = 31557600000
  const msInMonth = 2629800000
  const years = Math.floor(ms / msInYear)
  const monthRemainder = ms - (years * msInYear)
  const months = Math.floor(monthRemainder / msInMonth)

  const yearLabel = years > 1 ? 'years' : 'year'
  const monthLabel = months > 1 ? 'months' : 'month'
  const displayYears = years > 0 ? `${years} ${yearLabel}` : ''
  const displayMonths = months > 0 ? `${months} ${monthLabel}` : ''
  const seperator = displayMonths === '' ? '' : ' '
  return displayYears + seperator + displayMonths
}
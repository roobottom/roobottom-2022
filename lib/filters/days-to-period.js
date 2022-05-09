module.exports = (days, format = 'years') => {
  let months, years, times

  months = Math.floor(days / 30)
  years = Math.floor(months / 12)
  months = months % 12

  times = {
    days: days,
    months: months,
    years, years
  }
  return times[format]
}
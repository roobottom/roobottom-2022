const moment = require('moment')

/**
 * 
 * @param {Date} firstDate A valid momentjs date
 * @param {Date} secondDate A valid momentjs date
 * @returns the milliseconds between first and second dates
 */

module.exports = (firstDate, secondDate) => {
  let a = moment(firstDate)
  let b = moment(secondDate)
  return a.diff(b)
}
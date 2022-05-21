module.exports = (array1, array2) => {
  if (typeof array1 !== 'object' || typeof array2 !== 'object') return 0
  //https://stackoverflow.com/questions/49840742/find-count-of-matched-elements-in-two-arrays
  return array1.reduce((a, c) => a + array2.includes(c), 0)
}
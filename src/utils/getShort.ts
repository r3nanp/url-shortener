/** This function will generate a random string with 8 of length */
export const getShort = (): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

  const short = [...new Array(8)]
    .map(_ => alphabet[Math.floor(Math.random() * alphabet.length)])
    .join('')

  return short
}

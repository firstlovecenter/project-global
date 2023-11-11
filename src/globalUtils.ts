export const pluralize = (word?: string, count?: number) => {
  if (!word) {
    return ''
  }

  if (word === 'campus') {
    return count === 1 ? word : 'campuses'
  }
  if (word === 'country') {
    return count === 1 ? word : 'countries'
  }

  return count === 1 ? word : `${word}s`
}

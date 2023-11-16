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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRequest = (request: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter((field) => !request[field])

  if (missingFields.length > 0) {
    return `Missing fields: ${missingFields.join(', ')}`
  }

  return null
}

export const removeSpaces = (str: string) => {
  return str.replace(/\s/g, '')
}

export const initialise = (searchString: string, initialValue?: string) => {
  const showingSame = initialValue === searchString

  if (!initialValue) {
    return ''
  }

  if (!showingSame) {
    return initialValue
  }

  return searchString
}

export const DEBOUNCE_TIMER = 500

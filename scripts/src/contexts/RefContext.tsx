import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface RefContextType {
  denominationRef?: string
  continentRef?: string
  countryRef?: string
  councilRef?: string
  campusRef?: string
  memberRef?: string
  clickCard: (ref: string, type: string) => void
}

const RefContext = createContext<RefContextType>({
  denominationRef: undefined,
  continentRef: undefined,
  countryRef: undefined,
  councilRef: undefined,
  campusRef: undefined,
  memberRef: undefined,
  clickCard: () => null,
})

// eslint-disable-next-line react-refresh/only-export-components
export const useRef = () => {
  const context = useContext(RefContext)
  if (context === undefined) {
    throw new Error('useRef must be used within a RefProvider')
  }
  return context
}

export const RefContextProvider = ({ children }: { children: ReactNode }) => {
  const [denominationRef, setDenominationRef] = useState<string>(
    sessionStorage.getItem('denominationRef') ?? ''
  )

  const [continentRef, setContinentRef] = useState<string>(
    sessionStorage.getItem('continentRef') ?? ''
  )

  const [countryRef, setCountryRef] = useState<string>(
    sessionStorage.getItem('countryRef') ?? ''
  )

  const [councilRef, setCouncilRef] = useState<string>(
    sessionStorage.getItem('councilRef') ?? ''
  )

  const [campusRef, setCampusRef] = useState<string>(
    sessionStorage.getItem('campusRef') ?? ''
  )
  const [memberRef, setMemberRef] = useState<string>(
    sessionStorage.getItem('memberRef') ?? ''
  )

  const setDenRef = (denominationRef: string) => {
    setDenominationRef(denominationRef)
    sessionStorage.setItem('denominationRef', JSON.stringify(denominationRef))
  }

  const setContRef = (continentRef: string) => {
    setContinentRef(continentRef)
    sessionStorage.setItem('continentRef', JSON.stringify(continentRef))
  }

  const setCountRef = (countryRef: string) => {
    setCountryRef(countryRef)
    sessionStorage.setItem('countryRef', JSON.stringify(countryRef))
  }

  const setCouncRef = (councilRef: string) => {
    setCouncilRef(councilRef)
    sessionStorage.setItem('councilRef', JSON.stringify(councilRef))
  }

  const setCampRef = (campusRef: string) => {
    setCampusRef(campusRef)
    sessionStorage.setItem('campusRef', JSON.stringify(campusRef))
  }
  const setMemRef = (memberRef: string) => {
    setMemberRef(memberRef)
    sessionStorage.setItem('memberRef', JSON.stringify(memberRef))
  }

  const clickCard = useCallback((ref: string, type: string) => {
    switch (type.toLowerCase()) {
      case 'denomination':
        setDenRef(ref)
        break
      case 'continent':
        setContRef(ref)
        break
      case 'country':
        setCountRef(ref)
        break
      case 'council':
        setCouncRef(ref)
        break
      case 'campus':
        setCampRef(ref)
        break
      case 'member':
        setMemRef(ref)
        break
      default:
        break
    }
  }, [])

  const value = useMemo(
    () => ({
      denominationRef,
      continentRef,
      countryRef,
      councilRef,
      campusRef,
      memberRef,
      clickCard,
    }),
    [
      denominationRef,
      continentRef,
      countryRef,
      councilRef,
      campusRef,
      memberRef,
      clickCard,
    ]
  )

  return <RefContext.Provider value={value}>{children}</RefContext.Provider>
}

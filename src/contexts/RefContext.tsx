import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type RefType =
  | 'planet'
  | 'continent'
  | 'country'
  | 'city'
  | 'denomination'
  | 'family'
  | 'council'
  | 'campus'
  | 'member'

interface RefContextType {
  planetRef: string
  continentRef: string
  countryRef: string
  cityRef: string

  denominationRef: string
  familyRef: string
  councilRef: string
  campusRef: string

  memberRef: string
  clickCard: (ref: string, type: RefType) => void
}

const RefContext = createContext<RefContextType>({
  planetRef: '',
  continentRef: '',
  countryRef: '',
  cityRef: '',
  denominationRef: '',
  familyRef: '',
  councilRef: '',
  campusRef: '',
  memberRef: '',

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
  const [planetRef, setPlanetRef] = useState<string>(
    sessionStorage.getItem('planetRef') ?? ''
  )

  const [continentRef, setContinentRef] = useState<string>(
    sessionStorage.getItem('continentRef') ?? ''
  )

  const [countryRef, setCountryRef] = useState<string>(
    sessionStorage.getItem('countryRef') ?? ''
  )
  const [cityRef, setCityRef] = useState<string>(
    sessionStorage.getItem('cityRef') ?? ''
  )
  const [denominationRef, setDenominationRef] = useState<string>(
    sessionStorage.getItem('denominationRef') ?? ''
  )
  const [familyRef, setFamilyRef] = useState<string>(
    sessionStorage.getItem('familyRef') ?? ''
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

  const setPlaRef = (planetRef: string) => {
    setPlanetRef(planetRef)
    sessionStorage.setItem('planetRef', planetRef)
  }

  const setContRef = (continentRef: string) => {
    setContinentRef(continentRef)
    sessionStorage.setItem('continentRef', continentRef)
  }

  const setCountRef = (countryRef: string) => {
    setCountryRef(countryRef)
    sessionStorage.setItem('countryRef', countryRef)
  }
  const setCitRef = (cityRef: string) => {
    setCityRef(cityRef)
    sessionStorage.setItem('cityRef', cityRef)
  }

  const setDenRef = (denominationRef: string) => {
    setDenominationRef(denominationRef)
    sessionStorage.setItem('denominationRef', denominationRef)
  }
  const setFamRef = (familyRef: string) => {
    setFamilyRef(familyRef)
    sessionStorage.setItem('familyRef', familyRef)
  }
  const setCouncRef = (councilRef: string) => {
    setCouncilRef(councilRef)
    sessionStorage.setItem('councilRef', councilRef)
  }

  const setCampRef = (campusRef: string) => {
    setCampusRef(campusRef)
    sessionStorage.setItem('campusRef', campusRef)
  }
  const setMemRef = (memberRef: string) => {
    setMemberRef(memberRef)
    sessionStorage.setItem('memberRef', memberRef)
  }

  const clickCard = useCallback((ref: string, type: RefType) => {
    switch (type.toLowerCase()) {
      case 'planet':
        setPlaRef(ref)
        break
      case 'continent':
        setContRef(ref)
        break
      case 'country':
        setCountRef(ref)
        break
      case 'city':
        setCitRef(ref)
        break
      case 'denomination':
        setDenRef(ref)
        break
      case 'family':
        setFamRef(ref)
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
      planetRef,
      continentRef,
      countryRef,
      cityRef,
      denominationRef,
      familyRef,
      councilRef,
      campusRef,
      memberRef,
      clickCard,
    }),
    [
      planetRef,
      continentRef,
      countryRef,
      cityRef,
      denominationRef,
      familyRef,
      councilRef,
      campusRef,
      memberRef,
      clickCard,
    ]
  )

  return <RefContext.Provider value={value}>{children}</RefContext.Provider>
}

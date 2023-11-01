import React, {
  ReactNode,
  createContext,
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
  setDenominationRef: (planetRef: string) => void
  setContinentRef: (continentRef: string) => void
  setCountryRef: (continentRef: string) => void
  setCouncilRef: (councilRef: string) => void
  setCampusRef: (continentRef: string) => void
  setMemberRef: (memberRef: string) => void
}

const RefContext = createContext<RefContextType>({
  denominationRef: undefined,
  continentRef: undefined,
  countryRef: undefined,
  councilRef: undefined,
  campusRef: undefined,
  memberRef: undefined,
  setDenominationRef: () => null,
  setContinentRef: () => null,
  setCountryRef: () => null,
  setCouncilRef: () => null,
  setCampusRef: () => null,
  setMemberRef: () => null,
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
    JSON.parse(sessionStorage.getItem('denominationRef') ?? '')
  )

  const [continentRef, setContinentRef] = useState<string>(
    JSON.parse(sessionStorage.getItem('continentRef') ?? '')
  )

  const [countryRef, setCountryRef] = useState<string>(
    JSON.parse(sessionStorage.getItem('countryRef') ?? '')
  )

  const [councilRef, setCouncilRef] = useState<string>(
    JSON.parse(sessionStorage.getItem('councilRef') ?? '')
  )

  const [campusRef, setCampusRef] = useState<string>(
    JSON.parse(sessionStorage.getItem('campusRef') ?? '')
  )
  const [memberRef, setMemberRef] = useState<string>(
    JSON.parse(sessionStorage.getItem('memberRef') ?? '')
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

  const value = useMemo(
    () => ({
      denominationRef,
      continentRef,
      countryRef,
      councilRef,
      campusRef,
      memberRef,
      setDenominationRef: setDenRef,
      setContinentRef: setContRef,
      setCountryRef: setCountRef,
      setCouncilRef: setCouncRef,
      setCampusRef: setCampRef,
      setMemberRef: setMemRef,
    }),
    [
      denominationRef,
      continentRef,
      countryRef,
      councilRef,
      campusRef,
      memberRef,
    ]
  )

  return <RefContext.Provider value={value}>{children}</RefContext.Provider>
}

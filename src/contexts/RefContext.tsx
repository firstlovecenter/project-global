import { DocumentData, DocumentReference } from 'firebase/firestore'
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

interface RefContextType {
  denominationRef?: DocumentReference<DocumentData>
  continentRef?: DocumentReference<DocumentData>
  countryRef?: DocumentReference<DocumentData>
  councilRef?: DocumentReference<DocumentData>
  campusRef?: DocumentReference<DocumentData>
  memberRef?: DocumentReference<DocumentData>
  setDenominationRef: (planetRef: DocumentReference) => void
  setContinentRef: (continentRef: DocumentReference) => void
  setCountryRef: (continentRef: DocumentReference) => void
  setCouncilRef: (councilRef: DocumentReference) => void
  setCampusRef: (continentRef: DocumentReference) => void
  setMemberRef: (memberRef: DocumentReference) => void
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
  const [denominationRef, setDenominationRef] = useState<DocumentReference>(
    JSON.parse(sessionStorage.getItem('denominationRef') ?? '{}')
  )

  const [continentRef, setContinentRef] = useState<DocumentReference>(
    JSON.parse(sessionStorage.getItem('continentRef') ?? '{}')
  )

  const [countryRef, setCountryRef] = useState<DocumentReference>(
    JSON.parse(sessionStorage.getItem('countryRef') ?? '{}')
  )

  const [councilRef, setCouncilRef] = useState<DocumentReference>(
    JSON.parse(sessionStorage.getItem('councilRef') ?? '{}')
  )

  const [campusRef, setCampusRef] = useState<DocumentReference>(
    JSON.parse(sessionStorage.getItem('campusRef') ?? '{}')
  )
  const [memberRef, setMemberRef] = useState<DocumentReference>(
    JSON.parse(sessionStorage.getItem('memberRef') ?? '{}')
  )

  const setDenRef = (denominationRef: DocumentReference) => {
    setDenominationRef(denominationRef)
    sessionStorage.setItem('denominationRef', JSON.stringify(denominationRef))
  }

  const setContRef = (continentRef: DocumentReference) => {
    setContinentRef(continentRef)
    sessionStorage.setItem('continentRef', JSON.stringify(continentRef))
  }

  const setCountRef = (countryRef: DocumentReference) => {
    setCountryRef(countryRef)
    sessionStorage.setItem('countryRef', JSON.stringify(countryRef))
  }

  const setCouncRef = (councilRef: DocumentReference) => {
    setCouncilRef(councilRef)
    sessionStorage.setItem('councilRef', JSON.stringify(councilRef))
  }

  const setCampRef = (campusRef: DocumentReference) => {
    setCampusRef(campusRef)
    sessionStorage.setItem('campusRef', JSON.stringify(campusRef))
  }
  const setMemRef = (memberRef: DocumentReference) => {
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

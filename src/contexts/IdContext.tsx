import React, { ReactNode, createContext, useMemo, useState } from 'react'

interface IdContextType {
  denominationId: string
  continentId: string
  countryId: string
  councilId: string
  campusId: string
  setDenominationId: (planetId: string) => void
  setContinentId: (continentId: string) => void
  setCountryId: (continentId: string) => void
  setCouncilId: (councilId: string) => void
  setCampusId: (continentId: string) => void
}

const IdContext = createContext<IdContextType>({
  denominationId: '',
  continentId: '',
  countryId: '',
  councilId: '',
  campusId: '',
  setDenominationId: () => null,
  setContinentId: () => null,
  setCountryId: () => null,
  setCouncilId: () => null,
  setCampusId: () => null,
})

export const IdContextProvider = ({ children }: { children: ReactNode }) => {
  const [denominationId, setDenominationId] = useState<string>(
    sessionStorage.getItem('denominationId') ?? ''
  )

  const [continentId, setContinentId] = useState<string>(
    sessionStorage.getItem('continentId') ?? ''
  )

  const [countryId, setCountryId] = useState<string>(
    sessionStorage.getItem('countryId') ?? ''
  )

  const [councilId, setCouncilId] = useState<string>(
    sessionStorage.getItem('councilId') ?? ''
  )

  const [campusId, setCampusId] = useState<string>(
    sessionStorage.getItem('campusId') ?? ''
  )

  const setDenId = (denominationId: string) => {
    setDenominationId(denominationId)
    sessionStorage.setItem('denominationId', denominationId)
  }

  const setContId = (continentId: string) => {
    setContinentId(continentId)
    sessionStorage.setItem('continentId', continentId)
  }

  const setCountId = (countryId: string) => {
    setCountryId(countryId)
    sessionStorage.setItem('countryId', countryId)
  }

  const setCouncId = (councilId: string) => {
    setCouncilId(councilId)
    sessionStorage.setItem('councilId', councilId)
  }

  const setCampId = (campusId: string) => {
    setCampusId(campusId)
    sessionStorage.setItem('campusId', campusId)
  }

  const value = useMemo(
    () => ({
      denominationId,
      continentId,
      countryId,
      councilId,
      campusId,
      setDenominationId: setDenId,
      setContinentId: setContId,
      setCountryId: setCountId,
      setCouncilId: setCouncId,
      setCampusId: setCampId,
    }),
    [denominationId, continentId, countryId, councilId, campusId]
  )

  return <IdContext.Provider value={value}>{children}</IdContext.Provider>
}

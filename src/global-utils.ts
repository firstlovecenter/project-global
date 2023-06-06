export const plural = (church: string) => {
  switch (church) {
    case 'Continent':
      return 'Continents'
    case 'Country':
      return 'Countries'
    case 'Council':
      return 'Councils'
    case 'Campus':
      return 'Campuses'
  }
}

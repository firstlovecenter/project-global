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
    case 'campus':
      return 'campuses'
    default:
      return church
  }
}

export const CLD_FUNCTIONS_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:5001/project-global-aa5ea/europe-west1'
  : 'https://europe-west1-project-global-aa5ea.cloudfunctions.net'

export const SEARCH_FUNCTION_BASE_URL = `${CLD_FUNCTIONS_BASE_URL}/search`

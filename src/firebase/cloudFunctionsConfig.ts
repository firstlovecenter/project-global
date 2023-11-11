export const CLD_FUNCTIONS_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:5001/project-global-aa5ea/europe-west1'
  : 'https://europe-west1-project-global-aa5ea.cloudfunctions.net'

export const SEARCH_FUNCTION_BASE_URL = `${CLD_FUNCTIONS_BASE_URL}/search`

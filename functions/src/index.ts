/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export { directory } from './directory'
export { updateDocIdOnNameChange } from './directory-churches'
export { updateUserClaims } from './auth'
export { updateMemberLeads } from './updateRoleChurches'
export { resizeAvatar } from './storage'
export { search } from './search'

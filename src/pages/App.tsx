import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { AuthProvider } from 'contexts/AuthContext'
import PrivateRoute from 'auth/ProtectedRoute'
import { authRoutes } from 'auth/authRoutes'
import { LoadingPage, PageNotFound } from '@jaedag/admin-portal-react-core'
import { Suspense } from 'react'
import { directoryRoutes } from 'pages/directory/directoryRoutes'
import { RefContextProvider } from 'contexts/RefContext'
import { FirestoreProvider, FunctionsProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { UserProvider } from 'contexts/UserContext'
import { functions } from 'firebase/firebase'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'redux-config/store'

const App = () => {
  const firestoreInstance = getFirestore(useFirebaseApp())

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <ReduxProvider store={store}>
        <FunctionsProvider sdk={functions}>
          <BrowserRouter>
            <AuthProvider>
              <UserProvider>
                <RefContextProvider>
                  <Navigation />
                  <Suspense fallback={<LoadingPage />}>
                    <Routes>
                      {[...authRoutes, ...directoryRoutes].map((route, i) => (
                        <Route
                          key={i}
                          path={route.path}
                          element={
                            <PrivateRoute
                              roles={route.roles}
                              placeholder={route.placeholder}
                            >
                              <route.element />
                            </PrivateRoute>
                          }
                        />
                      ))}
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                  </Suspense>
                </RefContextProvider>
              </UserProvider>
            </AuthProvider>
          </BrowserRouter>
        </FunctionsProvider>
      </ReduxProvider>
    </FirestoreProvider>
  )
}

export default App

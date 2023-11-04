import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { AuthProvider } from 'contexts/AuthContext'
import PrivateRoute from 'auth/PrivateRoute'
import { authRoutes } from 'auth/authRoutes'
import { LoadingPage, PageNotFound } from '@jaedag/admin-portal-react-core'
import { Suspense } from 'react'
import { directoryRoutes } from 'pages/directory/directoryRoutes'
import { RefContextProvider } from 'contexts/RefContext'
import { FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { UserProvider } from 'contexts/UserContext'

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp())

  return (
    <FirestoreProvider sdk={firestoreInstance}>
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
    </FirestoreProvider>
  )
}

export default App

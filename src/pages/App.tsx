import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
import DesktopNavigation from 'components/DesktopNavigation'

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
                  <MainLayout />
                </RefContextProvider>
              </UserProvider>
            </AuthProvider>
          </BrowserRouter>
        </FunctionsProvider>
      </ReduxProvider>
    </FirestoreProvider>
  )
}

const MainLayout = () => {
  const location = useLocation()
  const excludeNavigationRoutes = ['/login', '/loading']

  return (
    <>
      {!excludeNavigationRoutes.includes(location.pathname) && (
        <DesktopNavigation />
      )}
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
    </>
  )
}

export default App

import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './app/AppLayout'
import { appRoutes } from './app/routes'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { LoginPage } from './features/auth/LoginPage'

function App() {
  return (
    <Suspense fallback={<div className="page-loading">Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={`/${appRoutes[0].path}`} replace />} />
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.Component />} />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App

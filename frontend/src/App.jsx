import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { AppLayout } from './layouts/AppLayout';

// Public Pages
import { Welcome } from './pages/public/Welcome';
import { Features } from './pages/public/Features';
import { HowItWorks } from './pages/public/HowItWorks';
import { Pricing } from './pages/public/Pricing';
import { About } from './pages/public/About';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';

// App Pages
import { Dashboard } from './pages/app/Dashboard';
import { Projects } from './pages/app/Projects';
import { ProjectDetail } from './pages/app/ProjectDetail';
import { NewTest } from './pages/app/NewTest';
import { TestExecution } from './pages/app/TestExecution';
import { Results } from './pages/app/Results';
import { ApiTests } from './pages/app/ApiTests';
import { UiTests } from './pages/app/UiTests';
import { Performance } from './pages/app/Performance';
import { Network } from './pages/app/Network';
import { Console } from './pages/app/Console';
import { Reports } from './pages/app/Reports';
import { Settings } from './pages/app/Settings';
import { Profile } from './pages/app/Profile';

// Helper for redirecting authenticated users away from auth pages
function RedirectIfAuthenticated({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Welcome Experience */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Authentication Routes (Split-screen layout) */}
          <Route
            element={
              <RedirectIfAuthenticated>
                <AuthLayout />
              </RedirectIfAuthenticated>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Authenticated Testing Application Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/new-test" element={<NewTest />} />
            <Route path="/test/:id" element={<TestExecution />} />
            <Route path="/results/:id" element={<Results />} />
            <Route path="/api-tests" element={<ApiTests />} />
            <Route path="/ui-tests" element={<UiTests />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/network" element={<Network />} />
            <Route path="/console" element={<Console />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

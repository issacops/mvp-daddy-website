import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Lazy load routes for better performance
const HomePage = lazy(() => import('./components/HomePage'));
const ProjectDashboard = lazy(() => import('./components/ProjectDashboard'));
const TeamProfile = lazy(() => import('./components/TeamProfile'));
const OnboardingFlow = lazy(() => import('./components/OnboardingFlow'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-void" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<ProjectDashboard />} />
          <Route path="/team/:operatorId" element={<TeamProfile />} />
          <Route path="/initiate" element={<OnboardingFlow />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
// @ts-check
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import KartavyaPolicyPage from "./pages/KartavyaPolicyPage";
import { ProductListingPage } from "./pages/ProductListingPage";
import AgentDashboardComponent from "./components/DashboardAllComponents/AgentDashboardComponent/AgentDashboardComponent";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./App.css"
import RouteDashboardComponents from "./components/DashboardAllComponents/RouteDashboardComponents/RouteDashboardComponents";
import { AllModulesImports } from "./components/DashboardAllComponents/AllModulesImports/AllModulesImports";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.toLowerCase().startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Header />}
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/policies/kartavya" replace />} />

        {/* Policy routes */}
        <Route path="/policies/kartavya" element={<KartavyaPolicyPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/agent-dashboard" element={<AgentDashboardComponent />} />

        {/* Dashboard routes - AllModulesImports handles routing based on URL path */}
        <Route path="/dashboard/*" element={<RouteDashboardComponents />}>
          <Route path="*" element={<AllModulesImports />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;

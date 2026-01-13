// @ts-check
import { Routes, Route, useLocation } from "react-router-dom";
import KartavyaPolicyPage from "./pages/KartavyaPolicyPage";
import { ProductListingPage } from "./pages/ProductListingPage";
import AgentDashboardComponent from "./components/AgentDashboardComponent/AgentDashboardComponent";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./App.css"

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.toLowerCase().startsWith("/agent-dashboard");

  return (
    <>
      {!isDashboardRoute && <Header />}
      <Routes>
        {/* Default route */}
        {/* <Route path="/" element={<Navigate to="/policies/kartavya" replace />} /> */}

        {/* Policy routes */}
        <Route path="/policies/kartavya" element={<KartavyaPolicyPage />} />
        <Route path="/policies/kartavya/:policyName" element={<KartavyaPolicyPage />} />
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/agent-dashboard" element={<AgentDashboardComponent />} />

        {/* Dashboard routes - AllModulesImports handles routing based on URL path */}

        {/* Fallback */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;

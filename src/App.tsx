import { Routes, Route, useLocation } from "react-router-dom";
import KartavyaPolicyPage from "./pages/KartavyaPolicyPage";
import { ProductListingPage } from "./pages/ProductListingPage";
import AgentDashboardComponent from "./components/AgentDashboardComponent/AgentDashboardComponent";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import "./App.css";

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isDashboardRoute = path === "/agent-dashboard" || path.startsWith("/agent-dashboard/");

  return (
    <>
      {!isDashboardRoute && <Header />}

      <Routes>
        <Route path="/policies/buy/:policyId" element={<KartavyaPolicyPage />} />
        <Route path="/buy/:policyId" element={<KartavyaPolicyPage />} />
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/agent-dashboard/*" element={<AgentDashboardComponent />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

      {!isDashboardRoute && <Footer />}
    </>
  );
}

export default App;

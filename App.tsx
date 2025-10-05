
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useSettingsStore } from './store/settingsStore';
import { FeatureFlagProvider } from './providers/FeatureFlagProvider';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import AffiliatePortalLayout from './layouts/AffiliatePortalLayout';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProductsPage from './pages/public/ProductsPage';
import PricingPage from './pages/public/PricingPage';
import BlogPage from './pages/public/BlogPage';
import AboutPage from './pages/public/AboutPage';
import CaseStudiesPage from './pages/public/CaseStudiesPage';
import AffiliateProgramPage from './pages/public/AffiliateProgramPage';
import HelpCenterPage from './pages/public/HelpCenterPage';
import TermsPage from './pages/public/TermsPage';
import PrivacyPage from './pages/public/PrivacyPage';
import ContactPage from './pages/public/ContactPage';
import EliasWhatsappPage from './pages/public/products/EliasWhatsappPage';
import EliasCallsPage from './pages/public/products/EliasCallsPage';
import DashboardPremiumPage from './pages/public/products/DashboardPremiumPage';
import AvatarPartnerPage from './pages/public/products/AvatarPartnerPage';
import JurisPredictAIPage from './pages/public/products/JurisPredictAIPage';
import AIRevolutionPage from './pages/public/blog/AIRevolutionPage';


// App Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ModulesPage from './pages/ModulesPage';
import MySubscriptionPage from './pages/subscription/MySubscriptionPage';
import SubscriptionChangePlanPage from './pages/subscription/SubscriptionChangePlanPage';
import BillingSuccessPage from './pages/BillingSuccessPage';
import SettingsPage from './pages/SettingsPage';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ComingSoonPage from './pages/ComingSoonPage';
import WaitlistConfirmationPage from './pages/waitlist/WaitlistConfirmationPage';
import EliasWhatsappManagementPage from './pages/whatsapp/EliasWhatsappManagementPage';
import EliasCallsManagementPage from './pages/calls/EliasCallsManagementPage';
import JurispredictManagementPage from './pages/jurispredict/JurispredictManagementPage';
import AvatarPartnerManagementPage from './pages/avatar/AvatarPartnerManagementPage';
import IntegrationsPage from './pages/IntegrationsPage';
import SupportPage from './pages/SupportPage';


// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ClientsManagementPage from './pages/admin/ClientsManagementPage';
import AfiliadosAdminPage from './pages/admin/AfiliadosAdminPage';
import FeatureFlagsPage from './pages/admin/FeatureFlagsPage';
import FinancialDashboardPage from './pages/admin/FinancialDashboardPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
// FIX: Corrected import path for GlobalSettingsPage.
import GlobalSettingsPage from './pages/admin/GlobalSettingsPage';
import CommunicationsPage from './pages/admin/CommunicationsPage';
import ReportsPage from './pages/admin/ReportsPage';


// Affiliate Portal Pages
import PortalDashboardPage from './pages/affiliates/portal/PortalDashboardPage';
import PortalUrlsPage from './pages/affiliates/portal/PortalUrlsPage';
import PortalReferralsPage from './pages/affiliates/portal/PortalReferralsPage';
import PortalPayoutsPage from './pages/affiliates/portal/PortalPayoutsPage';
import PortalCreativesPage from './pages/affiliates/portal/PortalCreativesPage';
import PortalProfilePage from './pages/affiliates/portal/PortalProfilePage';
import PortalResourcesPage from './pages/affiliates/portal/PortalResourcesPage';
import PortalWalletPage from './pages/affiliates/portal/PortalWalletPage';
import QuickStartGuidePage from './pages/affiliates/portal/resources/QuickStartGuidePage';
import MaximizingLinksPage from './pages/affiliates/portal/resources/MaximizingLinksPage';
import ContentStrategiesPage from './pages/affiliates/portal/resources/ContentStrategiesPage';
import TargetAudiencePage from './pages/affiliates/portal/resources/TargetAudiencePage';


// Hooks
import { useReferralTracking } from './hooks/useReferralTracking';

const App: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useReferralTracking();

  useEffect(() => {
    Promise.all([
      useAuthStore.persist.rehydrate(),
      useSettingsStore.persist.rehydrate(),
    ]).then(() => {
        setIsHydrated(true);
    });
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen theme-bg-secondary">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <FeatureFlagProvider>
      <HashRouter>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="precios" element={<PricingPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/ia-revolucion-juridica" element={<AIRevolutionPage />} />
            <Route path="sobre-nosotros" element={<AboutPage />} />
            <Route path="casos-exito" element={<CaseStudiesPage />} />
            <Route path="programa-afiliados" element={<AffiliateProgramPage />} />
            <Route path="centro-ayuda" element={<HelpCenterPage />} />
            <Route path="terminos" element={<TermsPage />} />
            <Route path="privacidad" element={<PrivacyPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="productos/elias-whatsapp" element={<EliasWhatsappPage />} />
            <Route path="productos/elias-llamadas" element={<EliasCallsPage />} />
            <Route path="productos/dashboard" element={<DashboardPremiumPage />} />
            <Route path="productos/avatar" element={<AvatarPartnerPage />} />
            <Route path="productos/jurispredict-ai" element={<JurisPredictAIPage />} />
          </Route>

          {/* --- AUTHENTICATION ROUTES --- */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          
          {/* --- STANDALONE PROTECTED ROUTES --- */}
          <Route path="/app/waitlist-confirmation" element={
            <ProtectedRoute allowedRoles={['owner', 'admin', 'user']}>
              <WaitlistConfirmationPage />
            </ProtectedRoute>
          } />

          {/* --- PROTECTED CLIENT ROUTES (/app) --- */}
          <Route path="/app" element={
            <ProtectedRoute allowedRoles={['owner', 'admin', 'user']} requireCompletedOnboarding={true}>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="whatsapp" element={<EliasWhatsappManagementPage />} />
            <Route path="calls" element={<EliasCallsManagementPage />} />
            <Route path="jurispredict" element={<JurispredictManagementPage />} />
            <Route path="avatar" element={<AvatarPartnerManagementPage />} />
            <Route path="integraciones" element={<IntegrationsPage />} />
            <Route path="soporte" element={<SupportPage />} />
            <Route path="subscription" element={
                <ProtectedRoute allowedRoles={['owner']}>
                    <MySubscriptionPage />
                </ProtectedRoute>
            }/>
            <Route path="subscription/change-plan" element={
                 <ProtectedRoute allowedRoles={['owner']}>
                    <SubscriptionChangePlanPage />
                 </ProtectedRoute>
            } />
            <Route path="billing/success" element={<BillingSuccessPage />} />
            <Route path="configuracion" element={
              <ProtectedRoute allowedRoles={['owner', 'admin', 'user']}>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Route>

          {/* --- PROTECTED AFFILIATE PORTAL ROUTES (/portal) --- */}
          <Route path="/portal" element={
            <ProtectedRoute allowedRoles={['affiliate']}>
              <AffiliatePortalLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/portal/dashboard" replace />} />
            <Route path="dashboard" element={<PortalDashboardPage />} />
            <Route path="urls" element={<PortalUrlsPage />} />
            <Route path="referrals" element={<PortalReferralsPage />} />
            <Route path="payouts" element={<PortalPayoutsPage />} />
            <Route path="creatives" element={<PortalCreativesPage />} />
            <Route path="profile" element={<PortalProfilePage />} />
            <Route path="wallet" element={<PortalWalletPage />} />
            <Route path="resources">
              <Route index element={<PortalResourcesPage />} />
              <Route path="quick-start-guide" element={<QuickStartGuidePage />} />
              <Route path="maximizing-links" element={<MaximizingLinksPage />} />
              <Route path="content-strategies" element={<ContentStrategiesPage />} />
              <Route path="target-audience" element={<TargetAudiencePage />} />
            </Route>
          </Route>
          
          {/* --- PROTECTED SUPER ADMIN ROUTES (/admin) --- */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="clients" element={<ClientsManagementPage />} />
            <Route path="affiliates" element={<AfiliadosAdminPage />} />
            <Route path="feature-flags" element={<FeatureFlagsPage />} />
            <Route path="financial" element={<FinancialDashboardPage />} />
            <Route path="logs" element={<AuditLogsPage />} />
            <Route path="settings" element={<GlobalSettingsPage />} />
            <Route path="communications" element={<CommunicationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
          
          {/* --- ONBOARDING & OTHER PROTECTED ROUTES --- */}
          <Route path="/onboarding" element={
             <ProtectedRoute allowedRoles={['owner', 'user']}>
                {/* OnboardingFlow component would go here */}
                <ComingSoonPage /> 
             </ProtectedRoute>
          } />


          {/* --- FALLBACK ROUTE --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </FeatureFlagProvider>
  );
};

export default App;

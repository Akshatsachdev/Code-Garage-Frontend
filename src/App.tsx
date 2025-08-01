import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import SideDrawer from './components/SideDrawer';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Upload = React.lazy(() => import('./pages/Upload'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const RewardsGames = React.lazy(() => import('./pages/RewardsGames'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const AppContent: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar onMenuClick={handleDrawerToggle} />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <SideDrawer
            open={true}
            onClose={() => {}}
            variant="permanent"
          />
        )}
        
        {/* Mobile Drawer */}
        {isMobile && (
          <SideDrawer
            open={mobileOpen}
            onClose={handleDrawerToggle}
            variant="temporary"
          />
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: { md: '280px' },
            minHeight: 'calc(100vh - 64px)',
            mt: '64px',
          }}
        >
          <React.Suspense
            fallback={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '200px',
                }}
              >
                Loading...
              </Box>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/rewards" element={<RewardsGames />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
          
          <Footer />
        </Box>
      </Box>
      
      {/* Global Chatbot */}
      <ChatBot />
    </Box>
  );
};

const App: React.FC = () => (
  <ThemeContextProvider>
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  </ThemeContextProvider>
);

export default App;

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  alpha,
  Chip,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';
import { Grid } from '../components/CustomGrid';
import {
  Person,
  Security,
  Notifications,
  Language,
  Palette,
  CloudSync,
  Download,
  Upload,
  Delete,
  Edit,
  Login,
  PersonAdd,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { userStats } from '../data/mockData';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import LogoutSection from '../components/LogoutSection';

const Settings: React.FC = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const { isAuthenticated, user } = useAuth();
  
  // UI state
  const [authTab, setAuthTab] = useState(0); // 0 = login, 1 = signup
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  // Handle auth success
  const handleAuthSuccess = () => {
    setSnackbar({
      open: true,
      message: authTab === 0 ? 'Welcome back! You have successfully signed in.' : 'Account created successfully! Welcome to Project Raseed.',
      severity: 'success',
    });
  };

  // Handle logout success
  const handleLogoutSuccess = () => {
    setSnackbar({
      open: true,
      message: 'You have been successfully signed out. See you next time!',
      severity: 'info',
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const settingSections = [
    {
      title: 'Profile',
      icon: <Person />,
      settings: [
        { label: 'Full Name', value: 'John Doe', type: 'text' },
        { label: 'Email', value: 'john.doe@example.com', type: 'email' },
        { label: 'Phone', value: '+1 (555) 123-4567', type: 'phone' },
        { label: 'Company', value: 'Acme Corp', type: 'text' },
      ],
    },
    {
      title: 'Appearance',
      icon: <Palette />,
      settings: [
        { label: 'Dark Mode', value: isDarkMode, type: 'switch', action: toggleTheme },
        { label: 'Language', value: 'English', type: 'select', options: ['English', 'Spanish', 'French', 'German'] },
        { label: 'Theme Color', value: 'Blue', type: 'select', options: ['Blue', 'Green', 'Purple', 'Orange'] },
      ],
    },
    {
      title: 'Notifications',
      icon: <Notifications />,
      settings: [
        { label: 'Email Notifications', value: true, type: 'switch' },
        { label: 'Push Notifications', value: false, type: 'switch' },
        { label: 'Receipt Processing Alerts', value: true, type: 'switch' },
        { label: 'Weekly Reports', value: true, type: 'switch' },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: <Security />,
      settings: [
        { label: 'Two-Factor Authentication', value: false, type: 'switch' },
        { label: 'Data Encryption', value: true, type: 'switch', disabled: true },
        { label: 'Anonymous Analytics', value: true, type: 'switch' },
        { label: 'Auto-logout after', value: '30 minutes', type: 'select', options: ['15 minutes', '30 minutes', '1 hour', '2 hours'] },
      ],
    },
    {
      title: 'Data Management',
      icon: <CloudSync />,
      settings: [
        { label: 'Auto-backup', value: true, type: 'switch' },
        { label: 'Sync across devices', value: true, type: 'switch' },
        { label: 'Data retention', value: '2 years', type: 'select', options: ['1 year', '2 years', '5 years', 'Forever'] },
      ],
    },
  ];

  const dataActions = [
    { label: 'Export All Data', icon: <Download />, color: 'primary' },
    { label: 'Import Data', icon: <Upload />, color: 'secondary' },
    { label: 'Delete Account', icon: <Delete />, color: 'error' },
  ];

  const renderSettingControl = (setting: any) => {
    switch (setting.type) {
      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={setting.value}
                onChange={setting.action}
                disabled={setting.disabled}
              />
            }
            label=""
            sx={{ m: 0 }}
          />
        );
      case 'select':
        return (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={setting.value} disabled={setting.disabled}>
              {setting.options?.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return (
          <Typography variant="body2" color="text.secondary">
            {setting.value}
          </Typography>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Settings
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {isAuthenticated 
              ? 'Customize your Project Raseed experience'
              : 'Sign in or create an account to access your settings'
            }
          </Typography>
        </Box>
      </motion.div>

      {/* Authentication Required */}
      {!isAuthenticated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
            {/* Auth Tabs */}
            <Box sx={{ mb: 4 }}>
              <Tabs
                value={authTab}
                onChange={(_, newValue) => setAuthTab(newValue)}
                centered
                sx={{
                  '& .MuiTabs-indicator': {
                    borderRadius: 2,
                    height: 3,
                  },
                }}
              >
                <Tab
                  label="Sign In"
                  icon={<Login />}
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 600, minHeight: 64 }}
                />
                <Tab
                  label="Create Account"
                  icon={<PersonAdd />}
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 600, minHeight: 64 }}
                />
              </Tabs>
            </Box>

            {/* Auth Forms */}
            <Box sx={{ mt: 2 }}>
              {authTab === 0 ? (
                <LoginForm
                  onSwitchToSignup={() => setAuthTab(1)}
                  onSuccess={handleAuthSuccess}
                />
              ) : (
                <SignupForm
                  onSwitchToLogin={() => setAuthTab(0)}
                  onSuccess={handleAuthSuccess}
                />
              )}
            </Box>
          </Card>
        </motion.div>
      ) : (
        /* Authenticated User Settings */
        <Grid container spacing={4}>
          {/* User Profile Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <LogoutSection onLogout={handleLogoutSuccess} />
            </motion.div>
          </Grid>

          {/* Settings Sections */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Theme Settings (always visible) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          mr: 2,
                        }}
                      >
                        <Palette />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Appearance
                      </Typography>
                    </Box>

                    <List sx={{ p: 0 }}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemText
                          primary="Dark Mode"
                          primaryTypographyProps={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                          }}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={isDarkMode}
                              onChange={toggleTheme}
                            />
                          }
                          label=""
                          sx={{ m: 0 }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Other Settings (for authenticated users) */}
              {settingSections.slice(1).map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: (sectionIndex + 1) * 0.1 }}
                >
                  <Card>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            mr: 2,
                          }}
                        >
                          {section.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {section.title}
                        </Typography>
                      </Box>

                      <List sx={{ p: 0 }}>
                        {section.settings.map((setting, index) => (
                          <ListItem
                            key={setting.label}
                            sx={{
                              px: 0,
                              py: 1.5,
                              borderBottom: index < section.settings.length - 1
                                ? `1px solid ${theme.palette.divider}`
                                : 'none',
                            }}
                          >
                            <ListItemText
                              primary={setting.label}
                              primaryTypographyProps={{
                                fontWeight: 500,
                                fontSize: '0.875rem',
                              }}
                            />
                            <Box>{renderSettingControl(setting)}</Box>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Data Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Data Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {dataActions.map((action) => (
                        <Button
                          key={action.label}
                          variant="outlined"
                          startIcon={action.icon}
                          color={action.color as any}
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            justifyContent: 'flex-start',
                          }}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;
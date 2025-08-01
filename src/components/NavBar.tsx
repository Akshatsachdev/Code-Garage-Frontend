import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Notifications,
  DarkMode,
  LightMode,
  Receipt,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

interface NavBarProps {
  onMenuClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useCustomTheme();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/upload':
        return 'Upload Receipts';
      case '/dashboard':
        return 'Dashboard';
        case '/tasks':
          return 'Task Manager';
        case '/rewards':
          return 'Rewards & Games';
        case '/settings':
          return 'Settings';
      default:
        return 'Project Raseed';
    }
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ px: { xs: 1, sm: 3 } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
          <Receipt sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 500,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mr: 3,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Project Raseed
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 400,
              color: theme.palette.text.primary,
              display: { xs: 'block', md: 'none' },
            }}
          >
            {getPageTitle()}
          </Typography>
        </motion.div>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
          {[
            { label: 'Home', path: '/' },
            { label: 'Upload', path: '/upload' },
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Tasks', path: '/tasks' },
            { label: 'Rewards', path: '/rewards' },
          ].map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path
                    ? alpha(theme.palette.primary.main, 0.1)
                    : 'transparent',
                  color: location.pathname === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ mr: 1 }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{ mr: 1 }}
          >
            <Notifications />
          </IconButton>

          <IconButton
            edge="end"
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
          <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">New receipt processed</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Monthly report ready</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Budget alert: Food expenses</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
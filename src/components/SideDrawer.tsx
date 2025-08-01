import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Home,
  CloudUpload,
  Dashboard,
  Assignment,
  SportsEsports,
  Settings,
  Receipt,
  TrendingUp,
  Star,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userStats } from '../data/mockData';

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const drawerWidth = 280;

const menuItems = [
  { text: 'Home', icon: Home, path: '/' },
  { text: 'Upload Receipts', icon: CloudUpload, path: '/upload' },
  { text: 'Dashboard', icon: Dashboard, path: '/dashboard' },
  { text: 'Task Manager', icon: Assignment, path: '/tasks' },
  { text: 'Rewards & Games', icon: SportsEsports, path: '/rewards' },
  { text: 'Settings', icon: Settings, path: '/settings' },
];

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  variant = 'temporary',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Receipt sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Project Raseed
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          AI-Powered Receipt Manager
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 1, flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path
                    ? alpha(theme.palette.primary.main, 0.1)
                    : 'transparent',
                  color: location.pathname === item.path
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    minWidth: 40,
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* User Stats */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Star sx={{ color: theme.palette.secondary.main, mr: 1, fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Level {userStats.level}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {userStats.xpPoints} / {userStats.nextLevelXP} XP
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: `${(userStats.xpPoints / userStats.nextLevelXP) * 100}%`,
                height: '100%',
                backgroundColor: theme.palette.primary.main,
                borderRadius: 3,
                transition: 'width 0.3s ease',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              <TrendingUp sx={{ fontSize: 12, mr: 0.5 }} />
              {userStats.receiptsProcessed} receipts
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {userStats.timeSaved}h saved
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: variant === 'permanent'
            ? `2px 0 8px ${alpha(theme.palette.common.black, 0.1)}`
            : undefined,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default SideDrawer;
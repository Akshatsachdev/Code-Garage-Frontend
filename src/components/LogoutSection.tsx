import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Logout,
  Person,
  Security,
  AdminPanelSettings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { userStats } from '../data/mockData';

interface LogoutSectionProps {
  onLogout: () => void;
}

const LogoutSection: React.FC<LogoutSectionProps> = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
    onLogout();
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 500, mx: 'auto' }}>
        {/* User Profile Section */}
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                mr: 3,
                bgcolor: 'primary.main',
                fontSize: '1.5rem',
              }}
            >
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {user.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {user.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={user.isPremium ? 'Premium' : 'Free'}
                  color={user.isPremium ? 'primary' : 'default'}
                  size="small"
                  icon={user.isPremium ? <AdminPanelSettings /> : <Person />}
                />
                <Chip
                  label={`Level ${userStats.level}`}
                  color="secondary"
                  size="small"
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Account Stats */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Account Overview
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {userStats.receiptsProcessed}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Receipts Processed
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {userStats.timeSaved}h
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Time Saved
              </Typography>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Member since:</strong> {user.memberSince}
            </Typography>
          </Alert>

          {/* Security Notice */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              backgroundColor: 'success.light',
              color: 'success.contrastText',
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Security sx={{ mr: 2 }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Account Secured
              </Typography>
              <Typography variant="caption">
                Your data is encrypted and protected
              </Typography>
            </Box>
          </Box>

          {/* Logout Button */}
          <Button
            variant="outlined"
            color="error"
            fullWidth
            size="large"
            startIcon={<Logout />}
            onClick={() => setShowLogoutDialog(true)}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Sign Out
          </Button>
        </Box>

        {/* Logout Confirmation Dialog */}
        <Dialog
          open={showLogoutDialog}
          onClose={() => setShowLogoutDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <Logout sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Sign Out?
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Are you sure you want to sign out of your Project Raseed account?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              You'll need to sign in again to access your data.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
            <Button
              onClick={() => setShowLogoutDialog(false)}
              variant="outlined"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default LogoutSection;
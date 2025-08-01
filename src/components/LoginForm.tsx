import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onSuccess }) => {
  const { login, isLoading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');

  // Handle input changes
  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'rememberMe' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login(formData.email, formData.password, formData.rememberMe);
      
      if (result.success) {
        onSuccess();
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Sign in to your Project Raseed account
        </Typography>

        {/* Error Alert */}
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        {/* Email Field */}
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange('password')}
          error={!!errors.password}
          helperText={errors.password}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Remember Me Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleChange('rememberMe')}
              disabled={isLoading}
              color="primary"
            />
          }
          label="Remember me for 30 days"
          sx={{ mb: 3, userSelect: 'none' }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
          sx={{
            mb: 3,
            py: 1.5,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Switch to Signup */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={onSwitchToSignup}
              sx={{
                textDecoration: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="caption" component="div">
              <strong>Demo Credentials:</strong><br />
              Email: john.doe@example.com<br />
              Password: password123
            </Typography>
          </Alert>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default LoginForm;
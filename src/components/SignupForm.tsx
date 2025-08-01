import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Link,
  FormHelperText,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  PersonAdd,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth, SignupData } from '../contexts/AuthContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onSuccess }) => {
  const { signup, isLoading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState<SignupData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');

  // Handle input changes
  const handleChange = (field: keyof SignupData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
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

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get password strength
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: 'grey' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['error', 'error', 'warning', 'info', 'success'];
    
    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'grey',
    };
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await signup(formData);
      
      if (result.success) {
        onSuccess();
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  const passwordStrength = getPasswordStrength();

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
          Create Account
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Join Project Raseed and streamline your receipts
        </Typography>

        {/* Error Alert */}
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        {/* Full Name Field */}
        <TextField
          fullWidth
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange('fullName')}
          error={!!errors.fullName}
          helperText={errors.fullName}
          disabled={isLoading}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

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
          sx={{ mb: 1 }}
        />

        {/* Password Strength Indicator */}
        {formData.password && (
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                height: 4,
                backgroundColor: 'grey.300',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${passwordStrength.strength}%`,
                  backgroundColor: `${passwordStrength.color}.main`,
                  transition: 'all 0.3s ease',
                }}
              />
            </Box>
            <FormHelperText>
              Password strength: {passwordStrength.label}
            </FormHelperText>
          </Box>
        )}

        {/* Confirm Password Field */}
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : <PersonAdd />}
          sx={{
            mb: 3,
            py: 1.5,
            borderRadius: 2,
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Switch to Login */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={onSwitchToLogin}
              sx={{
                textDecoration: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SignupForm;
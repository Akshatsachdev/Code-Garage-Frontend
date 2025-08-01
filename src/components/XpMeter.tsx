import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import {
  Star,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface XpMeterProps {
  currentXP: number;
  level: number;
  nextLevelXP: number;
  className?: string;
}

const XpMeter: React.FC<XpMeterProps> = ({
  currentXP,
  level,
  nextLevelXP,
  className,
}) => {
  const theme = useTheme();
  const progress = (currentXP / nextLevelXP) * 100;
  const xpUntilNext = nextLevelXP - currentXP;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                mr: 2,
              }}
            >
              <Star sx={{ fontSize: 24 }} />
            </Box>
          </motion.div>
          
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Level {level}
              </Typography>
              <Chip
                size="small"
                label={`+${Math.floor(level * 1.2)}% XP Bonus`}
                sx={{
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  fontSize: '0.75rem',
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Keep going! You're doing great
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {currentXP.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total XP
            </Typography>
          </Box>
        </Box>

        {/* XP Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress to Level {level + 1}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {xpUntilNext.toLocaleString()} XP to go
            </Typography>
          </Box>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ transformOrigin: 'left' }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                },
              }}
            />
          </motion.div>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {currentXP.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {nextLevelXP.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Stats Row */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: 16 }} />
            <Typography variant="caption" color="text.secondary">
              +{Math.floor(level * 15)} XP this week
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmojiEvents sx={{ color: theme.palette.warning.main, mr: 0.5, fontSize: 16 }} />
            <Typography variant="caption" color="text.secondary">
              {Math.floor(level / 2)} achievements
            </Typography>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default XpMeter;
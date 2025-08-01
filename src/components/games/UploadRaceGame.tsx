import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CloudUpload, Check } from '@mui/icons-material';

interface UploadRaceGameProps {
  onComplete: (result: { xpEarned: number; uploadsCompleted: number }) => void;
}

const UploadRaceGame: React.FC<UploadRaceGameProps> = ({ onComplete }) => {
  const [uploads, setUploads] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute
  const theme = useTheme();

  const targetUploads = 10;

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      handleGameEnd();
    }
  }, [timeLeft, gameComplete]);

  useEffect(() => {
    if (uploads >= targetUploads && !gameComplete) {
      setGameComplete(true);
      setTimeout(() => {
        handleGameEnd();
      }, 2000);
    }
  }, [uploads, gameComplete]);

  const handleUpload = () => {
    if (isUploading || gameComplete) return;
    
    setIsUploading(true);
    
    // Simulate upload time
    const uploadTime = 500 + Math.random() * 1000; // 0.5-1.5 seconds
    
    setTimeout(() => {
      setUploads(prev => prev + 1);
      setIsUploading(false);
    }, uploadTime);
  };

  const handleGameEnd = () => {
    const xpEarned = uploads * 20 + (uploads >= targetUploads ? 100 : 0); // Bonus for completing
    onComplete({ xpEarned, uploadsCompleted: uploads });
  };

  const progress = (uploads / targetUploads) * 100;

  return (
    <Box sx={{ textAlign: 'center', p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Upload Race Challenge
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Upload {targetUploads} receipts as fast as possible!
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Chip 
          label={`Time: ${timeLeft}s`}
          color={timeLeft <= 10 ? 'error' : 'primary'}
        />
        <Chip 
          label={`${uploads}/${targetUploads} uploads`}
          color={uploads >= targetUploads ? 'success' : 'default'}
        />
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress}
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
              },
            }}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {uploads}/{targetUploads} receipts uploaded
          </Typography>
        </Box>

        {!gameComplete && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={isUploading ? <CloudUpload className="animate-pulse" /> : <CloudUpload />}
              onClick={handleUpload}
              disabled={isUploading || gameComplete}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 2,
                background: isUploading 
                  ? alpha(theme.palette.primary.main, 0.7)
                  : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                fontSize: '1.1rem',
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
              }}
            >
              {isUploading ? 'Uploading...' : 'Upload Receipt'}
            </Button>
          </motion.div>
        )}

        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ color: theme.palette.success.main }}>
              <Check sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h4" sx={{ mb: 1 }}>
                🎉 Race Complete!
              </Typography>
              <Typography variant="body1">
                You uploaded {uploads} receipts!
              </Typography>
            </Box>
          </motion.div>
        )}
      </Paper>

      {/* Visual upload history */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
        {Array.from({ length: targetUploads }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: index < uploads ? 1 : 0.7, 
              opacity: index < uploads ? 1 : 0.3 
            }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                border: `2px solid ${
                  index < uploads ? theme.palette.success.main : alpha(theme.palette.primary.main, 0.3)
                }`,
                backgroundColor: index < uploads 
                  ? theme.palette.success.main 
                  : alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: index < uploads ? 'white' : alpha(theme.palette.primary.main, 0.7),
              }}
            >
              {index < uploads ? <Check sx={{ fontSize: 20 }} /> : index + 1}
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default UploadRaceGame;
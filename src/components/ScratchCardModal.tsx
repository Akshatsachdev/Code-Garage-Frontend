import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ScratchCardModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (reward: any) => void;
  gameResult: any;
}

const rewards = [
  { type: 'xp_boost', value: '2x XP Multiplier', icon: '⚡', rarity: 'common' },
  { type: 'badge', value: 'Achievement Badge', icon: '🏆', rarity: 'rare' },
  { type: 'voucher', value: '10% Discount', icon: '🎫', rarity: 'epic' },
  { type: 'xp_bonus', value: '+50 Bonus XP', icon: '✨', rarity: 'common' },
  { type: 'premium_day', value: '1 Day Premium', icon: '👑', rarity: 'legendary' },
];

const ScratchCardModal: React.FC<ScratchCardModalProps> = ({
  open,
  onClose,
  onComplete,
  gameResult,
}) => {
  const [isScratched, setIsScratched] = useState(false);
  const [reward, setReward] = useState(rewards[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    if (open) {
      setIsScratched(false);
      // Randomly select a reward
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setReward(randomReward);
      
      // Setup scratch canvas
      setTimeout(() => {
        setupScratchCard();
      }, 100);
    }
  }, [open]);

  const setupScratchCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 200;

    // Draw scratch surface
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch pattern
    ctx.fillStyle = '#a0a0a0';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        10,
        2
      );
    }

    // Add text
    ctx.fillStyle = '#888';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal!', canvas.width / 2, canvas.height / 2);

    // Set up scratch functionality
    let isMouseDown = false;
    
    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Create scratch effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Check if enough is scratched
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      
      const scratchedPercent = (transparent / (pixels.length / 4)) * 100;
      
      if (scratchedPercent > 40 && !isScratched) {
        setIsScratched(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
        });
      }
    };

    canvas.addEventListener('mousedown', () => isMouseDown = true);
    canvas.addEventListener('mouseup', () => isMouseDown = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', () => isMouseDown = true);
    canvas.addEventListener('touchend', () => isMouseDown = false);
    canvas.addEventListener('touchmove', scratch);
  };

  const handleClaimReward = () => {
    onComplete(reward);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.warning.main, 0.1)})`,
          textAlign: 'center',
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.warning.main }}>
            🎁 Scratch Card Reward!
          </Typography>
          
          <Box
            sx={{
              position: 'relative',
              display: 'inline-block',
              borderRadius: 2,
              overflow: 'hidden',
              border: `3px solid ${theme.palette.warning.main}`,
              mb: 3,
            }}
          >
            {/* Reward content behind scratch surface */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 300,
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
                color: 'white',
              }}
            >
              <Typography variant="h2" sx={{ mb: 1 }}>
                {reward.icon}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {reward.value}
              </Typography>
            </Box>

            {/* Scratch canvas */}
            <canvas
              ref={canvasRef}
              style={{
                display: 'block',
                cursor: 'pointer',
                transition: 'opacity 0.5s ease',
                opacity: isScratched ? 0 : 1,
              }}
            />
          </Box>

          {isScratched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Typography variant="h5" sx={{ mb: 2, color: theme.palette.success.main }}>
                Congratulations! 🎉
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                You've won: <strong>{reward.value}</strong>
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleClaimReward}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                }}
              >
                Claim Reward
              </Button>
            </motion.div>
          )}

          {!isScratched && (
            <Typography variant="body2" color="text.secondary">
              Use your mouse or finger to scratch the card above!
            </Typography>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ScratchCardModal;
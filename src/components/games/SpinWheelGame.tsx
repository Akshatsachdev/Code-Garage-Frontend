import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';

interface SpinWheelGameProps {
  onComplete: (result: { xpEarned: number; reward: string }) => void;
}

const wheelSegments = [
  { label: '50 XP', value: 50, color: '#4CAF50' },
  { label: '100 XP', value: 100, color: '#2196F3' },
  { label: '25 XP', value: 25, color: '#FF9800' },
  { label: '200 XP', value: 200, color: '#9C27B0' },
  { label: '75 XP', value: 75, color: '#F44336' },
  { label: '150 XP', value: 150, color: '#00BCD4' },
  { label: '500 XP', value: 500, color: '#FFD700' },
  { label: '300 XP', value: 300, color: '#8BC34A' },
];

const SpinWheelGame: React.FC<SpinWheelGameProps> = ({ onComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<any>(null);
  const theme = useTheme();

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Random spin between 5-10 full rotations plus random position
    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    
    setRotation(finalRotation);

    // Calculate which segment we landed on
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const segmentAngle = 360 / wheelSegments.length;
      const segmentIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % wheelSegments.length;
      const selectedSegment = wheelSegments[segmentIndex];
      
      setResult(selectedSegment);
      setIsSpinning(false);
      
      // Complete the game after showing result
      setTimeout(() => {
        onComplete({
          xpEarned: selectedSegment.value,
          reward: selectedSegment.label,
        });
      }, 2000);
    }, 3000);
  };

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Spin the wheel to win XP rewards!
      </Typography>

      <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
        {/* Wheel */}
        <motion.div
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: `4px solid ${theme.palette.primary.main}`,
            position: 'relative',
            overflow: 'hidden',
          }}
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <svg width="300" height="300" style={{ position: 'absolute' }}>
            {wheelSegments.map((segment, index) => {
              const angle = (360 / wheelSegments.length) * index;
              const nextAngle = (360 / wheelSegments.length) * (index + 1);
              
              // Calculate path for segment
              const startAngleRad = (angle * Math.PI) / 180;
              const endAngleRad = (nextAngle * Math.PI) / 180;
              
              const x1 = 150 + 140 * Math.cos(startAngleRad);
              const y1 = 150 + 140 * Math.sin(startAngleRad);
              const x2 = 150 + 140 * Math.cos(endAngleRad);
              const y2 = 150 + 140 * Math.sin(endAngleRad);
              
              const largeArcFlag = (nextAngle - angle) > 180 ? 1 : 0;
              
              const pathData = [
                'M', 150, 150,
                'L', x1, y1,
                'A', 140, 140, 0, largeArcFlag, 1, x2, y2,
                'Z'
              ].join(' ');
              
              // Text position
              const textAngle = angle + (360 / wheelSegments.length) / 2;
              const textAngleRad = (textAngle * Math.PI) / 180;
              const textX = 150 + 100 * Math.cos(textAngleRad);
              const textY = 150 + 100 * Math.sin(textAngleRad);
              
              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Pointer */}
        <Box
          sx={{
            position: 'absolute',
            top: -5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: `30px solid ${theme.palette.error.main}`,
            zIndex: 10,
          }}
        />
      </Box>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.success.main }}>
            🎉 You won {result.label}!
          </Typography>
        </motion.div>
      )}

      {!result && (
        <Button
          variant="contained"
          size="large"
          onClick={spinWheel}
          disabled={isSpinning}
          sx={{
            borderRadius: 2,
            px: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }}
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
        </Button>
      )}
    </Box>
  );
};

export default SpinWheelGame;
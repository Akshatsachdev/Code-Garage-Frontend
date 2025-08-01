import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  PlayArrow,
  GridView,
  Speed,
  Psychology,
  LocalFireDepartment,
  Category,
  Shield,
  Star,
  AccessTime,
  EmojiEvents,
  InfoOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  category: string;
  isNew: boolean;
}

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
  index: number;
}

const iconMap = {
  grid_view: GridView,
  speed: Speed,
  psychology: Psychology,
  local_fire_department: LocalFireDepartment,
  category: Category,
  shield: Shield,
  casino: Star, // Using Star for casino/spin wheel
  quiz: Star, // Using Star for quiz
};

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
} as const;

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = useTheme();
  
  const IconComponent = iconMap[game.icon as keyof typeof iconMap] || Star;

  const handlePlay = () => {
    setIsPlaying(true);
    
    // Trigger confetti animation
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: [theme.palette.primary.main, theme.palette.secondary.main],
    });

    // Simulate game start delay
    setTimeout(() => {
      setIsPlaying(false);
      onPlay(game.id);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        elevation={0}
        sx={{
          height: '100%',
          position: 'relative',
          background: isHovered
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`
            : theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.primary.main, isHovered ? 0.3 : 0.1)}`,
          borderRadius: 3,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
        }}
      >
        {/* New Badge */}
        {game.isNew && (
          <Chip
            label="NEW"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              backgroundColor: theme.palette.error.main,
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}
          />
        )}

        {/* Background Decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          }}
        />

        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Icon and Title */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <motion.div
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white',
                  mr: 2,
                }}
              >
                <IconComponent sx={{ fontSize: 24 }} />
              </Box>
            </motion.div>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {game.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={game.difficulty}
                  size="small"
                  color={difficultyColors[game.difficulty]}
                  variant="outlined"
                  sx={{ fontSize: '0.7rem' }}
                />
                <Chip
                  label={`+${game.xpReward} XP`}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    fontSize: '0.7rem',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.5, flexGrow: 1 }}
          >
            {game.description}
          </Typography>

          {/* Game Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {game.estimatedTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmojiEvents sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {game.category}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
            <motion.div style={{ flexGrow: 1 }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={handlePlay}
                disabled={isPlaying}
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                {isPlaying ? 'Starting...' : 'Play'}
              </Button>
            </motion.div>
            
            <IconButton
              size="small"
              sx={{
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <InfoOutlined sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameCard;
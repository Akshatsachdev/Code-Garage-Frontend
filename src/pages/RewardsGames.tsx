import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Alert,
  Snackbar,
  useTheme,
  alpha,
  Chip,
  Paper,
} from '@mui/material';
import {
  SportsEsports,
  Star,
  TrendingUp,
  EmojiEvents,
  PlayArrow,
  Celebration,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Components
import XpMeter from '../components/XpMeter';
import GameCard from '../components/GameCard';
import Leaderboard from '../components/Leaderboard';
import CustomGrid from '../components/CustomGrid';
import GameModal from '../components/GameModal';

// Data
import rewardsData from '../data/rewards.json';

const RewardsGames: React.FC = () => {
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    xpGained?: number;
  }>({ open: false, message: '' });
  
  const [gameModal, setGameModal] = useState<{
    open: boolean;
    gameId: string;
    gameTitle: string;
  }>({ open: false, gameId: '', gameTitle: '' });
  
  const theme = useTheme();
  const { user, games, leaderboard } = rewardsData;

  const handleGamePlay = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    setGameModal({
      open: true,
      gameId,
      gameTitle: game.title,
    });
  };

  const handleGameComplete = (xpEarned: number, reward?: any) => {
    setGameModal({ open: false, gameId: '', gameTitle: '' });

    setNotification({
      open: true,
      message: `Congratulations! You earned ${xpEarned} XP! ${reward ? `+ ${reward.value}` : ''}`,
      xpGained: xpEarned,
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, '#FFD700'],
      });
    }, 500);
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.warning.main],
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent)` }} />
          <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)}, transparent)` }} />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 3, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, color: 'white', mr: 3 }}>
                  <SportsEsports sx={{ fontSize: 32 }} />
                </Box>
              </motion.div>
              
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Gamify Your Productivity
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  Turn everyday tasks into exciting challenges and earn XP
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip icon={<Star />} label="Level Up Your Skills" variant="outlined" sx={{ color: theme.palette.primary.main, borderColor: theme.palette.primary.main }} />
                  <Chip icon={<TrendingUp />} label="Track Progress" variant="outlined" sx={{ color: theme.palette.success.main, borderColor: theme.palette.success.main }} />
                  <Chip icon={<EmojiEvents />} label="Compete & Win" variant="outlined" sx={{ color: theme.palette.warning.main, borderColor: theme.palette.warning.main }} />
                </Box>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<Celebration />}
              onClick={triggerConfetti}
              sx={{ borderRadius: 2, px: 4, py: 1.5, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, '&:hover': { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})` } }}
            >
              Celebrate Achievement
            </Button>
          </Box>
        </Paper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <XpMeter
          currentXP={user.currentXP}
          level={user.level}
          nextLevelXP={user.nextLevelXP}
          className="mb-4"
        />
      </motion.div>

      <CustomGrid container spacing={4}>
        <CustomGrid item xs={12} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Mini-Games
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose your challenge and start earning XP
              </Typography>
            </Box>

            <CustomGrid container spacing={3} justifyContent="center">
              {games.map((game, index) => (
                <CustomGrid key={game.id} item xs={12} sm={6} md={4}>
                  <GameCard
                    game={game as any}
                    onPlay={handleGamePlay}
                    index={index}
                  />
                </CustomGrid>
              ))}
            </CustomGrid>
          </motion.div>
        </CustomGrid>

        <CustomGrid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Leaderboard entries={leaderboard} />
          </motion.div>
        </CustomGrid>
      </CustomGrid>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity="success"
          variant="filled"
          sx={{ backgroundColor: theme.palette.success.main, color: 'white', '& .MuiAlert-icon': { color: 'white' } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Star sx={{ mr: 1 }} />
            {notification.message}
            {notification.xpGained && (
              <Chip
                label={`+${notification.xpGained} XP`}
                size="small"
                sx={{ ml: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              />
            )}
          </Box>
        </Alert>
      </Snackbar>

      <GameModal
        open={gameModal.open}
        onClose={() => setGameModal({ open: false, gameId: '', gameTitle: '' })}
        gameId={gameModal.gameId}
        gameTitle={gameModal.gameTitle}
        onComplete={handleGameComplete}
      />
    </Container>
  );
};

export default RewardsGames;
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import SpinWheelGame from './games/SpinWheelGame';
import QuickTriviaGame from './games/QuickTriviaGame';
import TaskBingoGame from './games/TaskBingoGame';
import UploadRaceGame from './games/UploadRaceGame';
import ScratchCardModal from './ScratchCardModal';

interface GameModalProps {
  open: boolean;
  onClose: () => void;
  gameId: string;
  gameTitle: string;
  onComplete: (xpEarned: number, reward?: any) => void;
}

const GameModal: React.FC<GameModalProps> = ({
  open,
  onClose,
  gameId,
  gameTitle,
  onComplete,
}) => {
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed' | 'scratch'>('playing');
  const [gameResult, setGameResult] = useState<any>(null);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (open) {
      setGamePhase('playing');
      setGameResult(null);
      setShowScratchCard(false);
    }
  }, [open]);

  const handleGameComplete = (result: any) => {
    setGameResult(result);
    setGamePhase('completed');
    
    // Show scratch card after a brief delay
    setTimeout(() => {
      setShowScratchCard(true);
    }, 1000);
  };

  const handleScratchComplete = (reward: any) => {
    setShowScratchCard(false);
    onComplete(gameResult?.xpEarned || 0, reward);
    onClose();
  };

  const renderGame = () => {
    switch (gameId) {
      case 'spin_win':
        return <SpinWheelGame onComplete={handleGameComplete} />;
      case 'quick_trivia':
        return <QuickTriviaGame onComplete={handleGameComplete} />;
      case 'task_bingo':
        return <TaskBingoGame onComplete={handleGameComplete} />;
      case 'upload_race':
        return <UploadRaceGame onComplete={handleGameComplete} />;
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Game not implemented yet!</Typography>
          </Box>
        );
    }
  };

  return (
    <>
      <Dialog
        open={open && !showScratchCard}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.primary.main, 0.05)})`,
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {gameTitle}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={gamePhase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {gamePhase === 'playing' && renderGame()}
              {gamePhase === 'completed' && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <Typography variant="h4" sx={{ mb: 2, color: theme.palette.success.main }}>
                      🎉 Great Job!
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      You earned {gameResult?.xpEarned || 0} XP!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get ready for your reward...
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <CircularProgress color="primary" />
                    </Box>
                  </motion.div>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <ScratchCardModal
        open={showScratchCard}
        onClose={() => setShowScratchCard(false)}
        onComplete={handleScratchComplete}
        gameResult={gameResult}
      />
    </>
  );
};

export default GameModal;
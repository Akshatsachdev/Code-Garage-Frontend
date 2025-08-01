import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import CustomGrid from '../CustomGrid';
import { motion } from 'framer-motion';
import { Check } from '@mui/icons-material';

interface TaskBingoGameProps {
  onComplete: (result: { xpEarned: number; completedTasks: number }) => void;
}

const bingoTasks = [
  "Upload 3 receipts",
  "Categorize 5 expenses", 
  "Set a budget goal",
  "Review last week's spending",
  "Add task deadline",
  "Complete daily check-in",
  "Organize receipt categories",
  "Calculate savings rate",
  "Update profile info"
];

const TaskBingoGame: React.FC<TaskBingoGameProps> = ({ onComplete }) => {
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(new Array(9).fill(false));
  const [gameComplete, setGameComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const theme = useTheme();

  useEffect(() => {
    if (timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameComplete) {
      handleGameEnd();
    }
  }, [timeLeft, gameComplete]);

  useEffect(() => {
    const completedCount = completedTasks.filter(Boolean).length;
    if (completedCount >= 5 && !gameComplete) { // Need 5 to win
      setGameComplete(true);
      setTimeout(() => {
        handleGameEnd();
      }, 2000);
    }
  }, [completedTasks, gameComplete]);

  const handleTaskToggle = (index: number) => {
    if (gameComplete) return;
    
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const handleGameEnd = () => {
    const completedCount = completedTasks.filter(Boolean).length;
    const xpEarned = completedCount * 20 + (completedCount >= 5 ? 100 : 0); // Bonus for winning
    onComplete({ xpEarned, completedTasks: completedCount });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedCount = completedTasks.filter(Boolean).length;

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Task Bingo Challenge
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Chip 
          label={`Time: ${formatTime(timeLeft)}`}
          color={timeLeft <= 30 ? 'error' : 'primary'}
        />
        <Chip 
          label={`Completed: ${completedCount}/9`}
          color="success"
        />
        <Chip 
          label={`Need 5 to win!`}
          variant="outlined"
        />
      </Box>

      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
        <CustomGrid container spacing={1}>
          {bingoTasks.map((task, index) => (
            <CustomGrid item xs={4} key={index}>
              <motion.div
                whileHover={{ scale: gameComplete ? 1 : 1.05 }}
                whileTap={{ scale: gameComplete ? 1 : 0.95 }}
              >
                <Paper
                  elevation={completedTasks[index] ? 4 : 1}
                  onClick={() => handleTaskToggle(index)}
                  sx={{
                    p: 2,
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: gameComplete ? 'default' : 'pointer',
                    backgroundColor: completedTasks[index] 
                      ? theme.palette.success.main 
                      : theme.palette.background.paper,
                    color: completedTasks[index] ? 'white' : 'inherit',
                    border: `2px solid ${
                      completedTasks[index] 
                        ? theme.palette.success.main 
                        : alpha(theme.palette.primary.main, 0.2)
                    }`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: gameComplete 
                        ? (completedTasks[index] ? theme.palette.success.main : alpha(theme.palette.primary.main, 0.2))
                        : theme.palette.primary.main,
                      backgroundColor: gameComplete 
                        ? (completedTasks[index] ? theme.palette.success.main : theme.palette.background.paper)
                        : alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  {completedTasks[index] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                    >
                      <Check sx={{ fontSize: 24, mb: 1 }} />
                    </motion.div>
                  )}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      textAlign: 'center',
                      lineHeight: 1.2,
                      fontSize: '0.7rem',
                    }}
                  >
                    {task}
                  </Typography>
                </Paper>
              </motion.div>
            </CustomGrid>
          ))}
        </CustomGrid>
      </Box>

      {gameComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ mb: 2, color: theme.palette.success.main }}>
            🎉 Bingo! Well done!
          </Typography>
          <Typography variant="body1">
            You completed {completedCount} tasks in time!
          </Typography>
        </motion.div>
      )}

      {!gameComplete && (
        <Typography variant="body2" color="text.secondary">
          Click on tasks to mark them as completed. Get 5 in a row, column, or diagonal to win!
        </Typography>
      )}
    </Box>
  );
};

export default TaskBingoGame;
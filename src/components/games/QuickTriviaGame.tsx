import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Paper,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickTriviaGameProps {
  onComplete: (result: { xpEarned: number; correctAnswers: number }) => void;
}

const triviaQuestions = [
  {
    question: "What is the most effective way to track your expenses?",
    options: ["Mental notes", "Regular receipt scanning", "Random guessing", "Not tracking at all"],
    correct: 1,
  },
  {
    question: "How often should you review your budget?",
    options: ["Never", "Once a year", "Monthly", "Every decade"],
    correct: 2,
  },
  {
    question: "What percentage of income should ideally go to savings?",
    options: ["0%", "5%", "20%", "50%"],
    correct: 2,
  },
  {
    question: "Which is the best practice for receipt management?",
    options: ["Throw them away immediately", "Store digitally with categories", "Keep in random piles", "Only keep expensive ones"],
    correct: 1,
  },
  {
    question: "What's a good emergency fund target?",
    options: ["1 day expenses", "1 week expenses", "3-6 months expenses", "10 years expenses"],
    correct: 2,
  },
];

const QuickTriviaGame: React.FC<QuickTriviaGameProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const theme = useTheme();

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, isAnswered]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === triviaQuestions[currentQuestion].correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      // Game complete
      const xpEarned = correctAnswers * 20 + (correctAnswers === triviaQuestions.length ? 50 : 0); // Bonus for perfect score
      onComplete({ xpEarned, correctAnswers });
    }
  };

  const question = triviaQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / triviaQuestions.length) * 100;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      {/* Progress */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentQuestion + 1} of {triviaQuestions.length}
          </Typography>
          <Chip 
            label={`${timeLeft}s`} 
            size="small" 
            color={timeLeft <= 5 ? 'error' : 'primary'}
          />
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.5 }}>
              {question.question}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {question.options.map((option, index) => {
                let buttonColor = 'inherit';
                let borderColor = alpha(theme.palette.primary.main, 0.3);
                
                if (isAnswered) {
                  if (index === question.correct) {
                    buttonColor = theme.palette.success.main;
                    borderColor = theme.palette.success.main;
                  } else if (index === selectedAnswer && index !== question.correct) {
                    buttonColor = theme.palette.error.main;
                    borderColor = theme.palette.error.main;
                  }
                }

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      sx={{
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        textAlign: 'left',
                        justifyContent: 'flex-start',
                        borderColor,
                        color: buttonColor,
                        backgroundColor: selectedAnswer === index ? alpha(buttonColor, 0.1) : 'transparent',
                        '&:hover': {
                          borderColor: isAnswered ? borderColor : theme.palette.primary.main,
                          backgroundColor: isAnswered 
                            ? alpha(buttonColor, 0.1) 
                            : alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: `2px solid ${borderColor}`,
                            backgroundColor: selectedAnswer === index ? buttonColor : 'transparent',
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: selectedAnswer === index ? 'white' : borderColor,
                            fontWeight: 600,
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </Box>
                        <Typography variant="body1">{option}</Typography>
                      </Box>
                    </Button>
                  </motion.div>
                );
              })}
            </Box>
          </Paper>
        </motion.div>
      </AnimatePresence>

      {/* Score */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Correct answers: {correctAnswers}/{triviaQuestions.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default QuickTriviaGame;
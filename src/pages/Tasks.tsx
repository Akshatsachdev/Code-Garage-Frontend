import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  Paper,
  InputBase,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import MicIcon from '@mui/icons-material/Mic';
import KanbanBoard from '../components/KanbanBoard';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

const Tasks: React.FC = () => {
  const theme = useTheme();
  const { transcript, startListening } = useSpeechRecognition();
  const [searchText, setSearchText] = useState('');

  // Set voice transcript to input field
  useEffect(() => {
    if (transcript) {
      setSearchText(transcript);
      console.log('Voice Command:', transcript);
    }
  }, [transcript]);

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Task Manager
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Manage your receipt processing tasks with gamified rewards
          </Typography>
        </Box>
      </motion.div>

      {/* Search Bar with Mic Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 500,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search tasks or speak..."
            inputProps={{ 'aria-label': 'search tasks' }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton sx={{ p: '10px' }} aria-label="mic" onClick={startListening}>
            <MicIcon />
          </IconButton>
        </Paper>
      </Box>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <KanbanBoard />
      </motion.div>
    </Container>
  );
};

export default Tasks;

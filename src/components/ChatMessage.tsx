import React from 'react';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { SmartToyRounded, PersonRounded } from '@mui/icons-material';
import robotIcon from '../assets/robot-icon.svg';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isBot ? 'row' : 'row-reverse',
        alignItems: 'flex-start',
        gap: 1,
        mb: 2,
        px: 2,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isBot ? 'primary.main' : 'secondary.main',
          fontSize: '1rem',
          border: `2px solid ${theme.palette.background.paper}`,
          boxShadow: theme.shadows[2],
        }}
      >
        {isBot ? (
          <img 
            src={robotIcon} 
            alt="AI Assistant" 
            style={{ width: '24px', height: '24px' }} 
          />
        ) : (
          <PersonRounded />
        )}
      </Avatar>
      
      <Box
        sx={{
          maxWidth: '75%',
          bgcolor: isBot 
            ? theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100'
            : 'primary.main',
          color: isBot 
            ? theme.palette.text.primary 
            : theme.palette.primary.contrastText,
          borderRadius: '18px',
          borderTopLeftRadius: isBot ? '6px' : '18px',
          borderTopRightRadius: isBot ? '18px' : '6px',
          px: 2.5,
          py: 1.5,
          boxShadow: theme.shadows[1],
          transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.short,
          }),
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
          {message}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            opacity: 0.7,
            fontSize: '0.7rem',
            mt: 0.5,
            display: 'block',
          }}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
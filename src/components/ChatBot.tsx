import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  IconButton,
  Fab,
  AppBar,
  Toolbar,
  Collapse,
  Grow,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Paper,
  Zoom,
} from '@mui/material';
import {
  SendRounded,
  CloseRounded,
  KeyboardArrowDownRounded,
} from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import { ChatMessageType, initialMessages, getRandomBotResponse, getBotResponseDelay } from '../data/chatData';
import robotIcon from '../assets/robot-icon.svg';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      message: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after delay
    // TODO: Replace with actual AI API call
    setTimeout(() => {
      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: getRandomBotResponse(),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, getBotResponseDelay());
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Enhanced Floating Robot Button */}
      <Zoom in={!isOpen} timeout={300}>
        <Fab
          onClick={handleToggleChat}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
            width: 64,
            height: 64,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: theme.shadows[12],
            border: `3px solid ${theme.palette.background.paper}`,
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: theme.shadows[16],
              '& .robot-icon': {
                transform: 'rotate(10deg) scale(1.1)',
              },
            },
            transition: theme.transitions.create(['transform', 'box-shadow'], {
              duration: theme.transitions.duration.short,
            }),
          }}
        >
          <Box
            className="robot-icon"
            sx={{
              transition: theme.transitions.create(['transform'], {
                duration: theme.transitions.duration.short,
              }),
            }}
          >
            <img 
              src={robotIcon} 
              alt="AI Assistant" 
              style={{ width: '32px', height: '32px' }} 
            />
          </Box>
        </Fab>
      </Zoom>

      {/* Enhanced Chat Window */}
      <Grow in={isOpen} timeout={400}>
        <Paper
          elevation={16}
          sx={{
            position: 'fixed',
            bottom: isMobile ? 0 : 24,
            right: isMobile ? 0 : 24,
            left: isMobile ? 0 : 'auto',
            width: isMobile ? '100vw' : { xs: 'calc(100vw - 48px)', sm: '450px', md: '500px' },
            height: isMobile ? '100vh' : { xs: 'calc(100vh - 150px)', sm: '600px', md: '650px' },
            maxHeight: isMobile ? '100vh' : '80vh',
            zIndex: 999,
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            borderRadius: isMobile ? 0 : 3,
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Enhanced Header */}
          <AppBar 
            position="static" 
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            <Toolbar sx={{ minHeight: '72px !important', px: 3 }}>
              <Avatar 
                sx={{ 
                  mr: 2, 
                  width: 40, 
                  height: 40,
                  bgcolor: 'transparent',
                  border: `2px solid ${theme.palette.primary.contrastText}`,
                }}
              >
                <img 
                  src={robotIcon} 
                  alt="AI Assistant" 
                  style={{ width: '28px', height: '28px' }} 
                />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                  Raseed AI Assistant
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                  {isTyping ? 'Thinking...' : 'Online • Ready to help'}
                </Typography>
              </Box>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleToggleChat}
                size="large"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <CloseRounded />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Messages Area */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
              py: 2,
              position: 'relative',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.action.disabled,
                borderRadius: '3px',
              },
            }}
          >
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            
            {/* Enhanced Typing Indicator */}
            <Collapse in={isTyping}>
              <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  <img 
                    src={robotIcon} 
                    alt="AI Assistant" 
                    style={{ width: '20px', height: '20px' }} 
                  />
                </Avatar>
                <Paper 
                  elevation={1}
                  sx={{ 
                    px: 2, 
                    py: 1.5, 
                    borderRadius: '18px',
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    {[0, 0.2, 0.4].map((delay, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: theme.palette.text.secondary,
                          animation: `bounce 1.4s infinite ease-in-out`,
                          animationDelay: `${delay}s`,
                          '@keyframes bounce': {
                            '0%, 60%, 100%': {
                              transform: 'translateY(0)',
                              opacity: 0.4,
                            },
                            '30%': {
                              transform: 'translateY(-8px)',
                              opacity: 1,
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Box>
            </Collapse>
            
            <div ref={messagesEndRef} />
          </Box>

          <Divider />

          {/* Enhanced Input Area */}
          <Box
            sx={{
              p: 3,
              bgcolor: theme.palette.background.paper,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-end',
                bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                borderRadius: '24px',
                p: 1,
              }}
            >
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Ask me anything about your receipts..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    px: 2,
                    py: 1,
                    fontSize: '0.95rem',
                    '& input::placeholder': {
                      color: theme.palette.text.secondary,
                      opacity: 0.7,
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                sx={{
                  bgcolor: inputValue.trim() ? 'primary.main' : 'action.disabled',
                  color: inputValue.trim() ? 'primary.contrastText' : 'action.disabled',
                  width: 44,
                  height: 44,
                  '&:hover': {
                    bgcolor: inputValue.trim() ? 'primary.dark' : 'action.disabled',
                    transform: inputValue.trim() ? 'scale(1.05)' : 'none',
                  },
                  '&:disabled': {
                    bgcolor: 'action.disabled',
                    color: 'action.disabled',
                  },
                  transition: theme.transitions.create(['transform', 'background-color'], {
                    duration: theme.transitions.duration.short,
                  }),
                }}
              >
                <SendRounded />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Grow>

      {/* Scroll to bottom button (when not at bottom) */}
      {isOpen && (
        <Zoom in={true} timeout={300}>
          <Fab
            size="small"
            onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
            sx={{
              position: 'fixed',
              bottom: isMobile ? 120 : 180,
              right: isMobile ? 20 : 40,
              zIndex: 1001,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 40,
              height: 40,
              boxShadow: theme.shadows[6],
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            <KeyboardArrowDownRounded />
          </Fab>
        </Zoom>
      )}
    </>
  );
};

export default ChatBot;
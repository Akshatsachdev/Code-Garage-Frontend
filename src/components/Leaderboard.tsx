import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  useTheme,
  alpha,
  Divider,
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  Star,
  WorkspacePremium,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatar: string;
  weeklyGain: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <EmojiEvents sx={{ color: '#FFD700', fontSize: 20 }} />;
    case 2:
      return <EmojiEvents sx={{ color: '#C0C0C0', fontSize: 20 }} />;
    case 3:
      return <EmojiEvents sx={{ color: '#CD7F32', fontSize: 20 }} />;
    default:
      return <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 20 }}>{rank}</Typography>;
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return '#FFD700';
    case 2:
      return '#C0C0C0';
    case 3:
      return '#CD7F32';
    default:
      return undefined;
  }
};

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, className }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
              color: 'white',
              mr: 2,
            }}
          >
            <WorkspacePremium sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Weekly Leaderboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Top performers this week
            </Typography>
          </Box>
        </Box>

        {/* Leaderboard Entries */}
        <Box>
          {entries.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: entry.isCurrentUser
                    ? alpha(theme.palette.primary.main, 0.05)
                    : 'transparent',
                  border: entry.isCurrentUser
                    ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    : '1px solid transparent',
                  mb: index < entries.length - 1 ? 1 : 0,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.03),
                  },
                }}
              >
                {/* Rank */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: getRankColor(entry.rank) ? alpha(getRankColor(entry.rank)!, 0.1) : 'transparent',
                    mr: 2,
                  }}
                >
                  {getRankIcon(entry.rank)}
                </Box>

                {/* Avatar */}
                <Avatar
                  src={entry.avatar}
                  alt={entry.name}
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 2,
                    border: entry.isCurrentUser
                      ? `2px solid ${theme.palette.primary.main}`
                      : '2px solid transparent',
                  }}
                />

                {/* User Info */}
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: entry.isCurrentUser ? 700 : 600,
                        color: entry.isCurrentUser ? theme.palette.primary.main : 'text.primary',
                      }}
                    >
                      {entry.name}
                    </Typography>
                    {entry.isCurrentUser && (
                      <Chip
                        label="You"
                        size="small"
                        sx={{
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          fontSize: '0.65rem',
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Level {entry.level}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {entry.xp.toLocaleString()} XP
                    </Typography>
                  </Box>
                </Box>

                {/* Weekly Gain */}
                <Box sx={{ textAlign: 'right' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TrendingUp sx={{ color: theme.palette.success.main, fontSize: 16, mr: 0.5 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.success.main,
                      }}
                    >
                      +{entry.weeklyGain}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    this week
                  </Typography>
                </Box>
              </Box>
              
              {index < entries.length - 1 && (
                <Divider sx={{ my: 1, mx: 2 }} />
              )}
            </motion.div>
          ))}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Compete with friends and climb the ranks!
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Leaderboard;
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GameSession {
  id: string;
  user_id: string;
  game_id: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  score: number;
  xp_earned: number;
  created_at: string;
  completed_at?: string;
  metadata: any;
}

interface GameResult {
  xpEarned: number;
  score: number;
  metadata?: any;
}

export const useGameSessions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGameSession = async (gameId: string): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          user_id: user.id,
          game_id: gameId,
          status: 'in_progress',
        })
        .select()
        .single();

      if (error) throw error;

      return data.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game session');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const completeGameSession = async (sessionId: string, result: GameResult): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error: sessionError } = await supabase
        .from('game_sessions')
        .update({
          status: 'completed',
          score: result.score,
          xp_earned: result.xpEarned,
          completed_at: new Date().toISOString(),
          metadata: result.metadata || {},
        })
        .eq('id', sessionId);

      if (sessionError) throw sessionError;

      // Update user rewards points
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: existingRewards } = await supabase
        .from('rewards')
        .select('points')
        .eq('user_id', user.id)
        .single();

      const currentPoints = existingRewards?.points || 0;
      const newPoints = currentPoints + result.xpEarned;

      if (existingRewards) {
        const { error: updateError } = await supabase
          .from('rewards')
          .update({ points: newPoints })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('rewards')
          .insert({
            user_id: user.id,
            points: newPoints,
            source: 'game',
            game_session_id: sessionId,
          });

        if (insertError) throw insertError;
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete game session');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserGameSessions = async (userId: string): Promise<GameSession[]> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []) as GameSession[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch game sessions');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    startGameSession,
    completeGameSession,
    getUserGameSessions,
  };
};

export default useGameSessions;
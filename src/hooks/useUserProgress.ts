import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserProgress {
  currentXP: number;
  level: number;
  nextLevelXP: number;
  totalRewards: number;
}

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    currentXP: 0,
    level: 1,
    nextLevelXP: 1000,
    totalRewards: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProgress = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Fetch user rewards (XP)
      const { data: rewardsData, error: rewardsError } = await supabase
        .from('rewards')
        .select('points')
        .eq('user_id', user.id)
        .single();

      if (rewardsError && rewardsError.code !== 'PGRST116') {
        throw rewardsError;
      }

      const currentXP = rewardsData?.points || 0;
      
      // Calculate level and next level XP using the database functions
      const { data: levelData, error: levelError } = await supabase
        .rpc('calculate_user_level', { user_xp: currentXP });

      if (levelError) throw levelError;

      const level = levelData || 1;

      const { data: nextLevelData, error: nextLevelError } = await supabase
        .rpc('get_next_level_xp', { current_level: level });

      if (nextLevelError) throw nextLevelError;

      const nextLevelXP = nextLevelData || 1000;

      // Count total rewards earned
      const { count: totalRewards, error: countError } = await supabase
        .from('user_rewards')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      if (countError) throw countError;

      setProgress({
        currentXP,
        level,
        nextLevelXP,
        totalRewards: totalRewards || 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user progress');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, []);

  const refreshProgress = () => {
    fetchUserProgress();
  };

  return {
    progress,
    loading,
    error,
    refreshProgress,
  };
};

export default useUserProgress;
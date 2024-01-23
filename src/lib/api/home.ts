import { GoalSettingInfo } from '@/types/global';

import { client } from '../axios';

export const postGoalSettingData = async (goalSettingInfo: GoalSettingInfo) => {
  try {
    const { data } = await client.post('/1/goals', goalSettingInfo);
    return data;
  } catch (e) {
    console.error(e);
  }
};

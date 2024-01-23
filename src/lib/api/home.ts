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

export const putGoalSettingData = async (goalSettingInfo: GoalSettingInfo) => {
  try {
    const { data } = await client.put('/goals/1', goalSettingInfo);
    return data;
  } catch (e) {
    console.error(e);
  }
};

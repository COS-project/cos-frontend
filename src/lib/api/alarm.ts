// 알림 정보 가져오기
import axios from 'axios';
import Cookies from 'js-cookie';

export const getAlarms = async () => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ALARM_URL}/api/v2/alarms`, {
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const getAlarmUnreadCount = async () => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ALARM_URL}/api/v2/alarms/unread`, {
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

export const postReadAlarmList = async (readAlarmList: number[]) => {
  try {
    // 액세스 토큰을 헤더에 담아 요청 보내기
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ALARM_URL}/api/v2/alarms/read`, readAlarmList, {
      headers: {
        'Access-Token': Cookies.get('accessToken'),
      },
    });
    console.log(response.data);
    // 성공적인 응답 처리
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error('에러 발생:', error);
  }
};

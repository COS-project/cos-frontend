export interface AlarmResponseType {
  responseCode: string;
  message: string;
  result: Alarm[];
}

export interface Alarm {
  id: number;
  receiver: AlarmReceiverType;
  originId: number;
  alarmType: AlarmType;
  alarmTime: string; //"2025-04-09T19:15:01.072Z",
  read: boolean;
}

export type AlarmType =
  | 'NEW_LIKE_ON_POST'
  | 'NEW_COMMENT_ON_POST'
  | 'NEW_LIKE_ON_COMMENT'
  | 'BEFORE_APPLICATION'
  | 'START_APPLICATION'
  | 'DEFAULT_DEADLINE';

export interface AlarmReceiverType {
  id: number;
  nickname: string;
  email: string;
  username: string;
  userProfileImage: {
    mainProfileImage: {
      id: number;
      imageUrl: string;
    };
    kakaoProfileImageUrl: string;
  };
  userRole: string;
  createdAt: string; //"2025-04-09T19:15:01.072Z"
}

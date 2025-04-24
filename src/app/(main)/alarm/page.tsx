'use client';

import { EventSourcePolyfill } from 'event-source-polyfill';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { SVGProps, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import AlarmItem from '@/components/alarm/AlarmItem';
import Header from '@/components/common/Header';
import NavBar from '@/components/common/NavBar';
import StopWatchActiveButton from '@/components/stopwatch/StopWatchActiveButton';
import { getAlarms, postReadAlarmList } from '@/lib/api/alarm';
import { certificateIdAtom } from '@/recoil/atom';
import { Alarm } from '@/types/alarm/type';
import { ResponseType } from '@/types/common/type';

export default function Alarm() {
  const router = useRouter();
  const certificateId = useRecoilValue(certificateIdAtom);
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [readAlarmList, setReadAlarmList] = useState<number[]>([]);

  useEffect(() => {
    const connect = () => {
      const accessToken = Cookies.get('accessToken');

      if (!accessToken) {
        console.error('Access token is missing.');
        return;
      }

      const eventSource = new EventSourcePolyfill(`${process.env.NEXT_PUBLIC_ALARM_URL}/v2/alarms/subscribe`, {
        headers: {
          'Access-Token': accessToken,
        },
      });

      eventSource.onopen = () => {
        console.log('Connection opened.');
        getAlarms().then((res: ResponseType<Alarm[]>) => {
          console.log('res', res.result);
          if (res && res.result) {
            setAlarms(res.result);
          }
        });
      };

      eventSource.onmessage = (event) => {
        console.log('새로운 알림 수신:', event.data);
        try {
          // 서버에서 보낸 데이터(event.data)를 파싱합니다.
          // 서버의 데이터 형식에 따라 JSON.parse가 필요 없을 수도 있습니다.
          const newAlarm = JSON.parse(event.data);

          // 새로운 알림을 기존 알림 목록의 맨 앞에 추가하여 상태를 업데이트합니다.
          setAlarms((prevAlarms) => [newAlarm, ...prevAlarms]);

          // 필요하다면 읽지 않은 알림 카운트 등 다른 상태도 업데이트합니다.
          // (이 부분은 필요에 따라 추가 구현)
        } catch (e) {
          console.error('알림 데이터 파싱 오류:', e);
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    };

    connect();
  }, []);

  useEffect(() => {
    if (alarms) {
      // 새로운 alarmId 중 readAlarmList에 없는 값만 필터링
      const newAlarmIds = alarms.map((alarm) => alarm.id).filter((alarmId) => !readAlarmList.includes(alarmId)); // 중복 체크

      // 새로운 alarmId가 있을 때만 상태 업데이트
      if (newAlarmIds.length > 0) {
        setReadAlarmList((prevList) => [...prevList, ...newAlarmIds]);
      }
    }
  }, [alarms, readAlarmList]); // alarms나 readAlarmList가 변경될 때 실행

  const onBack = () => {
    postReadAlarmList(readAlarmList);
    router.back();
  };

  return (
    <div className={'bg-gray0 min-h-screen'}>
      <Header headerType={'dynamic'} title={'알림'} rightElement={<EmptyIcon />} onBack={onBack} />
      <div className={'mt-[20px]'}>
        <div className={'flex flex-col gap-y-4 px-5'}>
          {alarms
            ? alarms.map((alarm, index) => {
                return (
                  <AlarmItem
                    setReadAlarmList={setReadAlarmList}
                    id={alarm.id}
                    key={alarm.id}
                    time={alarm.alarmTime}
                    type={alarm.alarmType}
                    targetPostId={alarm.originId}
                    receiver={alarm.receiver}
                  />
                );
              })
            : null}
        </div>
      </div>
      <StopWatchActiveButton />
      <NavBar />
      <div className={'h-[120px]'} />
    </div>
  );
}

const EmptyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <mask
      id="a"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h32v32H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#fff"
        d="m26.11 26.867-8.474-8.474a7 7 0 0 1-2.306 1.349 7.8 7.8 0 0 1-2.64.468q-3.19 0-5.402-2.206-2.211-2.207-2.211-5.384T7.283 7.23q2.207-2.21 5.383-2.21t5.397 2.207q2.22 2.208 2.22 5.385 0 1.378-.492 2.692a7.2 7.2 0 0 1-1.347 2.28l8.48 8.45zm-13.424-7.785q2.721 0 4.595-1.87 1.875-1.869 1.875-4.597 0-2.727-1.875-4.597t-4.595-1.87q-2.726 0-4.604 1.87-1.877 1.871-1.877 4.597 0 2.728 1.877 4.597t4.603 1.87"
      />
    </g>
  </svg>
);
const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);

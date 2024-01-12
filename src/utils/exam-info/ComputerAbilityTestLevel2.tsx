import * as React from 'react';

import { ExamInfoCommonCategory } from '@/types/global';
import { CommonTitle } from '@/utils/exam-info/CommonTitle';

export const COMPUTER_ABILITY_TEST_LEVEL_2: ExamInfoCommonCategory = {
  intro: {
    Icon: CommonTitle.intro.Icon,
    title: CommonTitle.intro.title,
    content: (
      <div>사무자동화의 필수 프로그램인 스프레드시트, 데이터베이스 활용능력을 평가하는 국가기술자격 시험입니다.</div>
    ),
  },
  schedule: {
    Icon: CommonTitle.schedule.Icon,
    title: CommonTitle.schedule.title,
    content: (
      <ul>
        <li>• 1차 접수기간 : 2023.10.8 ~ 2023.10.15</li>
        <li>• 시험 일정 : 2033.10.18</li>
      </ul>
    ),
  }, //TODO: 일정을 빼던, 백엔드에서 받던 해야 할 것 같다.
  subject: {
    Icon: CommonTitle.subject.Icon,
    title: CommonTitle.subject.title,
    content: (
      <ul>
        <li>• 컴퓨터일반, 스프레드시트, 데이터 베이스</li>
        <li>• 2급 필기 : 객관식 40문항</li>
        <li>• 2급 실기 : 컴퓨터 작업형</li>
      </ul>
    ),
  },
  fee: {
    Icon: CommonTitle.fee.Icon,
    title: CommonTitle.fee.title,
    content: (
      <ul>
        <li>• 필기 : 19,000원</li>
        <li>• 실기 : 22,500원</li>
      </ul>
    ),
  },
  method: {
    Icon: CommonTitle.method.Icon,
    title: CommonTitle.method.title,
    content: (
      <ul>
        <li>• 대면</li>
      </ul>
    ),
  },
  qualifications: {
    Icon: CommonTitle.qualifications.Icon,
    title: CommonTitle.qualifications.title,
    content: <div>응시자격에 제한은 없지만 실기 시험은 필기 합격 후 2년 이내 실기 시험 응시 가능</div>,
  },
  criteria: {
    Icon: CommonTitle.criteria.Icon,
    title: CommonTitle.criteria.title,
    content: (
      <ul>
        <li>• 필기 : 과목당 40점 이상, 전과목 평균 60점 이상</li>
        <li>• 실기 : 70점 이상</li>
      </ul>
    ),
  },
};

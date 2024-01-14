import * as React from 'react';

import { ExamInfoCommonCategory } from '@/types/global';
import { CommonTitle } from '@/utils/exam-info/CommonTitle';

export const INFORMATION_PROCESSING_ENGINEER_TEST: ExamInfoCommonCategory = {
  intro: {
    Icon: CommonTitle.intro.Icon,
    title: CommonTitle.intro.title,
    content: (
      <div>
        소프트웨어 개발 관련 자격증으로, 정보시스템의 생명주기 전반에 걸친 프로젝트 업무를 수행하는 직무로서 계획수립,
        분석, 설계, 구현, 시험, 운영, 유지보수 등의 업무를 수행할 수 있는 능력을 검증하는 시험이다.
      </div>
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
        <li>
          • 필기 : 1. 소프트웨어설계 2. 소프트웨어개발 3. 데이터베이스구축 4. 프로그래밍언어활용 5. 정보시스템구축관리
        </li>
        <li>• 실기 : 정보처리 실무</li>
      </ul>
    ),
  },
  fee: {
    Icon: CommonTitle.fee.Icon,
    title: CommonTitle.fee.title,
    content: (
      <ul>
        <li>• 필기 : 19400 원</li>
        <li>• 실기 : 22600 원</li>
      </ul>
    ),
  },
  method: {
    Icon: CommonTitle.method.Icon,
    title: CommonTitle.method.title,
    content: (
      <ul>
        <li>• 필기 : 객관식 4지 택일형, 과목당 20문항(과목당 30분)</li>
        <li>• 실기 : 필답형(2시간30분)</li>
      </ul>
    ),
  },
  qualifications: {
    Icon: CommonTitle.qualifications.Icon,
    title: CommonTitle.qualifications.title,
    content: <div>관련학과 : 모든 학과 응시가능</div>,
  },
  criteria: {
    Icon: CommonTitle.criteria.Icon,
    title: CommonTitle.criteria.title,
    content: (
      <ul>
        <li>• 필기 : 100점을 만점으로 하여 과목당 40점 이상, 전과목 평균 60점 이상</li>
        <li>• 실기 : 100점을 만점으로 하여 60점 이상</li>
      </ul>
    ),
  },
};

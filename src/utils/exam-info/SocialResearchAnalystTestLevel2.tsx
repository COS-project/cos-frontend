import * as React from 'react';

import { ExamInfoCommonCategory } from '@/types/global';
import { CommonTitle } from '@/utils/exam-info/CommonTitle';

export const SOCIAL_RESEARCH_ANALYST_TEST_LEVEL2: ExamInfoCommonCategory = {
  intro: {
    Icon: CommonTitle.intro.Icon,
    title: CommonTitle.intro.title,
    content: (
      <div>
        사회조사분석사란 국가 및 지방자치단체, 기업, 정당, 사회단체 등에서 요구하는 자료를 조사 및 분석하는 전문가이다.
        사회조사분석사는 의뢰인 니즈에 맞춘 ‘전문 통계자료’를 수집해야 하기 때문에, 통계 프로그램 활용 및, SPSS, 소비자
        행동론, 기획론, 마케팅 등에 대한 전문 지식이 요구되며, 사회조사분석사2급 자격증 취득을 통해 그 전문성을 인증
        받을 수 있다.
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
        <li>• 필기 : 1. 조사방법과 설계(30문제), 2. 조사관리와 자료처리(30문제), 3. 통계분석과 활용(40문제)</li>
        <li>• 실기 : 사회조사실무 (설문작성, 단순통계처리 및 분석)</li>
      </ul>
    ),
  },
  fee: {
    Icon: CommonTitle.fee.Icon,
    title: CommonTitle.fee.title,
    content: (
      <ul>
        <li>• 필기 : 19400 원</li>
        <li>• 실기 : 33900 원</li>
      </ul>
    ),
  },
  method: {
    Icon: CommonTitle.method.Icon,
    title: CommonTitle.method.title,
    content: (
      <ul>
        <li>• 필기 : 객관식 4지 택일형 100문제(150분)</li>
        <li>• 실기 : 복합형 [작업형 2시간 정도(40점)+ 필답형 2시간(60점)]</li>
      </ul>
    ),
  },
  qualifications: {
    Icon: CommonTitle.qualifications.Icon,
    title: CommonTitle.qualifications.title,
    content: <div>응시에 자격제한은 없음</div>,
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

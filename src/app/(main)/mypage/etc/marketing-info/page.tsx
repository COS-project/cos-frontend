'use client';

import Header from '@/components/common/Header';

const MarketingInformationPage = () => {
  return (
    <>
      <Header headerType={'dynamic'} title={'마케팅 정보 수신 동의'} />
      <div className={'h-[90px]'} />
      <section className={'px-5 text-h4 font-pre'}>
        <p className={'text-h3 font-pre font-semibold'}>[Cercat] 마케팅 목적 개인정보 이용 및 광고 수신 동의</p>
        Core 주식회사는 서비스 개선 및 유용한 정보를 제공하기 위해
        <br /> 아래와 같이 마케팅 목적의 정보 제공에 대한 동의를 받고자 합니다.
        <br />
        <br />
        <li className={'text-h3 font-pre font-semibold'}>수집 및 이용 항목</li>
        이름, 이메일, 휴대전화번호
        <br />
        <br />
        <li className={'text-h3 font-pre font-semibold'}>이용 목적</li>
        서비스 관련 이벤트, 프로모션, 신규 기능 안내 등 마케팅 정보 제공 이메일, SMS, 앱 푸시 등을 통한 정보 전달
        <br />
        <br />
        <br />
        전달 보유 및 이용 기간 동의 철회 시 또는 회원 탈퇴 시까지 동의 거부 권리 및 불이익 동의를 거부하더라도 서비스
        이용에는 제한이 없습니다.
      </section>
    </>
  );
};
export default MarketingInformationPage;

'use client';
import Header from '@/components/common/Header';

const PersonalInfoPage = () => {
  return (
    <>
      <Header headerType={'dynamic'} title={'개인 정보 수집 및 이용동의'} />
      <div className={'h-[50px]'} />
      <div className="px-6 py-8 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">개인정보처리방침</h1>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제1조 (개인정보의 수집 항목 및 수집 방법)</h2>
          <p>회사는 다음의 개인정보를 수집합니다.</p>
          <ul className="list-disc list-inside ml-4">
            <li>필수 항목: 이름, 이메일 주소, 비밀번호, 닉네임</li>
            <li>선택 항목: 생년월일, 프로필 사진, 자격증 관심 분야</li>
            <li>수집 방법: 회원가입 및 서비스 이용 시, 이벤트 참여, 고객센터 문의, 쿠키 등</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제2조 (개인정보의 수집 및 이용 목적)</h2>
          <ul className="list-disc list-inside ml-4">
            <li>회원가입 및 본인 확인, 이용자 식별 등 서비스 제공</li>
            <li>맞춤형 자격증 추천 및 학습 분석</li>
            <li>고객 문의 대응 및 서비스 개선</li>
            <li>이용 통계 및 분석</li>
            <li>이벤트 및 프로모션 정보 제공 (※ 별도 동의 시)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제3조 (개인정보의 보유 및 이용기간)</h2>
          <p>
            개인정보는 수집·이용 목적 달성 시 지체 없이 파기합니다. 단, 관련 법령에 따라 일정 기간 보관될 수 있습니다.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>계약/청약철회 기록: 5년</li>
            <li>소비자 불만/분쟁 기록: 3년</li>
            <li>서비스 이용기록: 3개월</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제4조 (개인정보 제3자 제공 및 처리 위탁)</h2>
          <p>
            회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 따라 예외가 적용될 수 있습니다. 또한
            서비스 운영을 위해 외부에 일부 처리를 위탁할 수 있습니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제5조 (이용자의 권리 및 행사 방법)</h2>
          <ul className="list-disc list-inside ml-4">
            <li>개인정보 열람, 정정, 삭제, 처리정지 요청</li>
            <li>마케팅 수신 동의 철회</li>
            <li>고객센터 또는 개인정보 보호책임자를 통해 요청 가능</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제6조 (개인정보 파기 절차 및 방법)</h2>
          <p>
            보유 기간 경과 또는 처리 목적 달성 시 즉시 파기하며, 전자파일은 복구 불가능한 방식으로, 문서는 분쇄 또는
            소각합니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제7조 (쿠키 등의 사용)</h2>
          <p>맞춤형 서비스 제공을 위해 쿠키를 사용하며, 이용자는 브라우저 설정을 통해 이를 거부할 수 있습니다.</p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제8조 (개인정보 보호책임자)</h2>
          <ul className="list-inside ml-4">
            <li>성명: 황유림</li>
            <li>직책: 개인정보 보호책임자</li>
            <li>이메일: hske3602@naver.com</li>
            <li>연락처: 010-7557-9217</li>
          </ul>
        </section>

        <p className="text-sm text-gray-500">
          ※ 본 방침은 법령 또는 내부 방침에 따라 변경될 수 있으며, 변경 시 사전 고지됩니다.
        </p>
      </div>
    </>
  );
};
export default PersonalInfoPage;

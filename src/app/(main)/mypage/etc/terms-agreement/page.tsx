'use client';
import Header from '@/components/common/Header';

const TermsAgreementPage = () => {
  return (
    <>
      <Header headerType={'dynamic'} title={'서비스 이용 약관  동의'} />
      <div className={'h-[50px]'} />
      <div className="px-6 py-8 text-gray-800">
        <h1 className="text-2xl font-bold mb-6">서비스 이용 약관</h1>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제1조 (목적)</h2>
          <p>
            이 약관은 Core 주식회사(이하 &quot;회사&quot;)가 제공하는 자격증 취득 지원 서비스 Cercat(이하
            &quot;서비스&quot;)의 이용조건 및 절차, 회사와 이용자 간의 권리, 의무, 책임사항 등을 규정함을 목적으로
            합니다. 목적으로 합니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제2조 (용어의 정의)</h2>
          <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
          <ul className="list-disc list-inside ml-4">
            <li>&quot;이용자&quot;: 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자</li>
            <li>&quot;회원&quot;: 회사에 개인정보를 제공하고 회원등록을 완료한 자</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제3조 (약관의 효력 및 변경)</h2>
          <p>
            본 약관은 서비스 초기화면에 게시함으로써 효력을 발생하며, 관련 법령을 위반하지 않는 범위에서 변경될 수
            있습니다. 변경 시 사전 공지합니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제4조 (서비스의 이용)</h2>
          <ul className="list-disc list-inside ml-4">
            <li>회사는 이용자에게 다양한 자격증 관련 정보, 학습 자료, 자동 추천 기능 등을 제공합니다.</li>
            <li>서비스 이용은 연중무휴 1일 24시간을 원칙으로 하나, 시스템 점검 등으로 일시 중단될 수 있습니다.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제5조 (이용자의 의무)</h2>
          <ul className="list-disc list-inside ml-4">
            <li>이용자는 관계 법령, 본 약관의 규정, 이용 안내 등 회사가 공지한 사항을 준수해야 합니다.</li>
            <li>타인의 정보 도용, 서비스 방해, 회사의 지식재산권 침해 행위를 해서는 안 됩니다.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제6조 (개인정보 보호)</h2>
          <p>
            회사는 개인정보보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하며, 구체적인 내용은 개인정보처리방침에
            따릅니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제7조 (서비스의 변경 및 종료)</h2>
          <p>
            회사는 서비스의 내용 일부 또는 전부를 사전 통지 후 변경하거나 종료할 수 있습니다. 단, 불가피한 사유가 있는
            경우 사후 통지할 수 있습니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제8조 (면책 조항)</h2>
          <p>
            회사는 천재지변, 이용자의 귀책사유 등 불가항력적 사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-2">제9조 (관할 법원)</h2>
          <p>서비스 이용과 관련하여 분쟁이 발생할 경우, 민사소송법상의 관할 법원을 관할 법원으로 합니다.</p>
        </section>

        <p className="text-sm text-gray-500">※ 본 약관은 2025년 4월 25일부터 적용됩니다.</p>
      </div>
    </>
  );
};
export default TermsAgreementPage;

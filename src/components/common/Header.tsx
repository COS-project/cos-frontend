import { useRouter } from 'next/navigation';
import React, { ReactNode, SVGProps, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { twMerge } from 'tailwind-merge';

import FilterModal from '@/components/common/FilterModal';
import { getAlarmUnreadCount } from '@/lib/api/alarm';
import useGetInterestCertificates from '@/lib/hooks/useGetInterestCertificates';
import { unreadAlarmCountAtom } from '@/recoil/alarm/atom';
import { certificateIdAtom, certificateNameAtom, isInitialCertificateIdSetAtom } from '@/recoil/atom';
import { ResponseType } from '@/types/common/type';
import { HeaderType } from '@/types/global';

interface Props {
  headerType?: HeaderType;
  title?: string;
  rightElement?: ReactNode;
  onBack?: () => void;
  CancelIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
}

export default function Header(props: Props) {
  const { headerType = 'static', title, rightElement, onBack, CancelIcon, className } = props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // 선택된 자격증
  const [selectedCertificationName, setSelectedCertificationName] = useRecoilState<string>(certificateNameAtom);
  // 선택된 자격증 Id
  const { interestCertificates } = useGetInterestCertificates();
  const setIsInitialCertificateIdSet = useSetRecoilState(isInitialCertificateIdSetAtom);

  const [selectedCertificationId, setSelectedCertificationId] = useRecoilState<number>(certificateIdAtom);
  const router = useRouter();

  const [initialTrigger, setInitialTrigger] = useState(true);
  const unreadCount = useRecoilValue(unreadAlarmCountAtom);
  // 변경: alarmAtom useRecoilState 삭제
  // const [alarms, setAlarms] = useRecoilState<Alarm[]>(alarmAtom);

  // 변경: 읽지 않은 개수 Atom의 setter를 가져옴 (초기 설정용)
  const setUnreadCount = useSetRecoilState(unreadAlarmCountAtom);

  // ✅ useEffect 수정: interestCertificates 로드 후 certificateId 및 초기화 상태 설정 (변경 없음)
  useEffect(() => {
    if (interestCertificates !== undefined && initialTrigger) {
      if (interestCertificates.length > 0) {
        setSelectedCertificationName(interestCertificates[0]?.certificate.certificateName);
        setSelectedCertificationId(interestCertificates[0]?.certificate.certificateId);
      } else {
        console.warn('User has no interest certificates.');
      }
      setIsInitialCertificateIdSet(true);
      setInitialTrigger(false);
    }
  }, [
    interestCertificates,
    initialTrigger,
    setSelectedCertificationName,
    setSelectedCertificationId,
    setIsInitialCertificateIdSet,
  ]);

  // ✅ 추가: Header 컴포넌트가 처음 마운트될 때만 읽지 않은 알림 개수를 한 번 가져와서 Recoil Atom에 설정 (변경 없음)
  useEffect(() => {
    const fetchInitialUnreadCount = async () => {
      const res: ResponseType<number> = await getAlarmUnreadCount();
      // Recoil Atom 업데이트
      if (res && res.result !== undefined) {
        setUnreadCount(res.result);
      }
    };
    fetchInitialUnreadCount();
  }, [setUnreadCount]);

  const renderHeader = (headerType: HeaderType) => {
    switch (headerType) {
      case 'static':
        return (
          <header className="fixed w-full top-0 bg-white flex justify-between items-center px-5 py-1 z-30 pt-10">
            <Logo />
            <div className={'relative flex items-center justify-center w-[40px] h-[40px]'}>
              {unreadCount > 0 && (
                <div className={'absolute top-1 right-1 text-[10px] text-white bg-primary rounded-full px-1'}>
                  {unreadCount}
                </div>
              )}
              <AlarmIcon onClick={() => router.push('/alarm')} />
            </div>
          </header>
        );
      case 'dynamic':
        return (
          <header
            className={twMerge(
              'fixed w-full top-0 bg-white flex justify-between items-center px-5 py-3 z-30 pt-10', // border 클래스도 여기서 제거함 (필요하다면 twMerge 되는 className prop으로 넘기세요)
              className,
            )}>
            {CancelIcon ? (
              <CancelIcon
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    router.back();
                  }
                }}
              />
            ) : (
              <PrevArrow
                onClick={() => {
                  if (onBack) {
                    onBack();
                  } else {
                    router.back();
                  }
                }}
              />
            )}
            {/* h1의 absolute 포지셔닝은 유지 */}
            <h1 className="absolute left-1/2 right1-1/2 transform -translate-x-1/2 text-black font-h1 flex-shrink-0">
              {title}
            </h1>
            {rightElement ? rightElement : <div className={'h-[32px] w-[32px]'} />}
          </header>
        );
      case 'second':
        return (
          <header className="fixed w-full top-[84px] bg-white flex justify-between items-center px-5 py-3 border-b-[1px] border-gray0 z-30">
            <div
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
              }}
              className={'flex gap-x-1 items-center font-semibold'}>
              {selectedCertificationName}
              {isFilterOpen ? <FilterOpenIcon /> : <FilterCloseIcon />}
            </div>
            <button
              onClick={() => {
                router.push('/home/exam-info');
              }}
              className={'flex items-center text-h6 border-[1px] border-gray2 py-1 px-3 rounded-full'}>
              응시정보 확인
              <ArrowIcon />
            </button>
          </header>
        );
      default:
        break;
    }
  };

  return (
    <>
      {' '}
      {/* React Fragment 사용 또는 부모 div 제거 */}
      {renderHeader(headerType)}
      {/* FilterModal의 absolute 위치 기준이 body가 될 수 있으므로 위치 조정 필요 */}
      {isFilterOpen ? (
        <FilterModal
          setIsOpen={setIsFilterOpen}
          // className을 Header의 높이를 고려하여 top 값을 조정해야 함
          className={'absolute left-5 w-[90%]'} // 예시: top-은 필요에 따라 추가
          data={interestCertificates}
          setDataState={setSelectedCertificationName}
          setIdState={setSelectedCertificationId}
        />
      ) : null}
    </>
  );
}

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={26} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.337 15.454c-.984 2.495-3.412 4.27-6.253 4.27-3.709 0-6.724-3.017-6.724-6.721s3.015-6.721 6.724-6.721c2.84 0 5.272 1.772 6.253 4.27h5.577C22.775 5.061 17.904.924 12.08.924 5.42.924 0 6.34 0 13c0 6.659 5.42 12.076 12.081 12.076 5.823 0 10.694-4.137 11.83-9.625h-5.577l.003.003z"
        fill="#2B2B2B"
      />
    </svg>
  );
}

const AlarmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={24} fill="none" {...props}>
    <path
      fill="#0D0E10"
      d="M0 20.648v-.939h2.239V8.715q0-2.58 1.847-4.525T8.73 1.81v-.67q0-.475.37-.808A1.3 1.3 0 0 1 9.995 0q.525 0 .9.332.372.333.373.808v.67q2.798.436 4.645 2.38t1.847 4.525V19.71H20v.939zM9.993 24q-.925 0-1.579-.59-.653-.592-.653-1.421h4.478q0 .837-.66 1.424-.66.588-1.586.587m-6.71-4.29h13.433V8.715q0-2.513-1.959-4.274-1.959-1.76-4.757-1.76-2.799 0-4.757 1.76-1.96 1.76-1.96 4.274z"
    />
  </svg>
);

const PrevArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={33} height={32} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m21.646 26-10-10 10-10" />
  </svg>
);

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={17} fill="none" {...props}>
    <path stroke="#0D0E10" strokeLinecap="round" strokeLinejoin="round" d="m5 11.5 6-6M5 5.5h6v6" />
  </svg>
);

const FilterCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={7} fill="none" {...props}>
    <path
      fill="#0D0E10"
      d="M4.293 5.793.707 2.207C.077 1.577.523.5 1.414.5h7.172c.89 0 1.337 1.077.707 1.707L5.707 5.793a1 1 0 0 1-1.414 0"
    />
  </svg>
);
const FilterOpenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={7} fill="none" {...props}>
    <path
      fill="#0D0E10"
      d="m5.707 1.207 3.586 3.586c.63.63.184 1.707-.707 1.707H1.414C.524 6.5.077 5.423.707 4.793l3.586-3.586a1 1 0 0 1 1.414 0"
    />
  </svg>
);

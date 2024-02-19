import { useRecoilState } from 'recoil';
import { UserAnswerRequests } from '@/types/global';
import { subjectResultRequestsList } from '@/recoil/exam/atom';
import useMockExamQuestions from '@/lib/hooks/useMockExamQuestions';

/**
 * 채점해주는 커스텀 훅
 */
const useCalculateScore = () => {
  const [userAnswerList, setUserAnswerList] = useRecoilState<UserAnswerRequests[]>(subjectResultRequestsList);
  const { questions, isLoading, isError } = useMockExamQuestions();

  const calculateScore = () => {
    if (isLoading || isError || !questions) {
      console.log('Questions are loading or an error occurred');
      return; // 데이터가 로드 중이거나 오류가 발생한 경우, 함수 실행 중단
    }

    const updatedUserAnswerList = userAnswerList.map((userAnswer, index) => {
      const isCorrect = questions ? questions[index].correctOption === userAnswer.selectOption : false;
      return { ...userAnswer, is_correct: isCorrect };
    });

    setUserAnswerList(updatedUserAnswerList);
    return updatedUserAnswerList; // 변경된 리스트 반환
  };

  return { calculateScore, userAnswerList }; // 채점 함수와 최신 userAnswerList 반환
};
export default useCalculateScore;

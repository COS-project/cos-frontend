import { Session, SpecificSubject, SubjectInfo } from '@/types/global';

const subjectData: SubjectInfo[] = [
  {
    year: 2022,
    sessions: [
      {
        sessionNumber: 1,
        isTaken: true,
        totalCorrect: 20,
        totalProblem: 50,
        totalTakenTime: '68',
        totalAllowedTime: '90',
        subjects: [
          { name: '컴퓨터 일반', correctAnswer: 9, totalProblems: 10, averageTime: 20, takenTime: 30 },
          { name: '스프레드 시트', correctAnswer: 8, totalProblems: 10, averageTime: 30, takenTime: 60 },
          { name: '데이터 베이스', correctAnswer: 8, totalProblems: 10, averageTime: 30, takenTime: 90 },
        ],
      },
      {
        sessionNumber: 2,
        isTaken: true,
        totalCorrect: 20,
        totalProblem: 50,
        totalTakenTime: '48',
        totalAllowedTime: '90',
        subjects: [
          { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 30 },
          { name: '스프레드 시트', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 60 },
          { name: '데이터 베이스', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 90 },
        ],
      },
      {
        sessionNumber: 3,
        isTaken: false,
        totalCorrect: 20,
        totalProblem: 50,
        totalTakenTime: '58',
        totalAllowedTime: '90',
        subjects: [
          { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 30 },
          { name: '스프레드 시트', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 60 },
          { name: '데이터 베이스', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 90 },
        ],
      },
    ],
  },
  {
    year: 2023,
    sessions: [
      {
        sessionNumber: 1,
        isTaken: true,
        totalCorrect: 10,
        totalProblem: 50,
        totalTakenTime: '48',
        totalAllowedTime: '90',
        subjects: [
          { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 30 },
          { name: '스프레드 시트', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 60 },
          { name: '데이터 베이스', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 90 },
        ],
      },
      {
        sessionNumber: 2,
        isTaken: true,
        totalCorrect: 10,
        totalProblem: 50,
        totalTakenTime: '48',
        totalAllowedTime: '90',
        subjects: [
          { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 30 },
          { name: '스프레드 시트', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 60 },
          { name: '데이터 베이스', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 90 },
        ],
      },
      {
        sessionNumber: 3,
        isTaken: false,
        totalCorrect: 10,
        totalProblem: 50,
        totalTakenTime: '48',
        totalAllowedTime: '90',
        subjects: [
          { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 30 },
          { name: '스프레드 시트', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 60 },
          { name: '데이터 베이스', correctAnswer: 3, totalProblems: 10, averageTime: 30, takenTime: 90 },
        ],
      },
    ],
  },

  // 다른 연도에 대한 데이터도 필요에 따라 추가
];

export default subjectData;

import { SubjectInfo } from '@/types/global';

const subjectData: SubjectInfo[] = [
  {
    year: 2022,
    sessions: [
      {
        sessionNumber: 1,
        isTaken: true,
        rounds: [
          {
            roundNumber: 1,
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
            roundNumber: 2,
            totalCorrect: 10,
            totalProblem: 50,
            totalTakenTime: '28',
            totalAllowedTime: '50',
            subjects: [
              { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 10 },
              { name: '스프레드 시트', correctAnswer: 4, totalProblems: 10, averageTime: 30, takenTime: 40 },
              { name: '데이터 베이스', correctAnswer: 4, totalProblems: 10, averageTime: 30, takenTime: 70 },
            ],
          },
          {
            roundNumber: 3,
            totalCorrect: 10,
            totalProblem: 50,
            totalTakenTime: '28',
            totalAllowedTime: '50',
            subjects: [
              { name: '컴퓨터 일반', correctAnswer: 5, totalProblems: 10, averageTime: 20, takenTime: 10 },
              { name: '스프레드 시트', correctAnswer: 4, totalProblems: 10, averageTime: 30, takenTime: 40 },
              { name: '데이터 베이스', correctAnswer: 4, totalProblems: 10, averageTime: 30, takenTime: 70 },
            ],
          },
        ],
      },
      {
        sessionNumber: 2,
        isTaken: true,
        rounds: [
          {
            roundNumber: 1,
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
            roundNumber: 2,
            totalCorrect: 10,
            totalProblem: 50,
            totalTakenTime: '68',
            totalAllowedTime: '90',
            subjects: [
              { name: '컴퓨터 일반', correctAnswer: 9, totalProblems: 10, averageTime: 20, takenTime: 30 },
              { name: '스프레드 시트', correctAnswer: 8, totalProblems: 10, averageTime: 30, takenTime: 60 },
              { name: '데이터 베이스', correctAnswer: 8, totalProblems: 10, averageTime: 30, takenTime: 90 },
            ],
          },
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
        rounds: [
          {
            roundNumber: 1,
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
            roundNumber: 2,
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
        ],
      },
      {
        sessionNumber: 2,
        isTaken: true,
        rounds: [
          {
            roundNumber: 1,
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
            roundNumber: 2,
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
        ],
      },
    ],
  },

  // 다른 연도에 대한 데이터도 필요에 따라 추가
];

export default subjectData;

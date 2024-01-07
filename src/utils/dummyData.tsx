import { Session, SpecificSubject, SubjectInfo } from '@/types/global';

const subjectData: SubjectInfo[] = [
  {
    year: 2022,
    sessions: [
      {
        sessionNumber: 1,
        totalCorrect: 10,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 5, totalProblems: 10 },
          { name: '과목2', correctAnswer: 3, totalProblems: 10 },
        ],
      },
      {
        sessionNumber: 2,
        totalCorrect: 20,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 8, totalProblems: 10 },
          { name: '과목2', correctAnswer: 6, totalProblems: 10 },
        ],
      },
      {
        sessionNumber: 3,
        totalCorrect: 30,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 10, totalProblems: 10 },
          { name: '과목2', correctAnswer: 9, totalProblems: 10 },
        ],
      },
    ],
  },
  {
    year: 2023,
    sessions: [
      {
        sessionNumber: 1,
        totalCorrect: 12,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 6, totalProblems: 10 },
          { name: '과목2', correctAnswer: 4, totalProblems: 10 },
        ],
      },
      {
        sessionNumber: 2,
        totalCorrect: 22,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 9, totalProblems: 10 },
          { name: '과목2', correctAnswer: 7, totalProblems: 10 },
        ],
      },
      {
        sessionNumber: 3,
        totalCorrect: 32,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 9, totalProblems: 10 },
          { name: '과목2', correctAnswer: 10, totalProblems: 10 },
        ],
      },
    ],
  },
  {
    year: 2024,
    sessions: [
      {
        sessionNumber: 1,
        totalCorrect: 15,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 7, totalProblems: 10 },
          { name: '과목2', correctAnswer: 5, totalProblems: 10 },
        ],
      },
      {
        sessionNumber: 2,
        totalCorrect: 25,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 10, totalProblems: 10 },
          { name: '과목2', correctAnswer: 8, totalProblems: 10 },
        ],
      },
      {
        sessionNumber: 3,
        totalCorrect: 35,
        totalProblem: 50,
        subjects: [
          { name: '과목1', correctAnswer: 13, totalProblems: 10 },
          { name: '과목2', correctAnswer: 12, totalProblems: 10 },
        ],
      },
    ],
  },
  // 다른 연도에 대한 데이터도 필요에 따라 추가
];

export default subjectData;

import { SubjectInfo } from '@/types/global';

const subjectData: SubjectInfo[] = [
  {
    year: 2022,
    sessions: [
      { sessionNumber: 1, totalcorrect: 10, totalproblem: 50 },
      { sessionNumber: 2, totalcorrect: 20, totalproblem: 50 },
      { sessionNumber: 3, totalcorrect: 30, totalproblem: 50 },
    ],
  },
  {
    year: 2023,
    sessions: [
      { sessionNumber: 1, totalcorrect: 15, totalproblem: 50 },
      { sessionNumber: 2, totalcorrect: 25, totalproblem: 50 },
      { sessionNumber: 3, totalcorrect: 35, totalproblem: 50 },
    ],
  },
  {
    year: 2024,
    sessions: [
      { sessionNumber: 1, totalcorrect: 18, totalproblem: 50 },
      { sessionNumber: 2, totalcorrect: 28, totalproblem: 50 },
      { sessionNumber: 3, totalcorrect: 38, totalproblem: 50 },
    ],
  },
  {
    year: 2025,
    sessions: [
      { sessionNumber: 1, totalcorrect: 12, totalproblem: 50 },
      { sessionNumber: 2, totalcorrect: 22, totalproblem: 50 },
      { sessionNumber: 3, totalcorrect: 32, totalproblem: 50 },
    ],
  },
];

export default subjectData;

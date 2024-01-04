import { SubjectInfo } from '@/types/global';

const SubjectData: SubjectInfo[] = [
  {
    year: 2022,
    session: 1,
    subsubject: ['Math', 'Physics', 'Chemistry'],
    subsubjectgrade: [80, 90, 85],
    totalcorrect: 255,
    totalproblem: 300,
  },
  {
    year: 2022,
    session: 2,
    subsubject: ['Math', 'Physics', 'Chemistry'],
    subsubjectgrade: [85, 88, 92],
    totalcorrect: 265,
    totalproblem: 300,
  },
  {
    year: 2023,
    session: 1,
    subsubject: ['Math', 'Physics', 'Chemistry'],
    subsubjectgrade: [78, 92, 87],
    totalcorrect: 257,
    totalproblem: 300,
  },
  {
    year: 2023,
    session: 2,
    subsubject: ['Math', 'Physics', 'Chemistry'],
    subsubjectgrade: [90, 85, 88],
    totalcorrect: 263,
    totalproblem: 300,
  },
  // Add more data as needed
];

export default SubjectData;

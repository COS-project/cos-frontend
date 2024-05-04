interface Certificate {
  certificateId: number;
  certificateName: string;
}

interface Subject {
  subjectId: number;
  subjectName: string;
  numberOfQuestions: number;
  totalScore: number;
}

interface SubjectResult {
  subject: Subject;
  score: number;
  numberOfCorrect: number;
  totalTakenTime: number;
  correctRate: number;
}

interface MockExam {
  MockExamId: number;
  examYear: number;
  round: number;
  timeLimit: number;
  certificate: Certificate;
}

interface MockExamResult {
  mockExamResultId: number;
  round: number;
  mockExam: MockExam;
  subjectResults: SubjectResult[];
  totalScore: number;
}

interface ApiResponse {
  responseCode: string;
  message: string;
  result: MockExamResult[];
}

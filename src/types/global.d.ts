export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

export interface SubjectInfo {
  year: number;
  sessions: Session[];
}

export interface Session {
  sessionNumber: number;
  totalcorrect: number;
  totalproblem: number;
}

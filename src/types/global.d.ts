export interface MenuList {
  id: number;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  name: string;
  path: string;
}

export interface SubjectInfo {
  year: number;
  session: number;
  subsubject: string[];
  subsubjectgrade: number[];
  totalcorrect: number;
  totalproblem: number;
}

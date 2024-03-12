export interface AxiosResponseUserGoalsType {
  responseCode: string;
  message: string;
  result: UserGoalsType[];
}
export interface UserGoalsType {
  goalId: number;
  prepareStartDateTime: string;
  prepareFinishDateTime: string;
}

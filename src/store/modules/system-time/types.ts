export interface SystemTimeState {
  systemTime: Date
  startTime: Date | null
  endTime: Date | null
  intervalTimer: number | null
}
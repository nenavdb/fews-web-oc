export class DateController {
  dates!: Date[]
  currentTime!: Date

  constructor (dates: Date[]) {
    this.dates = dates
  }

  selectDate(dateIn?: Date): void {
    if (this.dates === undefined || this.dates.length === 0) return
    const date = dateIn ?? new Date()
    // For an unspecified date, use the first available date.
    const index = this.dates.findIndex(cur => cur.getTime() + 10 * 60 * 1000 > date.getTime())
    if (index === -1) {
      if (this.dates[0].getTime() > date.getTime()) {
        this.currentTime = this.dates[0]
      } else {
        this.currentTime = this.dates[this.dates.length - 1]
      }
    } else {
      this.currentTime = this.dates[index]
    }
  }
}
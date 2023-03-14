import { Vue, Component } from 'vue-property-decorator'
import { Series, SeriesUrlRequest } from '@/lib/TimeSeries'
import { PiWebserviceProvider } from '@deltares/fews-pi-requests'
import type { TimeSeriesResponse } from '@deltares/fews-pi-requests'

function timeZoneOffsetString (offset: number): string {
  const offsetInMinutes = offset * 60
  const minutes = offsetInMinutes % 60
  const hours = Math.round(offsetInMinutes/60)
  return `+${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`
}

function parsePiDateTime(event: {date: string, time: string} , timeZone: string) {
  return `${event.date}T${event.time}${timeZone}`
}

@Component
export default class TimeSeriesStore extends Vue {
  timeSeriesStore: Record<string, Series> = {}
  webServiceProvider!: PiWebserviceProvider


  mounted () {
    const baseUrl = this.$config.get('VUE_APP_FEWS_WEBSERVICES_URL')
    this.webServiceProvider = new PiWebserviceProvider(baseUrl)
  }

  async updateTimeSeries(requests: any[]
  ): Promise<void> {
    for (const r in requests) {
      const request = requests[r]
      const baseUrl = this.$config.get('VUE_APP_FEWS_WEBSERVICES_URL')
      const url = new URL(`${baseUrl}/${request.request}`)
      const piSeries: TimeSeriesResponse = await this.webServiceProvider.getTimeSeriesWithRelativeUrl(request.request);
      if ( piSeries.timeSeries === undefined) continue
      for (const timeSeries of piSeries.timeSeries) {
        if (timeSeries.events === undefined) continue
        const resourceId = `${request.key}`
        const resource = new SeriesUrlRequest('fews-pi', url.toString())
        const series = new Series(resource)
        const header = timeSeries.header
        if (header !== undefined) {
          const missingValue: string = header.missVal
          const timeZone = piSeries.timeZone === undefined ? 'Z' : timeZoneOffsetString(+piSeries.timeZone)
          series.header.name = `${header.stationName} - ${header.parameterId} (${header.moduleInstanceId})`
          series.header.unit = header.units
          series.header.parameter = header.parameterId
          series.header.location = header.stationName
          series.header.source = header.moduleInstanceId
          series.start = new Date(parsePiDateTime(header.startDate, timeZone) )
          series.end = new Date(parsePiDateTime(header.endDate, timeZone) )
          series.data = timeSeries.events.map((event) => {
            return {
              x: new Date( parsePiDateTime(event, timeZone)),
              y: event.flag === '8' ? null : parseFloat(event.value)
            }
          })
        }
        Vue.set(this.timeSeriesStore, resourceId, series)
      }
    }
  }
}

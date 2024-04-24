import {
  PiWebserviceProvider,
  ProcessDataFilter,
  RunTaskFilter,
} from '@deltares/fews-pi-requests'
import { defineStore } from 'pinia'

import { downloadFileWithXhr } from '@/lib/download'
import { createTransformRequestFn } from '@/lib/requests/transformRequest'
import { configManager } from '@/services/application-config'

interface WorkflowsState {
  workflowId: string | null
  startTime: string | null
  endTime: string | null
  activeWorkflowIds: string[]
}

export enum WorkflowType {
  RunTask = 'RunTask',
  ProcessData = 'ProcessData',
}

const baseUrl = configManager.get('VITE_FEWS_WEBSERVICES_URL')
const webServiceProvider = new PiWebserviceProvider(baseUrl, {
  transformRequestFn: createTransformRequestFn(),
})

type OmitForWorkflow<T> = Omit<T, 'workflowId' | 'startTime' | 'endTime'>
export type PartialRunTaskFilter = OmitForWorkflow<RunTaskFilter>
export type PartialProcessDataFilter = OmitForWorkflow<ProcessDataFilter>

const useWorkflowsStore = defineStore('workflows', {
  state: (): WorkflowsState => ({
    workflowId: null,
    startTime: null,
    endTime: null,
    activeWorkflowIds: [],
  }),

  actions: {
    addActiveWorkflowId(id: string) {
      this.activeWorkflowIds.push(id)
    },
    removeActiveWorkflowId(id: string) {
      this.activeWorkflowIds = this.activeWorkflowIds.filter(
        (cur) => cur !== id,
      )
    },
    async startWorkflow(
      type: WorkflowType,
      filter: PartialRunTaskFilter | PartialProcessDataFilter,
      body?: string,
    ) {
      if (this.workflowId === null) {
        throw Error('Workflow ID has not been set.')
      }
      if (this.startTime === null || this.endTime === null) {
        throw Error('Start time or end time has not been set.')
      }

      this.addActiveWorkflowId(this.workflowId)

      // Add workflowId, startTime, and endTime from the store to the incomplete
      // filter.
      const completeFilter: RunTaskFilter | ProcessDataFilter = {
        ...filter,
        workflowId: this.workflowId,
        startTime: this.startTime,
        endTime: this.endTime,
      }
      try {
        if (type === WorkflowType.RunTask) {
          await webServiceProvider.postRunTask(
            completeFilter as RunTaskFilter,
            body ?? '',
          )
        } else if (type === WorkflowType.ProcessData) {
          const url = webServiceProvider.processDataUrl(
            completeFilter as ProcessDataFilter,
          )
          await downloadFileWithXhr(url.toString())
        }
      } finally {
        this.removeActiveWorkflowId(this.workflowId)
      }
    },
  },

  getters: {
    hasActiveWorkflows: (state) => {
      return state.activeWorkflowIds.length > 0
    },
    numberOfActiveWorkflows: (state) => {
      return state.activeWorkflowIds.length
    },
  },
})

export { useWorkflowsStore }

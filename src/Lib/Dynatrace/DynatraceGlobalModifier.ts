/**
 * Set the Dynatrace Real User Monitoring object (dtrum) on the Window object for global access via Window.dtrum
 */

import { CustomProperties, PropertyMap } from './Dynatrace.Types'

declare global {
  interface Window {
    dtrum: {
      identifyUser: (id: string) => void
      endSession: () => void
      enterAction: (infoLogMessage: string) => number
      leaveAction: (actionId: number) => void
      reportError: (errorLogMessage: Error | string) => void
      sendSessionProperties: (properties: CustomProperties) => void
      addActionProperties: (
        actionId: number,
        javaLong?: PropertyMap | null,
        date?: PropertyMap | null,
        shortString?: PropertyMap | null,
        javaDouble?: PropertyMap | null
      ) => void
    }
  }
}

export {}

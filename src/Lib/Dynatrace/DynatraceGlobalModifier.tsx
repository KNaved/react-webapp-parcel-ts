/**
 * Set the Dyntrace Real User Monitoring object (dtrum) on the Window object for global access via Window.dtrum.reportError(...).
 */
declare global {
  interface Window {
    dtrum: {
      identifyUser: (id: string) => void
      endSession: () => void
      actionName: (infoLogMessage: string) => void
      reportError: (errorLogMessage: Error | string) => void
      addActionProperties: (
        customPropertyId: string,
        shortString: string
      ) => void
    }
  }
}

export {}

/**
 * Wrapper around Dynatrace Real User Monitoring API to set session and log info/error on Dynatrace portal
 * Link: https://www.dynatrace.com/support/doc/javascriptapi/interfaces/dtrum_types.DtrumApi.html
 */
const DynatraceWrapper = {
  /**
   * INFO: Sets session on Dyntrace portal for analysing user's journey and errors
   * @param sessionId: This can be user id or application id using which we need to identify user session
   */
  setSession: (sessionId: string) => {
    window.dtrum && window.dtrum.identifyUser(sessionId)
  },

  /**
   *INFO: Ends the currently active session immediately.
   */
  endSession: () => {
    window.dtrum && window.dtrum.endSession()
  },

  /**
   * INFO: Logs info messages on Dyntrace portal. For example, logging start and stop of the function
   * @param logInfoMessage: Info message which needs to be logged
   */
  info: (logInfoMessage: string) => {
    window.dtrum && window.dtrum.actionName(logInfoMessage)
  },

  /**
   * INFO: Logs error and highlight it under error section of Dynatrace portal
   * @param errorDetails: This can be error object a string which needs to be logged on Dyntrace portal
   */
  error: (errorDetails: Error | string) => {
    window.dtrum && window.dtrum.reportError(errorDetails)
  },

  /**
   * INFO: Logs key value pair and can be used to query Dynatrace based on they key.
   * Example: By adding a JavaScript variable called VersionNo as a custom property in Dynatrace, we can include the version number in the custom property tag to enhance our queries.
   * Link: https://docs.dynatrace.com/docs/platform-modules/digital-experience/web-applications/additional-configuration/define-user-action-and-session-properties
   * @param shortString: This will have the value for the custom property defined in Dynatrace
   */
  logCustomProperty: (customPropertyId: string, shortString: string) => {
    window.dtrum &&
      window.dtrum.addActionProperties(customPropertyId, shortString)
  }
}

export default DynatraceWrapper

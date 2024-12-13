import { JS_DT_DATATYPE_MAP } from './Dynatrace.Constants'
import { PropertyMap, PropertyValueTypes } from './Dynatrace.Types'
import generateParams from './generateParams'

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
   * @param message: Info message which needs to be logged
   */
  log: (message: string) => {
    if (window.dtrum) {
      const actionId = window.dtrum.enterAction(message)
      window.dtrum.leaveAction(actionId)
    }
  },

  /**
   * INFO: Logs error and highlight it under error section of Dynatrace portal
   * @param errorDetails: This can be error object a string which needs to be logged on Dyntrace portal
   */
  error: (errorDetails: Error | string) => {
    window.dtrum && window.dtrum.reportError(errorDetails)
  },

  /**
   * This method posts session properties to dynatrace that remain constant throughout a user's session.
   * If the session property is updated multiple times during a user session, only the last updated value will be reflected in the DT portal. All previously set values within the current session will be overwritten by the most recent update.
   * Example: AppVersion, ProductName, IsETB, DOB, etc cab be session properties
   * @param key: session property key name created in dynatrace portal. This should be always small case. For example: appversion
   * @param val: value of the session property. For example: 50000, "1.1.1", "2024-11-11",
   */
  logSessionProperty: <T extends PropertyValueTypes>(key: string, val: T) => {
    if (window.dtrum) {
      const customPropertyParamMap = generateParams(key, val)
      window.dtrum.sendSessionProperties({ ...customPropertyParamMap })
    }
  },

  /**
   * Values that may change during a user session can be pushed to the User Action Property.
   * All instances of these values pushed to the dynatrace will be preserved and visible in the User Action Property.
   * Example: If you want to track the price alerts a user sets while using the app, you can create a priceAlert as a user action property and submit the data using this function.
   * @param key: user action property key name created in dynatrace portal. This should be always small case. For example: pricealert
   * @param val: value of the session property. For example: 5000, "KYC", "2024-11-11",
   */
  logActionProperty: <T extends PropertyValueTypes>(key: string, val: T) => {
    if (window.dtrum) {
      const customPropertyParamMap = generateParams(key, val)
      const actionId = window.dtrum.enterAction(
        `Custom Action Property: ${key} logged with value: ${val}`
      )
      const valType = typeof val

      if (valType === 'number')
        window.dtrum.addActionProperties(
          actionId,
          null,
          null,
          null,
          customPropertyParamMap[JS_DT_DATATYPE_MAP.number] as PropertyMap
        )
      else if (valType === 'object')
        window.dtrum.addActionProperties(
          actionId,
          null,
          customPropertyParamMap[JS_DT_DATATYPE_MAP.object] as PropertyMap
        )
      else
        window.dtrum.addActionProperties(
          actionId,
          null,
          null,
          customPropertyParamMap[JS_DT_DATATYPE_MAP.string] as PropertyMap
        )

      window.dtrum.leaveAction(actionId)
    }
  }
}

export default DynatraceWrapper

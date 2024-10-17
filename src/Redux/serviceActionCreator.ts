import { PayloadActionCreator } from '@reduxjs/toolkit'
import { WebHttpError } from '@am92/web-http'

import DynatraceWrapper from '../Lib/Dynatrace/DynatraceWrapper'

import { TAppDispatch } from '../Configurations/AppStore'

export type TraceActions<TResponse> = {
  loading: PayloadActionCreator<undefined, string>
  success: PayloadActionCreator<TResponse, string>
  error: PayloadActionCreator<WebHttpError, string>
}

export default function serviceActionCreator<
  RequestData = void,
  Response = unknown
>(
  traceActions: TraceActions<Response>,
  service: (data: RequestData) => Promise<Response>
) {
  return (data: RequestData) => {
    return async (dispatch: TAppDispatch): Promise<Response | WebHttpError> => {
      if (traceActions.loading && typeof traceActions.loading === 'function') {
        dispatch(traceActions.loading())
      }

      try {
        const response = await service(data)

        if (
          traceActions.success &&
          typeof traceActions.success === 'function'
        ) {
          dispatch(traceActions.success(response))
        }

        return response
      } catch (error: unknown) {
        if (traceActions.error && typeof traceActions.error === 'function') {
          dispatch(traceActions.error(error as WebHttpError))
        }
        // INFO: For API failure log data in Dynatrace
        DynatraceWrapper.error(error as Error)
        return error as WebHttpError
      }
    }
  }
}

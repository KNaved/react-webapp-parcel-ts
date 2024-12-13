import { JS_DT_DATATYPE_MAP } from './Dynatrace.Constants'
import { CustomProperties, PropertyMap } from './Dynatrace.Types'

/**
 * Generates the paramter in the format expected by sendSessionProperties & addActionProperties
 */
const generateParams = <T extends string | number | object>(
  key: string,
  val: T
): CustomProperties => {
  const customPropertyParamMap: CustomProperties = {}

  const propertyKeyMap: PropertyMap = {
    [key]: {
      value: val,
      public: true
    }
  }

  const valType = typeof val
  if (valType === 'number' || valType === 'object' || valType === 'string') {
    const dtDataTypeName = JS_DT_DATATYPE_MAP[valType]
    customPropertyParamMap[dtDataTypeName] = propertyKeyMap
  } else {
    throw new Error(`Unsupported type: ${valType}`)
  }
  return customPropertyParamMap
}

export default generateParams

// Generic type to wrap values and optionally mark them as public.
type TypedProperty<T> = {
  value: T // The actual value (could be string, number, or object)
  public?: boolean
}

// Define the possible types that can be wrapped in a TypedProperty.
export type PropertyValueTypes = string | number | object

// Represents a map of custom properties where each key (propertyName)
// maps to a TypedProperty with a value of one of the allowed types.
export type PropertyMap = {
  [propertyName: string]: TypedProperty<PropertyValueTypes>
}

// Represents properties that can be sent in an addActionProperties or sendSessionProperties method.
// A paramKey maps to either a PropertyMap (a set of properties) or a number (used in action property for setting ActionId).
export type CustomProperties = {
  [paramKey: string]: PropertyMap | number
}

/*-----------------------------------------------
Example Usage
-------------------------------------------------
Example 1
const sessionProperty: PropertyMap = {
  appversion: {
    value: "1.0.9",
    public: true
  },
};

const customSessionPropertyParam: CustomProperties = {
  shortString: sessionProperty
};


Example 2
const actionProperty: PropertyMap = {
  pricealert: {
    value: 12000,
    public: true
  },
};

const customActionPropertyParam: CustomProperties = {
  javaLong: actionProperty,
  parentActionId: 12
};

-------------------------------------------------
*/

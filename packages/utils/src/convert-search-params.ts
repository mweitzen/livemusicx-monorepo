function isEmpty(value?: string) {
  return value === "" || value === undefined;
}

function isSearchQuery(key: string) {
  return key === "q" || key === "query" || key === "search";
}

function isNumber(value: string) {
  return !isNaN(Number(value));
}

function isDate(value: string) {
  const regex = /\d{4}-\d{2}-\d{2}/;
  if (regex.test(value)) {
    return !isNaN(new Date(value).getTime());
  }
  return false;
}

function isBoolean(value: string) {
  return ["include", "true", "false", "exclude"].includes(value);
}

export function convertSearchParamsToQuery(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  let conversion: { [key: string]: any } = {};

  for (let key in searchParams) {
    const value = searchParams[key];

    /**
     * Handle single value, non-arrays
     */
    if (typeof value === "string") {
      /**
       * Skip search params with empty values
       */
      if (isEmpty(value)) continue;

      /**
       * Skip checks for query strings
       */
      if (isSearchQuery(key)) {
        conversion[key] = value;
        continue;
      }

      /**
       * Handle Number
       */
      if (isNumber(value)) {
        conversion[key] = Number(value);
        continue;
      }

      /**
       * Handle Date
       */
      if (isDate(value)) {
        conversion[key] = new Date(value);
        continue;
      }

      /**
       * Handle Boolean
       */
      if (isBoolean(value)) {
        if (["include", "true"].includes(value)) {
          conversion[key] = true;
          continue;
        }
        if (["false", "exclude"].includes(value)) {
          conversion[key] = false;
          continue;
        }
      }

      /**
       * Handle String
       */
      conversion[key] = value;
    } else {
      /**
       * Handle arrays
       */
      conversion[key] = value;
    }
  }

  return conversion;
}

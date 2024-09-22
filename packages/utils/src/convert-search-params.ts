export function convertSearchParamsToQuery(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  let query: { [key: string]: any } = {};
  Object.keys(searchParams).forEach((key) => {
    const value = searchParams[key];
    // skip empty strings
    if (value === "" || value === undefined) return;

    if (typeof value === "string") {
      // handle boolean conversion
      if (["include", "true"].includes(value)) {
        return (query[key] = true);
      }
      if (["false", "exclude"].includes(value)) {
        return (query[key] = false);
      }

      // handle date conversion
      if (key.includes("date") || key.includes("time")) {
        return (query[key] = new Date(value));
      }

      // handle number conversion
      if (key === "minimumAge") {
        return (query[key] = parseInt(value));
      }

      // return original string
      return (query[key] = value);
    } else {
      // handle string array
    }
  });
  return query;
}

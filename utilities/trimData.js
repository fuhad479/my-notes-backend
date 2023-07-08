export function trimData(reqBody) {
  const data = {}

  // process the data and trim the values
  Object.entries(reqBody).forEach((dataField) => {
    if (dataField[1] !== "") {
      // assign trimmed data to user object from above
      data[dataField[0]] = dataField[1].trim();
    }
  });

  return data
}

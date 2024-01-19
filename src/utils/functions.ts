export function toDate(string: string) {
  return new Date(string).getTime();
}

export function checkQuery(string: string, query: string): boolean {
  const preparedString = string?.toLowerCase().trim();
  const preparedQuery = query.toLowerCase().trim();

  return preparedString.includes(preparedQuery);
}
export function validator(obj: any, fields: string[]): boolean {
  const keys = Object.keys(obj || {});
  const existing = []
    .concat(fields)
    .filter(field => keys.indexOf(field) === -1);

  return existing.length === 0;
}

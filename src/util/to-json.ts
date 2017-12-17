import * as qs from 'querystring';

export function toJson(str: string, fallback: any = {}): any {
  try {
    return JSON.parse(str);
  } catch (e) {
    return qs.parse(str);
  }
}

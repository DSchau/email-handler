import * as qs from 'querystring';
import { send } from './util/send';

const isWarmUp = ev => ev.source === 'serverless-plugin-warmup';

const parseBody = body => {
  try {
    return JSON.parse(body);
  } catch (e) {
    return qs.parse(body);
  }
};

export async function email(ev, context, callback) {
  if (isWarmUp(ev)) {
    console.log('WarmUP - Lambda is warm!');
    return callback(null, 'Lambda is warm!');
  }

  const body = parseBody(ev.body);

  const response = await send(body).catch(e => callback(e));

  return callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(response)
  });
}

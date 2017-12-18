import { send } from './util/send';

const isWarmUp = ev => ev.source === 'serverless-plugin-warmup';

export async function email(ev, context, callback) {
  if (isWarmUp(ev)) {
    console.log('WarmUP - Lambda is warm!');
    return callback(null, 'Lambda is warm!');
  }

  const referer = ev.headers.Referer.replace(/\/$/, '');

  try {
    const response = await send(ev.body).catch(e => callback(e));

    return callback(null, {
      statusCode: 302,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Location: `${referer}?success=true`
      },
      body: JSON.stringify(response)
    });
  } catch (e) {
    console.error(e);
    return callback(e);
  }
}

import { send } from './util/send';

const handleCallback = (callback, ev) => {
  const referer = ev.headers.Referer.replace(/\/$/, '');
  let statusCode =
    ev.headers['content-type'] === 'application/x-www-form-urlencoded'
      ? 302
      : 200;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Location: `${referer}?success=true`
  };

  return function(err: null | Error, body?: string | Error) {
    if (err) {
      body = JSON.stringify({
        error: err.toString()
      });
      statusCode = 500;
    }
    return callback(null, {
      statusCode,
      headers,
      body
    });
  };
};

export async function email(ev, context, callback) {
  if (ev.source === 'serverless-plugin-warmup') {
    return callback(null, 'Lambda is warm!');
  }

  try {
    console.log(ev.body);
    const response = await send(ev.body);

    return handleCallback(callback, ev)(null, JSON.stringify(response));
  } catch (err) {
    console.error(err);
    return handleCallback(callback, ev)(err);
  }
}

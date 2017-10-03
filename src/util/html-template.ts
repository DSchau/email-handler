import * as inlineCss from 'inline-css';
import { inky } from './inky';
import { STYLE as INKY_STYLE } from '../style';

const compose = (...args) => {
  return args.reduce((value, fn) => {
    value = typeof fn === 'function' ? fn(value) : fn;
    return value;
  }, undefined);
};

export const htmlTemplate = async (template, ...args) => {
  const content = []
    .concat(template)
    .map((str, index) => (str += args[index] || ''))
    .join('');
  const inline = async template => await inlineCss(template, { url: ' ' });
  return compose(
    inky(content),
    inkyContent => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <style>
${INKY_STYLE}
  </style>
  <style>

  </style>
</head>
<body>
  ${inkyContent}
</body>
</html>
    `,
    inline
  );
};

import { inky } from '../inky';

test('it runs inky on html string', () => {
  const content = `<button>hello world</button>`;

  expect(inky(content)).not.toEqual(content);
});

import { htmlTemplate } from '../html-template';

test('it allows usage of a function', async () => {
  expect(async () => await htmlTemplate(`<button>test</button>`)).not.toThrow();
});

test('it allows usage of template string', async () => {
  const html = await htmlTemplate`<button href="#">Hello</button>`;

  expect(typeof html).toBe('string');
});

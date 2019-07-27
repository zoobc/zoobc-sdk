import HelloWord from '../src/helloWord';

test('Should return Hello Nabila Lover', () => {
  const user = { name: 'Nabila Lover' };
  expect(HelloWord(user)).toBe('Hello Nabila Lover');
});

import { TruthyOption } from './option'

test('TruthyOption should be none for empty strings', () => {
  const o = TruthyOption('')
  expect(o.isDefined).toBeFalsy
})

test('TruthyOption chain', () => {

  const output =
    TruthyOption('#/this/is/a/long/hash/path/with?query=param')
      .map(_ => _.substring(1))
      .getOrElse('/admin')

  expect(output).toEqual('/this/is/a/long/hash/path/with?query=param')

})
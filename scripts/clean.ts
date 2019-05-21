import * as rimraf from 'rimraf'

const noop = (_: Error) => {} // eslint-disable-line no-empty-function,@typescript-eslint/no-unused-vars

rimraf('dist', noop)
rimraf('doc', noop)

/* eslint-disable camelcase, @typescript-eslint/camelcase */

import * as fixme from 'fixme'

import { dir } from './constants'

fixme({
    path: dir.src,
    file_patterns: ['**/*.ts'],
    file_encoding: 'utf8',
    line_length_limit: 200,
})

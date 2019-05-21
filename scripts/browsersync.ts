// Alternative: webpack-dev-server
// https://webpack.github.io/docs/webpack-dev-server.html
// https://webpack.js.org/configuration/dev-server

import * as browserSync from 'browser-sync'
import * as compression from 'compression'
import * as connectHistoryApiFallback from 'connect-history-api-fallback'
import * as log from 'connect-logger'
import * as minimist from 'minimist'

import { browser, dir, host, port } from './constants'

const { webserverConfig, dist } = dir
const key = `${webserverConfig}/https/key.pem`
const cert = `${webserverConfig}/https/certificate.cer`
const format = '%date %status %method %url'
const index = '/index.html'
const htmlAcceptHeaders = ['text/html', 'application/xhtml+xml']
const argv = minimist(process.argv.slice(2)) // eslint-disable-line no-magic-numbers
const online = argv.online !== undefined

// Nicht bs-config.js wg. Middleware log() und connectHistoryApiFallback()
const options = {
    server: { baseDir: dist },
    https: {
        key,
        cert,
    },
    port,
    host,
    // httpModule: 'http2',
    middleware: [
        // "compression" ist nicht kompatibel mit "http2"
        // https://github.com/BrowserSync/browser-sync/issues/1443
        // https://github.com/BrowserSync/browser-sync/issues/1517
        compression(),
        log({ format }),
        connectHistoryApiFallback({
            index,
            htmlAcceptHeaders,
        }),
    ],
    cors: true,
    // proxy: 'http://localhost:8444',
    // serveStatic: [
    //     {
    //         route: ['/', '.', '/assets', '/js'],
    //         dir: dist,
    //     },
    // ],
    logConnections: false,
    online,
    ui: false,
    browser,
    reloadOnRestart: true,
    notify: false,
}
// @ts-ignore
browserSync.create().init(options)

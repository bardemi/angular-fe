/* eslint-disable no-magic-numbers */

import * as fs from 'fs'
import * as minimist from 'minimist'
import * as path from 'path'
import * as shell from 'shelljs'
import * as slash from 'slash'

import { dir } from './constants'

const nginxDir = 'C:/Zimmermann/nginx'

const argv = minimist(process.argv.slice(0))
const values = argv._
const start = values[2] === undefined || values[2] === 'start'
const stop = values[2] === 'stop'
const init = values[2] === 'init'

if (start) {
    console.log('nginx startet ohne Meldung...')
    console.log('Herunterfahren durch "npm run start:nginx stop"')
    shell.exec(`cd ${nginxDir} && nginx`)
} else if (stop) {
    shell.exec(`cd ${nginxDir} && nginx -s quit`)
} else if (init) {
    // Bei file:/// erlaubt ein Browser aus Sicherheitsgründen keine Ajax-Requests,
    // weil JavaScript sonst direkt im Dateisystem lesen koennte
    const { dist, nginx } = dir
    const basedir = slash(path.join(__dirname, '..', dist))
    const newConfFile = path.join(nginx, 'conf', 'nginx.conf')

    const readCb = (err, data) => {
        if (err) {
            return console.log(err)
        }
        const result = data.replace(/BASEDIR_JZ/gu, basedir)

        const errCb = errWrite => {
            if (errWrite) {
                return console.log(errWrite)
            }
        }
        fs.writeFile(newConfFile, result, 'utf8', errCb)
    }

    fs.readFile('config/webserver/nginx/nginx.conf', 'utf8', readCb)
}

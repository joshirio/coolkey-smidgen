#!/usr/bin/env node

'use strict'

const nopt = require('nopt')
//const osenv = require('osenv')
//const path = require('path')
//const fs = require('fs')

const smidgen = require('../lib/smidgen.js')
const handleError = require('../lib/handle-error.js')

process.on('uncaughtException', handleError)

const parsed = nopt({
  'json': [ Boolean ],
  'depth': [ Number ],
  'mwm': [ Number ],
  'watch': [ Boolean ],
  'force': [ Boolean ],
  'provider': [ String ],
  'threshold': [ Number ],
  'security': [ Number ],
  'balance': [ Number ],
  'amount': [ Number ],
  'validation': [ Boolean ],
  'tag': [ String ] //IOTACOOLER custom tag

}, {}, process.argv, 2)


//IOTACOOLER> disable conf file
/*const home = osenv.home()
parsed.smidgenconf = path.join(home, '.iota-cooler-smidgenrc')

if (!fs.existsSync(parsed.smidgenconf)) {
  //Don't use config file but --provider arg
  //fs.writeFileSync(parsed.smidgenconf, '{"provider": "https://nodes.thetangle.org:443"}')
}*/

let cmd = parsed.argv.remain.shift()
const short = {
  'seed': 'generate-seed'
}

if (short[cmd]) {
  cmd = short[cmd]
}

smidgen.load(parsed, (err) => {
  if (err) return handleError(err)

  if (!cmd || !smidgen.cli[cmd]) {
    return smidgen.cli.help([], () => {})
  }

  smidgen
    .cli[cmd](parsed.argv.remain, (err) => {
      if (err) handleError(err)
    })
})

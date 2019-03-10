'use strict'

const fs = require('fs')
const path = require('path')

const log = require('npmlog')
const IOTA = require('iota.lib.js')

const commandsDir = path.join(__dirname, 'cmds')

const smidgen = {
  config: null
}

module.exports = (exports = smidgen)

let commandFuncs = {}
let cliFuncs = {}

Object.defineProperty(smidgen, 'commands', {
  get: () => {
    if (!smidgen.config) {
      throw new Error('run smidgen.load before')
    }
    return commandFuncs
  }
})

Object.defineProperty(smidgen, 'cli', {
  get: () => {
    if (!smidgen.config) {
      throw new Error('run smidgen.load before')
    }
    return cliFuncs
  }
})

exports.load = load
function load (opts, cb) {
  fs.readdir(commandsDir, (err, res) => {
    if (err) return err
    const c = populateCommands(cliFuncs, commandFuncs, res)
    cliFuncs = c.cliFuncs
    commandFuncs = c.commandFuncs

    /* don't use conf file */
    //fs.readFile(opts.smidgenconf, 'utf8', (err, txt) => {
      //if (err) return cb(err)

      let fileConf
      //try {
        //fileConf = JSON.parse(txt)
    fileConf = JSON.parse('{}') //fake an empty json conf
      /*} catch (e) {
        return cb(e)
      }*/

      const defaults = {
        balance: undefined,
        security: 2,
        amount: 25,
        threshold: 100,
        depth: 4,
        mwm: 14,
        provider: 'https://nodes.thetangle.org:443',
        validation: true,
        tag: '9'.repeat(27) //IOTACOOLER custom tag
      }

      smidgen.config = Object.assign({}, defaults, fileConf, opts)
      smidgen.log = log

      smidgen.iota = new IOTA({
        'provider': smidgen.config.provider
      })

      smidgen.smidgenconf = opts.smidgenconf

      if (!smidgen.config.validation) {
        smidgen.log.info('', 'Online-Validations turned off. Take care!')
      }

      cb(null, smidgen)
    //})
  })
}

exports.populateCommands = populateCommands
function populateCommands (cliFuncs, commandFuncs, list) {
  const cli = {}
  const command = {}

  //Original code refactored below to allow pkg building into an executable
  /*list.filter((file) => {
    return /\.js$/.test(file)
  }).forEach((file) => {
    const cmdName = path.basename(file, '.js')
    const cmd = require(path.join(commandsDir, file))

    cli[cmdName] = cmd.cli
    command[cmdName] = cmd
  })*/
  /* commands:
  crypto
  generate-address
  generate-seed
  get-balance
  help
  multisig
  promote
  reattach
  regenerate-addresses
  transfer
  iotacooler
  */
  let file, cmdName, cmd
  //1.
  file = 'crypto'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/crypto')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //2.
  file = 'generate-address'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/generate-address')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //3.
  file = 'generate-seed'
   cmdName = path.basename(file, '.js')
   cmd = require('../lib/cmds/generate-seed')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //4.
  file = 'get-balance'
   cmdName = path.basename(file, '.js')
   cmd = require('../lib/cmds/get-balance')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //5.
  file = 'help'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/help')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //6.
  file = 'multisig'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/multisig')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //7.
  file = 'promote'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/promote')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //8.
  file = 'reattach'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/reattach')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //9.
  file = 'regenerate-addresses'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/regenerate-addresses')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //10.
  file = 'transfer'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/transfer')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //11.
  file = 'iotacooler'
  cmdName = path.basename(file, '.js')
  cmd = require('../lib/cmds/iotacooler')
  cli[cmdName] = cmd.cli
  command[cmdName] = cmd
  //end refactor

  return {
    cliFuncs: cli,
    commandFuncs: command
  }
}

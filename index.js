#!/usr/bin/env node

const file = require('path').resolve(process.argv[2])

const nw = require('child_process').spawn(
  require('nw').findpath(), [`${__dirname}/app`, file]
)

nw.stdout.pipe(process.stdout)
nw.stderr.pipe(process.stderr)
nw.on('exit', code => process.exit(code))

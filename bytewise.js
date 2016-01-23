var nut     = require('./nut')
var shell   = require('./shell') //the shell surrounds the nut
var Codec   = require('level-codec')
var merge   = require('xtend')
var compare = require('typewiselite')
var IteratorStream = require('level-iterator-stream')

var precodec = require('./codec/bytewise')

function id (e) {
  return e
}

module.exports = function (db, opts) {

  opts = merge(db.options, {
    keyEncoding: {
      encode: id,
      decode: id,
      buffer: true
    }
  }, opts)

  var codec = new Codec(opts)

  return shell (
    nut ( db, precodec, codec, compare ),
    [], IteratorStream, opts
  )
}



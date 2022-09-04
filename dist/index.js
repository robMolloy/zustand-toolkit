
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./zustand-toolkit.cjs.production.min.js')
} else {
  module.exports = require('./zustand-toolkit.cjs.development.js')
}

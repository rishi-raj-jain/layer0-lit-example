const { createDevServer } = require('@layer0/core/dev')

module.exports = function () {
  return createDevServer({
    label: 'Lit 2.0',
    command: (port) => `PORT=${port} npm run dev`,
    ready: [/listening on/i],
  })
}

// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'

export default new Router()
  .match('/', ({ serveStatic, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
      },
      browser: {
        serviceWorkerSeconds: 60 * 60,
      },
    })
    serveStatic('build/index.html')
  })
  .match('/about', ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
      },
      browser: {
        serviceWorkerSeconds: 60 * 60,
      },
    })
    serveStatic('build/index.html')
  })
  .static('build')

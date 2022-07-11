// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'
const IF_PRODUCTION = process.env.NODE_ENV === 'production'

const router = new Router()

router.match('/', ({ serveStatic, cache }) => {
  if (IF_PRODUCTION)
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

router.match('/about', ({ cache, serveStatic }) => {
  if (IF_PRODUCTION)
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

router.match('/:path*', ({ cache, serveStatic }) => {
  if (IF_PRODUCTION)
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
      },
      browser: {
        serviceWorkerSeconds: 60 * 60,
      },
    })
  serveStatic('build/:path*', {
    onNotFound: () => serveStatic('build/index.html'),
  })
})

export default router

import { Router } from 'express'

export const webRouter = Router()

webRouter.get('/', (req, res) => {
  res.sendFile('usuarios.view.html', { root: './views' })
})

webRouter.use((error, req, res, next) => {
  next(error)
})

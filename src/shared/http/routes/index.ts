import articlesRouter from '@modules/articles/routes/articles.routes'
import authorsRouter from '@modules/authors/routes/authors.router'
import passwordRouter from '@modules/users/routes/passwords.routes'
import profileRouter from '@modules/users/routes/profile.routes'
import sessionsRouter from '@modules/users/routes/sessions.routes'
import usersRouter from '@modules/users/routes/users.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/articles', articlesRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/authors', authorsRouter)

export default routes
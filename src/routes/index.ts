import { Router } from 'express'
import { routerAuth } from './auth'
import { routerGallery } from './gallery'
import { routerUser } from './user'
import { routerExperience } from './experience'
import { routerProject } from './project'
import { routerSkill } from './skill'

const router = Router()

router.use('/auth', routerAuth)
router.use('/experience', routerExperience)
router.use('/gallery', routerGallery)
router.use('/project', routerProject)
router.use('/skill', routerSkill)
router.use('/user', routerUser)

export { router }

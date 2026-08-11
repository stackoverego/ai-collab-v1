import {Router} from 'express'
import authUser from '../middleware/auth.middleware.js';
import * as projectController from '../Controller/project.controller.js'
import { body } from 'express-validator';

const router=Router();

router.post('/create',authUser,
    body('name').isString().withMessage('name is required'),
    projectController.createProject);

router.post('/all',authUser,projectController.getAllProjects);

router.put('/add-user',authUser,
    body('projectId').isString().withMessage("project id is required"),
    body('users').isArray({min:1}).withMessage('users must be an array of strings')
    .custom((users)=>users.every(user=> typeof user==="string")),
    projectController.addUsersToProject)

router.post('/get-project/:projectid',authUser,projectController.getProjectDetails)
export default router;
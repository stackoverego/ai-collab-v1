import { Router } from "express";
import * as usercontroller from '../Controller/user.controller.js'
import { body } from "express-validator";

const router=Router();
router.post('/register',
    body('email').isEmail().withMessage("email must be a valid email address"),
    body('password').isLength({min:3}).withMessage("password must be atleast 3 character long"),
    usercontroller.createUserController
);

router.post('/login',
    body('email').isEmail().withMessage("email must be a valid email address"),
    body('password').isLength({min:3}).withMessage("password must be atleast 3 character long"),
    usercontroller.loginUserController
)

export default router;
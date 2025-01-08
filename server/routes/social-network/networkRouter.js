
import { Router } from "express";
import googleController from "../../ctrls/socialNetworkControllers/googleController.js";

import facebookController from '../../ctrls/socialNetworkControllers/facebookController.js';
import githubController from '../../ctrls/socialNetworkControllers/githubController.js';
import passport from '../../config/passport.js';

const router = Router();
//GOOGLE
// Запит на Google аутентифікацію
router.get('/google', 
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        prompt: 'select_account'  // Параметр для вибору акаунту
    })
);
//=> Then callbeck after success
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/api/login' }),
    googleController, // Ваш контролер буде викликаний після аутентифікації
    (req, res) => {
        // Успішне перенаправлення
        res.redirect('/api/profile');
    }
);

//FACEBOOK
router.get('/facebook', 
    passport.authenticate('facebook', { 
        scope: ['public_profile', 'email']  // Використовуємо правильний параметр 'public_profile'
    })
);

// Callback після успішної аутентифікації
router.get('/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/api/login' }),
    facebookController, // Ваш контролер буде викликаний після аутентифікації
    (req, res) => {
        // Успішне перенаправлення
        res.redirect('/api/profile');
    }
);

router.get('/github', githubController);

export default router;
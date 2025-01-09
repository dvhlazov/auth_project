import { generateAccessToken, generateRefreshToken } from '../tokens.js';
import { authModel } from '../../models/authModel.js';
import { userProfile } from '../../models/profileModel.js';

export const googleController = async (req, res) => {
    try {
        const user = req.user;  // Отримуємо користувача з request (передано після успішної авторизації через Google)
        console.log('User DATA is:', JSON.stringify(user, null, 2));
        const email = user.userEmail;
        const provider = 'google';  // Фіксований provider для Google

        // Перевіряємо, чи існує користувач з таким email та provider в auth
        let existingUser = await authModel.findOne({ email, provider });

        if (existingUser) {
            // Якщо користувач вже існує, повертаємо дані профілю
            const profileData = await userProfile.findById(existingUser.profile);
            console.log('User profile found:', profileData);
            
            // Генеруємо токени
            const accessToken = generateAccessToken(user.userID);  // Використовуємо userID з Google профілю
            const refreshToken = generateRefreshToken(user.userID);  // Використовуємо userID для створення токенів

            // Встановлюємо cookies для токенів
            res.cookie('accessToken', accessToken, { 
                httpOnly: true, 
                maxAge: 3600000,  // 1 година
                secure: false  // В production можна поставити true
            });

            res.cookie('refreshToken', refreshToken, { 
                httpOnly: true, 
                maxAge: 86400000,  // 24 години
                secure: false  // В production можна поставити true
            });

            // Перенаправляємо на маршрут профілю після успішної авторизації
            return res.redirect('/api/profile');
        }

        // Якщо користувач не знайдений, створюємо новий профіль
        const newProfile = new userProfile({
            name: user.userName,  // Використовуємо userName з Google профілю
            surname: user.userSurname,  // Використовуємо surname з Google профілю
            email,  // Додаємо email до профілю
        });

        // Зберігаємо новий профіль в базі даних
        await newProfile.save();

        // Створюємо новий обліковий запис в auth
        const newAuth = new authModel({
            email,
            provider,
            profile: newProfile._id,  // Прив'язуємо до нового профілю
        });

        // Зберігаємо новий запис в базі даних
        await newAuth.save();

        // Генеруємо токени
        const accessToken = generateAccessToken(user.userID);  // Використовуємо userID для створення токенів
        const refreshToken = generateRefreshToken(user.userID);  // Використовуємо userID для створення токенів

        // Встановлюємо cookies для токенів
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            maxAge: 3600000,  // 1 година
            secure: false  // В production можна поставити true
        });

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            maxAge: 86400000,  // 24 години
            secure: false  // В production можна поставити true
        });

        // Перенаправляємо на маршрут профілю після успішної авторизації
        res.redirect('/api/profile');
    } catch (error) {
        console.error('Google login error:', error);
        // Якщо сталася помилка, перенаправляємо на сторінку входу
        res.redirect('/api/login');
    }
};

export default googleController;

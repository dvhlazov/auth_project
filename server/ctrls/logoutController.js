export const logoutController = (req, res) => {
    // Завершуємо сесію
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to destroy session' });
        }

        // Очищаємо куки для токенів
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        
        // Очищаємо куку для сесії
        res.clearCookie('connect.sid');

        // Відповідь для клієнта
        res.status(200).json({ message: 'Logged out successfully' });
    });
}

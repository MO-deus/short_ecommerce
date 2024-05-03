import User from "../../../server/models/UserModel";

const authenticateUser = (req, res, next) => {
    const { email, password } = req.headers;

    if (!username || !password) {
        return res.status(401).json({ error: 'Username and password are required' });
    }

   const user = User.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.user = user;

    next();
};

module.exports = authenticateUser;
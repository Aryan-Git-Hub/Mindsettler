export const consultant = (req, res, next) => {
    if (req.user && req.user.role === 'consultant') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an consultant' });
    }
};
export const consultant = (req, res, next) => {
    if (req.user && req.user.isConsultant) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an consultant' });
    }
};
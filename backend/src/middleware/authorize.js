export default function authorize(...allowedRoles) {
  return (req, res, next) => {
    const { user } = req;
    if (!user) return res.status(401).json({ success:false, message:'Unauthorized' });
    if (allowedRoles.length === 0) return next();
    if (allowedRoles.includes(user.role) || user.role === 'admin') return next();
    return res.status(403).json({ success:false, message:'Forbidden: insufficient role' });
  };
}

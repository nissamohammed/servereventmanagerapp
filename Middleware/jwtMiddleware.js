const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log('Inside JWT Middleware');
    
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Corrected method name
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token,'supersecretkey'); // Verifies the token
        console.log(jwtResponse);
        req.payload = jwtResponse.userId; // Attach userId to req.payload
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: 'Authorization failed ......please login', error });
    }
};

module.exports = jwtMiddleware;





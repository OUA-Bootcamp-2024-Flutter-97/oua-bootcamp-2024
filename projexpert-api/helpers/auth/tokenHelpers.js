const sendJwtToClient = (user, res) => {
    //generate token
    const token = user.generateJwtFromUser();
    const { JWT_COOKIE, NODE_ENV } = process.env;

    return res
        .status(200)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
            secure: NODE_ENV === 'development' ? false : true
        })
        .json({
            success: true,
            access_token: token,
            data: {
                name: user.name,
                email: user.email,
                //...user
            }
        })
}

const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer: ");
}

const getTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    
    return token;
}


export { sendJwtToClient, isTokenIncluded, getTokenFromHeader };
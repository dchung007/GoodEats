const signInUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id,
    };
};

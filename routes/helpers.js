function errorResponse(res, error) {
    console.log('res: ', res);
    console.log('error: ', error);
    return res.status(500).json({
        status: false,
        errors: (error && error.errors) 
            ? Object.values(error.errors).map(el => el.message)
            : 'Server error. Check logs.'
    });
}

module.exports = {
    errorResponse: errorResponse,
};

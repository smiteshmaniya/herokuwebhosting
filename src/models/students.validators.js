const { body } = require("express-validator/check");

module.exports = {
    authValidate: (method) => {
        switch (method) {
            case 'register':
                {
                    return [
                        body('email', `email field doesn't exist`).exists().isEmail(),
                        body('name', `firstName field doesn't exist`).exists(),
                        body('address', `lastName field doesn't exist`).exists(),
                        body('phone', `contactNo field doesn't exist`).exists(),
                        body('password', `password field doesn't exist`).exists()
                    ]
                }
        }
    }
}
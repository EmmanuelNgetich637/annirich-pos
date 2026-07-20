const { body, validationResult } = require("express-validator");


/*
|--------------------------------------------------------------------------
| Create Product Validation
|--------------------------------------------------------------------------
*/

const createProductValidation = [

    body("name")
        .notEmpty()
        .withMessage("Product name is required"),


    body("category_id")
        .isInt()
        .withMessage("Category is required"),


    body("buying_price")
        .isFloat({ min: 0 })
        .withMessage(
            "Buying price must be a positive number"
        ),


    body("selling_price")
        .isFloat({ min: 0 })
        .withMessage(
            "Selling price must be a positive number"
        ),


    body("quantity")
        .isInt({ min: 0 })
        .withMessage(
            "Quantity cannot be negative"
        )

];



/*
|--------------------------------------------------------------------------
| Update Product Validation
|--------------------------------------------------------------------------
*/

const updateProductValidation = [

    body("name")
        .optional()
        .notEmpty()
        .withMessage(
            "Product name cannot be empty"
        ),


    body("category_id")
        .optional()
        .isInt()
        .withMessage(
            "Category must be valid"
        ),


    body("buying_price")
        .optional()
        .isFloat({ min:0 })
        .withMessage(
            "Buying price must be a positive number"
        ),


    body("selling_price")
        .optional()
        .isFloat({ min:0 })
        .withMessage(
            "Selling price must be a positive number"
        ),


    body("quantity")
        .optional()
        .isInt({ min:0 })
        .withMessage(
            "Quantity cannot be negative"
        )

];



/*
|--------------------------------------------------------------------------
| Validation Middleware
|--------------------------------------------------------------------------
*/

const validate = (req,res,next)=>{


    const errors =
        validationResult(req);


    if(!errors.isEmpty()){


        return res.status(400).json({

            success:false,

            errors:
            errors.array()

        });


    }


    next();

};



module.exports = {

    createProductValidation,

    updateProductValidation,

    validate

};
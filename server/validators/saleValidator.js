const {
    body,
    validationResult
} = require("express-validator");



const createSaleValidation = [

    body("payment_method")
    .isIn([
        "Cash",
        "Mpesa",
        "Card"
    ])
    .withMessage(
        "Invalid payment method."
    ),


    body("items")
    .isArray({
        min:1
    })
    .withMessage(
        "Sale items required."
    ),


    body("items.*.product_id")
    .isInt()
    .withMessage(
        "Invalid product."
    ),


    body("items.*.quantity")
    .isInt({
        min:1
    })
    .withMessage(
        "Invalid quantity."
    ),


    body("items.*.selling_price")
    .isFloat({
        min:0
    })
    .withMessage(
        "Invalid selling price."
    )

];



const validate=(req,res,next)=>{


    const errors =
    validationResult(req);


    if(!errors.isEmpty()){

        return res.status(400).json({

            success:false,

            errors:errors.array()

        });

    }


    next();

};



module.exports={
    createSaleValidation,
    validate
};
import { param, validationResult } from "express-validator";
const validatorById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
const msgValidator = [
  param("id").isMongoId().withMessage("Invalid ID Format"),
  validatorById,
];

export default msgValidator;

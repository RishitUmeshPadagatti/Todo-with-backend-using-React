const { z } = require("zod");
const usernameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters long")
  .max(25, "Username cannot exceed 25 characters")
  .regex(/^\S+$/, "Username cannot contain spaces");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

function parsingMiddlewareZod(req, res, next) {
  const usernameResult = usernameSchema.safeParse(req.body.username)
  const passwordResult = passwordSchema.safeParse(req.body.password)

  if (usernameResult.success && passwordResult.success) {
    next()
  }
  else {
    if (!usernameResult.success) {
      res.status(403).json({msg: JSON.parse(usernameResult.error.message)[0].message});
    }
    else if (!passwordResult.success) {
      res.status(403).json({msg: JSON.parse(passwordResult.error.message)[0].message});
    }
  }


}

module.exports = { parsingMiddlewareZod }
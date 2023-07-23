export function validation(req, res, next) {
  const error = { message: "", errors: [] };

  if (!req.body.email) {
    error.message = "some required fields are missing";
    error.errors.push({ field: "email", message: "email is required" });
  }

  if (!req.body.password) {
    error.message = "some required fields are missing";
    error.errors.push({ field: "password", message: "password is required" });
  }

  if (error.message !== "") {
    return res.status(400).json(error);
  }

  next();
}

export function checkAuthentication(req, res, next) {
  if (req.session.id) {
    next();
  } else {
    res.status(401).json({ message: "You're not authorized" });
  }
}

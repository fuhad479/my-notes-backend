import bcrypt from "bcrypt";
import { client } from "../database/connect.js";
import { trimData } from "../utilities/trimData.js";
import { encryptPassword } from "../utilities/hashPassword.js";

const db = client.db("my-notes");
const collection = db.collection("users");

export async function registerController(req, res) {
  const user = trimData(req.body)

  // find an user from the database
  const preExistingUser = await collection.findOne({ email: user.email });

  // checks if an user already exists with the given email
  if (preExistingUser) {
    return res.status(409).json({ message: "this email already exists" });
  }

  // encrypt the password
  await encryptPassword(user);

  try {
    // save the user in database
    await collection.insertOne(user);

    // send the corresponding response to client
    res.status(201).json({
      message: "registration successful",
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    // send server error that occurred in server
    res.status(500).json({ message: "something went wrong" });
  }
}

export async function loginController(req, res) {
  const user = trimData(req.body);

  const preExistingUser = await collection.findOne({ email: user.email });

  if (preExistingUser) {
    const matchPassword = await bcrypt.compare(
      user.password,
      preExistingUser.password
    );

    req.session.id = preExistingUser._id;

    if (matchPassword) {
      return res.status(200).json({
        message: "logged in successfully",
        user: {
          first_name: preExistingUser.first_name,
          last_name: preExistingUser.last_name,
          email: preExistingUser.email,
        },
      });
    } else {
      res.status(504).json({ message: "invalid email or password" });
    }
  }

  res.status(504).json({ message: "invalid email or password" });
}

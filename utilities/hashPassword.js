import bcrypt from "bcrypt";

export async function encryptPassword(user) {
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  } catch (error) {
    console.log(error);
  }
}

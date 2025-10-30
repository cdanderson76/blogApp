import User from "../model/User.js";

export async function getAllUsers(req, res, next) {

  try {
    const users = await User.find({});

    if(!users) {
      return res.status(404).json({ message: 'No users found' });
    };
    return res.status(200).json({ users });
  } catch(error) {
    console.log(error.message);
  }
}
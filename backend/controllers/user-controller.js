import User from "../model/User.js";
import bcrypt from 'bcryptjs';


//GET ALL USERS
export async function getAllUsers(req, res, next) {

  try {

    const users = await User.find({});

    if(!users) {
      return res.status(404).json({ message: 'No users found' });
    };
    
    return res.status(200).json({ users });

  } catch(error) {
    return res.status(500).json({ message: 'Server error'})
  }
}


//SIGNUP USER ROUTE
export async function signup(req, res, next) {

  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if(existingUser) {
      return res.status(400).json({ message: 'User already exists!  Login instead' });
    };
    const hashedPassword = bcrypt.hashSync(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch(error) {
      console.log(error.message);
    }
    return res.status(201).json({ user });

  } catch(error) {
    return res.status(500).json({ message: 'Server error' })
  }
}


//LOGIN USER ROUTE
export async function login(req, res, next) {

  const { email, password } = req.body;
  let existingUser = '';

  try {

    existingUser = await User.findOne({ email });

    if(!existingUser) {
      return res.status(400).json({ message: `Couldn't find user with this email` });
    };
  
    
  } catch(error) {
    return res.status(500).json({ message: 'Server error' });
  }
    
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if(!isPasswordCorrect) {
    return res.status(400).json({ message: 'Password is incorrect'});
  }
  return res.status(200).json({ message: 'Login Successful' });
}
import User from "../model/User.js";


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

    const user = new User({
      name,
      email,
      password
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
import User from "../model/user.js";
import bcrypt from "bcrypt"
import AppError from "../utills/errorUtills.js";

// Read 
export const getUser = async (req, res) => {
    try {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            res.status(200).json({
                success: true,
                message: 'User details',
                user
            })
          } catch (err) {
            res.status(404).json({ message: err.message });
          }
    } catch (error) {
        return next(new AppError('faild to fetch profile', 500))
    }
}

//Update user
export const updateUser = async (req, res, next) => {
  try {
    const {id} = req.params
    const {firstName, lastName, stream, skills, achievement, twitter, linkdin, bio} = req.body
    console.log("firstName:",firstName);
    const user = await User.findById(id)

    if(!user){
      return next(new AppError('User does not exist', 400))
    }

    if(firstName){
      user.firstName = firstName
    }
    if(lastName){
      user.lastName = lastName
    }
    if(stream){
      user.stream = stream
    }
    if(skills){
      user.skills = skills
    }
    if(achievement){
      user.achievement = achievement
    }
    if(twitter){
      user.twitter = twitter
    }
    if(linkdin){
      user.linkdin = linkdin
    }
    if(bio){
      user.bio = bio
    }

    const updatedUser = await user.save()

    res.status(200).json({
      success: true,
      message: 'User details',
      updatedUser
    })

  } catch (error) {
    new AppError(error || 'User not updated, please try again', 500)
  }
}

export const getUserFriend = async (req, res) => {
    try {
        const {id} =req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriend = friends.map(
            ({_id, firstName, lastName, stream, skills, bio, picturePath}) => {
                return {_id, firstName, lastName, stream, skills, bio, picturePath}
            }
        )
        res.status(200).json(formattedFriend)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

// Update delete and add friend
export const addRemoveFriend = async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);

      if(!user && !friend){
        console.log("user and friend not found");
      }
  
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
    //   res.status(404).json({ message: err.message });
    console.log(err);
    }
  };
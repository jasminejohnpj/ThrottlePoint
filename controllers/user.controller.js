

export const profile = async (req, res, next) => {
  try {
    const existingUser = req.user; 

    const { Phonenumber, City, ProfilePic } = req.body;
    if (Phonenumber) existingUser.Phonenumber = Phonenumber;
    if (City) existingUser.City = City;
    if (ProfilePic) existingUser.ProfilePic = ProfilePic;

    await existingUser.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        Firstname: existingUser.Firstname,
        Lastname: existingUser.Lastname,
        Email: existingUser.Email,
        Phonenumber: existingUser.Phonenumber,
        City: existingUser.City,
        ProfilePic: existingUser.ProfilePic,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const profileView = async (req, res, next) => {
  try {
    const existingUser = req.user; 
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile details fetched successfully",
      user: {
        Firstname: existingUser.Firstname,
        Lastname: existingUser.Lastname,
        Email: existingUser.Email,
        Phonenumber: existingUser.Phonenumber,
        City: existingUser.City,
        ProfilePic: existingUser.ProfilePic,
      },
    });
  } catch (error) {
    next(error);
  }
};



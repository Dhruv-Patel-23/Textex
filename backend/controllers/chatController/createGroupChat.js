import Chat from "../../models/chatModel.js";

const createGroupChat = async (req, res) => {
  try {
    const { users, name } = req.body;

    if (!users || !name) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const uniqueUsers = new Set(JSON.parse(users));
    uniqueUsers.add(req.user); // Add the current user to the set
    const temp= new Set(uniqueUsers);
    const usersArray = Array.from(temp);

    if (usersArray.length < 2) {
      return res
        .status(400)
        .json("More than 2 users are required to form a group chat");
    }

    const groupChat = await Chat.create({
      chatName: name,
      users: usersArray,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default createGroupChat;

// import Chat from "../../models/chatModel.js";

// const createGroupChat = async (req, res) => {
//   if (!req.body.users || !req.body.name) {
//     return res.status(400).send({ message: "Please Fill all the feilds" });
//   }

//   var users = JSON.parse(req.body.users);

//   if (users.length < 2) {
//     return res
//       .status(400)
//       .send("More than 2 users are required to form a group chat");
//   }

//   users.push(req.user);
//   users = [...new Set(users)];

//   try {
//     const groupChat = await Chat.create({
//       chatName: req.body.name,
//       users: users,
//       isGroupChat: true,
//       groupAdmin: req.user,
//     });

//     const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password");

//     res.status(200).json(fullGroupChat);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// };

// export default createGroupChat;

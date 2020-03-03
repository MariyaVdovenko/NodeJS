const Users = require('../model/users');

module.exports = async (req, res) => {
  try {
    const body = req.body;

    if (body.password && body.email) {
      const emailInUse = await Users.findOne({ email: body.email });
      if (!emailInUse) {
        const user = await new Users(body);

        const result = await user.save();
        if (result) {
          res.status(201).json({
            token: user.token,
            user: {
              email: body.email,
              subscription: 'free',
            },
          });
        }
      } else {
        res.status(400).json({ message: 'Email in use' });
      }
    } else {
      res.status(422).json({ message: 'Missing required fields' });
    }
  } catch (err) {
    console.log(err);
  }
};

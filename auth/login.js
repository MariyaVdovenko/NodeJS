const Users = require('../model/users');


module.exports = async (req, res) => {
  try {
    const body = req.body;

    const user = await Users.findOne({ email: body.email });

    if (user) {
      const passwordComparre = user.validatePassword(body.password);
      user.getJWT();

      if (passwordComparre) {
        res.status(200).json({
          token: user.token,
          user: {
            email: body.email,
            subscription: 'free',
          },
        });
      } else {
        res.status(400).json({ message: 'Неверный логин или пароль' });
      }
    } else {
      res.status(400).json({ message: 'Неверный логин или пароль' });
    }
  } catch (err) {
    console.log(err);
  }
};

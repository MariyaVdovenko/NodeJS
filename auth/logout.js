const Users = require('../model/users');

module.exports = async (req, res) => {
  try {
    const body = req.body;

    const user = await Users.findOne({ email: body.email });
    if (user) {
      const passwordComparre = user.validatePassword(body.password);

      if (passwordComparre) {
        user.getJWT();
        res.status(200).json({ message: 'Logout success' });
      } else {
        res.status(401).json({
          message: 'Not authorized',
        });
      }
    } else {
      res.status(401).json({
        message: 'Not authorized',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

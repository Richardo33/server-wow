const { user, listBookUser, books } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    res.send({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "masukin yg bener jancokk",
    });
  }
};

exports.getUserss = async (req, res) => {
  try {
    const users = await user.findOne({
      where: {
        idUser: req.user.id,
      },
      include: {
        as: books,
        through: {
          model: listBookUser,
          as: "bridge",
        },
      },
    });
    res.send({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "masukin yg bener jancokk",
    });
  }
};

exports.getUserId = async (req, res) => {
  try {
    // const { id } = req.params;

    const data = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updateAt"],
      },
    });

    res.send({
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.update(req.body, {
      where: { id },
    });

    res.send({
      data: req.body,
      message: `Update user id: ${id} finished`,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "can not update user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: { id },
    });

    res.send({
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "error",
    });
  }
};

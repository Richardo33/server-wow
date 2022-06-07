// const { default: BookDetail } = require("../../../client/src/pages/bookDetail");
const { listBookUser, books } = require("../../models");

exports.addMyList = async (req, res) => {
  try {
    const { idBooks } = req.body;
    // console.log(idBooks);
    const data = await listBookUser.create({
      idUser: req.user.id,
      idBooks: idBooks,
    });

    res.send({
      status: "success",

      // data: getMyListBook,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getUserListBook = async (req, res) => {
  try {
    let data = await listBookUser.findAll({
      where: {
        idUser: req.user.id,
      },
      include: {
        model: books,
        as: "books",
      },
    });
    const path = "http://localhost:5000/uploads";

    // console.log(id);
    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "cannot get book",
    });
  }
};

exports.findListBook = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const data = await userListBook.findOne({
      where: {
        idUser: req.user.id,
        idBook: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: book,
        as: "book",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    res.send({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteListBook = async (req, res) => {
  try {
    const { id } = req.params;

    await listBookUser.destroy({
      where: { idBooks: id, idUser: req.user.id },
    });

    res.send({
      message: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

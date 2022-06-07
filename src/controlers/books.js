const { books } = require("../../models");

exports.addBook = async (req, res) => {
  try {
    // console.log(req.body);
    const body = req.body;
    const newBook = await books.create({
      ...body,
      bookFile: req.files.bookFile[0].filename,
      imgCover: req.files.imgCover[0].filename,
    });

    console.log(req.body);
    res.send({
      message: "Add Book done",
      data: newBook,
    });
  } catch (error) {
    // console.log(error);
    res.send({
      status: "failed",
      message: "cannot add book",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const data = await books.findAll({ order: [["updatedAt", "DESC"]] });

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "cannot show all the data book",
    });
  }
};

exports.getBookId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await books.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      data: {
        book: data,
      },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "you cant acces the specific book",
    });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const datUpdate = req.body;

    await books.update(datUpdate, {
      where: { id: id },
    });

    res.send({
      data: req.body,
      message: `Update book id: ${id} finished`,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "can not update user",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await books.destroy({
      where: { id },
    });

    res.send({
      message: `Delete book id: ${id} finished`,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "can not delete book",
    });
  }
};

const res = require("express/lib/response");
const { transaction, user } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const dataBody = req.body;
    console.log(req.files.transactionProof[0].filename);
    const addTrans = await transaction.create({
      transactionProof: req.files.transactionProof[0].filename,
      remainingActive: 0,
      userStatus: "No Active",
      paymentStatus: "pending",
      idUser: req.user.id,
    });

    const dataTransaction = await user.findOne({
      where: {
        id: addTrans.idUser,
      },
      attributes: {
        exclude: ["email", "password", "isSubs", "createdAt", "updatedAt"],
      },
      include: {
        model: transaction,
        as: "transaction",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      message: "Add Transaction done",
      user: { transaction: dataTransaction },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "cannot add transaction",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const data = await transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "isSubs", "createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "cannot show all the transaction",
    });
  }
};

exports.getTransactionId = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await transaction.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["email", "password", "isSubs", "createdAt", "updatedAt"],
        },
      },
    });
    res.send({
      data: { transaction: data },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "cannot get the data",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBody = req.body;

    const editTrans = await transaction.update(dataBody, {
      where: { id: id },
    });

    const edit = await transaction.findOne({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });

    if (edit.paymentStatus == "approve") {
      const dataSubs = {
        isSubs: "true",
      };

      await user.update(dataSubs, {
        where: {
          id: edit.idUser,
        },
      });
    } else {
      const dataSubs = {
        isSubs: "false",
      };

      await user.update(dataSubs, {
        where: {
          id: edit.idUser,
        },
      });
    }

    res.send({
      data: req.body,
      message: `update transaction id: ${id} finished`,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "can not edit transaction",
    });
  }
};

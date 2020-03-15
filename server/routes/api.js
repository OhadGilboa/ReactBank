const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/filterProducts/:filterType", async (req, res) => {
  const { filterType } = req.params;
  await Lottery.find({
    $and: [{ isProduct: false }, { productType: filterType }]
  }).exec((err, lotteries) => {
    console.log(`I want  ${lotteries}`);

    res.send(lotteries);
  });
});

router.post("/lottery/newLottery", async (req, res) => {
  let tempLottery = req.body;
  let newLottery = new Lottery({
    entryFee: tempLottery.entryFee,
    isProduct: tempLottery.isProduct,
    moneyPrize: tempLottery.moneyPrize,
    productPrize: tempLottery.productPrize,
    productPic: tempLottery.productPic,
    productDescription: tempLottery.productDescription,
    dueDate: tempLottery.dueDate,
    usersIn: tempLottery.usersIn,
    usersMax: tempLottery.usersMax,
    endByTime: tempLottery.endByTime,
    users: tempLottery.users,
    winner: tempLottery.winner,
    done: tempLottery.done
  });
  await newLottery.save();
  res.send(newLottery);
});

module.exports = router;

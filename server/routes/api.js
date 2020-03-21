const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/transactions", async (req, res) => {
  let t = await Transaction.find({})
  res.send(t)
});

router.post("/transaction", async (req, res) => {
  let body = req.body
  let trans = await new Transaction(body)
  await trans.save()
  res.send(trans)
});

router.delete("/transaction/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)
  await Transaction.findByIdAndDelete({_id: id})
  console.log(id)
  res.end();
});

module.exports = router;

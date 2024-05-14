const express = require("express");
const router = express.Router();
const tokenValidation = require("../middleware/tokenValidation");
const accountController = require("../controllers/accountController");

router.post(
  "/createAcc",
  tokenValidation.validateToken,
  accountController.createAccount
);

router.post(
  "/accounts/createTransac",
  tokenValidation.validateToken,
  accountController.createTransaction
);

router.post(
  "/accounts",
  tokenValidation.validateToken,
  accountController.getAllAccounts
);

router.get(
  "/accounts/:accId/transactions",
  tokenValidation.validateToken,
  accountController.getTransactionsFromAccount
);

router.put(
  "/accounts/:accId/transactions/:transacId",
  tokenValidation.validateToken,
  accountController.updateTransaction
);

module.exports = router;
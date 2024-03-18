


// GET:To fetch the acount Balance,
// GET:For transactions,
// POST:For any action,

const express = require("express");
const app = express();

app.use(express.json());

const {credit_amount, getBalance, performActions, checkThreshold}  = require("./functions")

app.post("/credit-amount",credit_amount);
app.get("/get_balance",getBalance);
app.post("/action",performActions);
app.get("/check-low-balance",checkThreshold);



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})
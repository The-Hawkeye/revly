
const actions = {
    "A":500,
    "B":800,
    "C":300,
    "D":100
}

const thresholdBalance = 100;

const expiry = 30*24*60*60; //30 days

const cron  = require("node-cron")



exports.credit_amount = async(req,res)=>{
    //Check if user exits,

    try{

        const user = await Model.findOne({username: req.body.username});
    if(!user)
    {
        return res.json("Error Message")
    }

    //Credit the amount to users  account

    const  newCreditAmount = await Model.findByIdAndUpdate(user._id,{
       balance: req.body.amount+user.amount},{new:true});

    
       res.json(newCreditAmount)

    }catch(err)
    {
        console.log(err);
        res.json("Error")
    }
    

}


exports.performActions = async(req,res)=>{
    const {action, username} = request.body

    try{

        const user = await Model.findOne({username: req.body.username});
        if(!user)
        {
            return res.json("Error Message")
        }

        const deduct_amount = actions[action];

        if(user.balance < deduct_amount)
        {
            return res.json("Insufficient  Balance");
        }

        const updateTrnsactions = await Transactions.findByIdAndUpdate(user.transactionId,{
            initial_amount:user.balance,
            transactionDate:new Date.now(),
            amountWithDrawn:actions[action],
            totalAmount:user 
        })

        const  updatedUser = await Model.findByIdAndUpdate(user._id, {
            balance:user.balance-deduct_amount,
        })

       

        res.json(updatedUser)
    

    }catch(err)
    {
        console.log(err);
        res.json("Error");
    }

}

exports.getBalance =async (req,res)=>{

    try{
        const user = await Model.findOne({username: req.body.username});
        if(!user)
        {
            return res.json("Error Message")
        }

        res.json(user.balance)
    }catch(err)
    {
        res.json("Error Fetching  Data")
    }
       
}

exports.checkThreshold = async(req,res)=>{
    const user = await Model.findOne({username: req.body.username});
    if(!user)
    {
        return res.json("Error Message")
    }

    if(user.balance>=thresholdBalance)
    {
        return res.json(true)
    }



    res.json("BAlance is less than minimum amount")
}



// exports.expire_credits_CRON = 
cron.schedule('*,*,1-31,*,*',()=>{
    const users = Model.find({});

    for(let i=0;i<users.length;i++)
    {
        if(users[i].balance<thresholdBalance)
        {
            
        }
    }

})
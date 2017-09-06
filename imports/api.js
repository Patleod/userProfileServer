const ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('./mongoose');

const Account = mongoose.AccountModel;
const Profile = mongoose.ProfileModel;

module.exports = {
    account : {

        create : (id,account, res) => {
            let dbaccount = new Account;
            dbaccount = Object.assign(dbaccount, account);
            dbaccount.pid = id;
            dbaccount.save( (err,createdAccount) => {
                if(err) res.status(500).json({error:err})
                res.status(200).json(createdAccount);
            });
        },

        get : (req,res) => {
            let id = req.params.id;

            if(id=="today"){
                return Account.find({_id : { $gt : ObjectId(Math.floor(new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate())/1000).toString(16)+"0000000000000000") }})
                    .sort("-created")
                    .exec( (err,fourres) => {
                        if(err) return res.status(500).json({error:err})
                        res.status(200).json(fourres);
                    });
            }

            Account.findById( id , (err,account) => {
                if(err) return res.status(500).json({error:err})
                res.status(200).json(account);
            });

        },

        update : (req,res) => {

            // console.log("\nUpdate() - Passed fourre to save = ", req.body)

            Account.findById(req.body._id)
                .exec( (err,foundAccount) => {
                    if(err) return res.status(500).json({error:err});
                    // console.log("\nAPI update - foundFourre = ", foundFourre)
                    if(!foundAccount || !foundAccount._id) {
                        // console.log(`Did not find any fourre to update with _id=${req.body._id}`.red);
                        return res.status(404).json({error:`Did not find any fourre to update with _id=${req.body._id}`});
                    }

                    foundAccount = Object.assign(foundAccount, req.body)
                    // console.log("\nToSave = ", foundFourre)
                    foundAccount.save((err) => {
                        if(err) return res.status(500).json({error:err})
                        res.status(200).end();
                    })
                });
        },

        delete : (req,res) => {
            Account.findByIdAndRemove( req.params.id)
                .exec( (err,deletedAccount) => {
                    if(err) return res.status(500).json({error:err})
                    res.status(200).json(deletedAccount);
                });
        }
    },

    profile : {
        
        create : (id, profile, res) => {
            let dbprofile = new Profile;
            dbprofile = Object.assign(dbprofile, profile)
            dbprofile.save( (err,createdAccount) => {
                if(err) res.status(500).json({error:err})
                res.status(200).json(createdAccount);
            });
        },

        get : (req,res) => {
            let id = req.params.id;

            if(id=="today"){
                return Account.find({_id : { $gt : ObjectId(Math.floor(new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate())/1000).toString(16)+"0000000000000000") }})
                    .sort("-created")
                    .exec( (err,fourres) => {
                        if(err) return res.status(500).json({error:err})
                        res.status(200).json(fourres);
                    });
            }

            Account.findById( id , (err,account) => {
                if(err) return res.status(500).json({error:err})
                res.status(200).json(account);
            });

        },

        update : (req,res) => {

            // console.log("\nUpdate() - Passed fourre to save = ", req.body)

            Account.findById(req.body._id)
                .exec( (err,foundAccount) => {
                    if(err) return res.status(500).json({error:err});
                    // console.log("\nAPI update - foundFourre = ", foundFourre)
                    if(!foundAccount || !foundAccount._id) {
                        // console.log(`Did not find any fourre to update with _id=${req.body._id}`.red);
                        return res.status(404).json({error:`Did not find any fourre to update with _id=${req.body._id}`});
                    }

                    foundAccount = Object.assign(foundAccount, req.body)
                    // console.log("\nToSave = ", foundFourre)
                    foundAccount.save((err) => {
                        if(err) return res.status(500).json({error:err})
                        res.status(200).end();
                    })
                });
        },

        delete : (req,res) => {
            Account.findByIdAndRemove( req.params.id)
                .exec( (err,deletedAccount) => {
                    if(err) return res.status(500).json({error:err})
                    res.status(200).json(deletedAccount);
                });
        }
    }
}

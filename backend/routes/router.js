const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const mongoose = require('mongoose')
require('dotenv').config();
const mongoDB_uri = process.env.MONGODB_URI;

mongoose.connect(mongoDB_uri, { //변화 있음
    useNewUrlParser: true,
    // useCreateIndex: true
    // useUnifiedTopology: true
});

const express = require('express');

const router = express.Router();

router.use(express.json());

const SetModel = require('../models/set.model');

router.put('/fetchWordSet', async (req, res) => {
    userId = req.body.userId;
    SetModel.find({ 'userId': userId }).then((data) => {
        res.json(data);
    }).catch((error) => {
        console.log(error.response.data);
    })
});

router.put('/fetchWordSetToEdit', async (req, res) => {
    wordSetId = req.body.id;
    SetModel.findById(wordSetId).then((data) => {
        console.log(data)
        res.json(data);
    }).catch((error) => {
        console.log(error.response.data);
    })
});

router.put('/createWordSet', async (req, res) => {
    data = req.body.data;
    const session = new SetModel(data);
    try {
        session.save();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }
});
// delete!!
router.put('/removeWordSet', async (req, res) => {
    const wordSetId = req.body.data;
    try {
        SetModel.findByIdAndRemove(wordSetId).exec();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }

});

router.put('/replaceWordSet', async (req, res) => {
    const idToDelete = req.body.idToDelete;
    const newWordSetData = req.body.data;
    const session = new SetModel(newWordSetData);

    try {
        SetModel.findByIdAndRemove(idToDelete).exec();
        session.save();
        res.send(true);
    } catch (err) {
        console.log(err);
        res.send(false);
    }

});

// router.put('/api/user', async (req,res) => {
//     const idToken = req.body.idToken;

//     if (idToken.length > 0) {
//         const ticket = await client.verifyIdToken({
//             idToken: idToken
//           });
//         if (typeof ticket === 'object') { //check if idToken is valid
//             const userEmail = ticket.getPayload().email;

//             UserModel.findOne({ email : userEmail }).then((data) => {
//                 res.json(data);
//             }).catch((error) => {
//                 console.log('error: ',error.response.data)
//             })
//         } else {
//             console.log('someone tried weired in /login . Time : ',new Date(), ' idToken : ',idToken,' email : ', req.body.userEmail);
//         }
//     }
// });



// router.post('/editNickname/:userId', async (req, res) => {
//     const nickname = req.body.nickname;
//     const userId = req.params.userId;

//     await UserModel.updateOne(
//         { googleId: userId},
//         { $set: { nickname: nickname }} 
//     );
//     res.send();
// })

// router.post('/editBio/:userId', async (req, res) => {
//     const bio = req.body.bio;
//     const userId = req.params.userId;
//     console.log(bio, userId)


//     await UserModel.updateOne(
//         { googleId: userId},
//         { $set: { bio: bio }} 
//     );
//     res.send();
// })

// router.post('/editWcaId/:userId', async (req, res) => {
//     const wcaId = req.body.wcaId;
//     const userId = req.params.userId;

//     await UserModel.updateOne(
//         { googleId: userId},
//         { $set: { wcaId: wcaId }} 
//     );
//     res.send();
// })



router.put('/queryUser', async (req, res) => {
    const id = req.body.googleId;

    try {
        UserModel.find({ 'id': id }, (err, that) => {
            console.log(that);
            // if (that.length > 0) {
            //     console.log('found that. pw is',that[0].pw);
            //     console.log(that);
            // } else {
            //     console.log("can't found that");
            // }
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/register', async (req, res) => {
    const idToken = req.body.idToken;

    if (idToken.length > 0) {
        const ticket = await client.verifyIdToken({
            idToken: idToken
        });
        if (typeof ticket === 'object') {
            const data = {
                profileUri: ticket.getPayload().picture,
                email: ticket.getPayload().email,
                userName: ticket.getPayload().name,
                joinedDate: Date.now(),
                //Customizaion
                nickname: req.body.nickname,
                profilePic: ticket.getPayload().picture,
                wcaId: ' ',
                bio: 'Express yourself',
            };

            try {
                const user = new UserModel(data)

                try {
                    user.save();
                    // res.send('uploaded');
                    console.log('Added new user.');

                } catch (err) {
                    console.log(err);
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('someone tried weired in /login . Time : ', new Date(), ' idToken : ', idToken, ' nickname : ', req.body.nickname);
        }
    }
})
// router.post('/login', async (req, res) => {
//     const userGoogleId = req.body.googleId;

//     try {
//         UserModel.find({'googleId' : userGoogleId}, (err, account)=> {
//             // console.log(account)
//             if (account.length > 0) {
//                 console.log('Already registered.');
//             } else {                
//                 const data = req.body;
//                 const user = new UserModel(data)

//                 try {
//                     user.save();
//                     // res.send('uploaded');
//                     console.log('Added new user.');

//                 } catch(err) {
//                     console.log(err);
//                 }
//                         }
//                     })
//         } catch(err) {
//             console.log(err);
//         }
// })

router.post('/validateNickname', async (req, res) => {
    const enteredNickname = req.body.enteredNickname;

    try {
        UserModel.find({ 'nickname': enteredNickname }, (err, account) => {
            if (account.length > 0) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    } catch (err) {
        console.log(err);
    }
})

router.post('/login-xhr', (req, res) => {
    console.log('from xhr : ', req);
})

router.put('/loginValidation', async (req, res) => {
    const idToken = req.body.idToken;
    if (idToken.length > 0) {
        const ticket = await client.verifyIdToken({
            idToken: idToken
        });
        if (typeof ticket === 'object') {
            res.send(true);
        } else {
            console.log('someone tried weired login process. Time : ', new Date(), ' idToken : ', idToken);
            res.send(false);
        }
    }
})

module.exports = router;
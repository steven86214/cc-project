const express = require('express');
const http = require('http');
const url = require('url');
const cors = require('cors');
const User = require('./config');
const { doc } = require('./config');
const app = express();
app.use(express.json());
app.use(cors());
// const server = http.createServer((req, res) => {
// if (req.url !== '/favicon.ico') {
//     const params = url.parse(req.url, true).query;
//     const ref = params.ref || '/';
//     const type = params.type || 'set';
//     const data = params.data;
//     switch (type) {
//         case 'push':
//             database.ref(ref).push(data).then(() => {
//                 res.status(200).send(`push data to "${ref}" ok`);
//                 firebase.app().delete();
//             });
//             break;
//         case 'set':
//             database.ref(ref).set(data).then(() => {
//                 res.status(200).send(`set data to "${ref}" ok`);
//                 firebase.app().delete();
//             });
//             break;
//         case 'read':
//             res.send("123");
//             // database.ref(ref).once('value', e => {
//             //     let dataObj = e.val();
//             //     let html = '';
//             //     for (let i in dataObj) {
//             //         html = `${html}<div>${dataObj[i]}</div>`;
//             //     }
//             //     console.log(e.val());
//             //     res.end(html);
//             // }).then(() => {
//             //     firebase.app().delete();
//             // });
//             break;
//         }
//     }
// });
app.get("/", async (req,res) =>{
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) =>( {id:doc.id, ...doc.data()}));
    res.send(list);
    // res.send("456");
})
app.post("/create",async(req,res)=>{
    const data = req.body;
    //console.log("Data of users", data);
    await User.add(data);
    res.send({msg:"User added"});
});

app.post("/update", async(req,res) =>{
    const id = req.body.id;
    // console.log("Before deleting ID ",req.body)
    delete req.body.id;
    // console.log("After deleting ID ",req.body)
    const data = req.body;
    await User.doc(id).update(data);
    res.send({msg : "updated"});
});
app.post("/delete", async(req,res) => {
    const id = req.body.id;

    delete req.body.id;

    await User.doc(id).delete();
    res.send({msg: "deleted"});
})

app.listen(4000, () => console.log("Up & Running *4000"));
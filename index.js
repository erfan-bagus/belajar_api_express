const express = require('express');
const app = express();
const http = require('http');
const port = 3000;
const server = http.createServer(app);
const bodyParser = require('body-parser')
// const formidable = require('express-formidable')
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })
var data = [
    {id:1,nama:"dini"},
    {id:2,nama:"rifa"},
    {id:3,nama:"andi"},
    {id:4,nama:"joko"},
];
// app.use(formidable());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.send('GET request to the homepage 1')
})

app.get('/json', (req, res) => {
    res.json({a:1})
})

app.get('/sendfile', (req, res) => {
    res.sendFile(__dirname+'/bg-meet.png')
})

app.get('/redirect', (req, res) => {
    res.redirect('https://www.google.com/')
})
let people = ['geddy', 'neil', 'alex'];
app.get('/render', (req, res) => {
    res.render('index.ejs',{people:people})
})

app.get('/api/get', (req, res) => {
    res.json(req.query.id?data.filter(item=>item.id==req.query.id):data)
})

app.post('/api/post', (req, res) => {
   
    if(!data.map(item=>item.nama).includes(req.body.nama)){
        data.push({id:data.length+1,nama:req.body.nama})
        console.log(data);
        res.json({
            message:"data berhasil di simpan",
            data:data
        }).status(201)
    }else{
        res.json({
            message:"tidak berhasil di simpan,nama siswa sudah ada",
            data:data
        }).status(204)
    }
})

app.put('/api/put', (req, res) => {
    let dt_siswa = data.findIndex(item=>item.id==parseInt(req.body.id))
    // console.log(dt_siswa);
   if(dt_siswa>=0){
    // let dt_siswa_index = data.findIndex(item=>item.id==req.body.id)
        data[dt_siswa].nama=req.body.nama;
        res.json({
            message:"data berhasil di ubah",
            data:data
        }).status(200)
   }else{
    if(!data.map(item=>item.nama).includes(req.body.nama)){
        data.push({id:data.length+1,nama:req.body.nama})
        console.log(data);
        res.json({
            message:"data berhasil di simpan",
            data:data
        }).status(201)
    }else{
        res.json({
            message:"tidak berhasil di simpan,nama siswa sudah ada",
            data:data
        }).status(204)
    }
   }
})

app.delete('/api/delete', (req, res) => {
    try {
        let dt_siswa = data.findIndex(item=>item.id==parseInt(req.body.id))
        data.splice(dt_siswa,1)
        res.json({
            message:"data berhasil di hapus",
            data:data
        }).status(200)
    } catch (error) {
        res.json({
            message:"data berhasil di hapus",
            data:data
        }).status(204)
    }

});

app.head('/api/head',(req, res)=>{
    // console.log()
    res.set(req.body);
    res.json({
        message:"berhasil set header"
    })
})

app.options('/api/options',(req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.send(200);
})

server.listen(port, function () {
    console.log('\x1b[33mExpress server listening on port : \x1b[32m' + port + '\x1b[0m');
});
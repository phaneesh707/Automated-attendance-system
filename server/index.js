import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import child from "child_process"
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use('/api/') 
// app.use('/api/') 


const URL = "mongodb+srv://chintu:chintu@cluster0.hywdppq.mongodb.net/test";
const PORT = 5000;
app.get('/', (req, res) => {

  var spn = child.spawn;
  var pro = spn("python", ["main1.py"]);

  var data1;
  pro.stdout.on("data", function (data) {
    data1 = data.toString();
    console.log(data1);
    res.send(data1);
  });


})
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running at port ${PORT}`))
  )
  .catch((err) => console.log(err));
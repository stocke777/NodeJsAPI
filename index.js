import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import path from 'path';
const __dirname = path.resolve();

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile("templates/home.html", options, function (err) {
      if (err) {
          res.send("cant find the file")
      } else {
          console.log('Sent:');
      }
  });
    // res.send("helo")
})

app.use('/users/', userRoutes);


app.listen(port, ()=> console.log(`Server running on PORT: ${port}`));
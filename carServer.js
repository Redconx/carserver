let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
var port = process.env.PORT||2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let {carMaster,cars}=require(`./carData`)

app.get("/cars",function(req,res){
  let fuel=req.query.fuel
  let type=req.query.type
  let sort=req.query.sort
  let minprice=req.query.minprice
  let maxprice=req.query.maxprice
  let arr1=cars
  console.log(fuel,type);
  if(fuel){
    arr1=arr1.filter(ele=>carMaster.find(cr=>cr.model===ele.model).fuel===fuel)
  }
  if(type){
    arr1=arr1.filter(ele=>carMaster.find(cr=>cr.model===ele.model).type===type)
  }
  if(minprice){
    arr1=arr1.filter(ele=>ele.price>=minprice)
  }
  if(maxprice){
    arr1=arr1.filter(ele=>ele.price<=maxprice)
  }
  if(sort){
    if(sort==="kms")arr1.sort((j1,j2)=>j1.kms-j2.kms)
    if(sort==="price")arr1.sort((j1,j2)=>j1.price-j2.price)
    if(sort==="year")arr1.sort((j1,j2)=>j1.year-j2.year)
  }
    res.send(arr1)
})
app.get("/cars/:id",function(req,res){
    let id=req.params.id
    let car=cars.find(ele=>ele.id===id)
    res.send(car)
})
app.get("/carMaster",function(req,res){
    res.send(carMaster)
})
app.post("/cars",function(req,res){
    let body=req.body
    cars.push(body)
    res.send(body)
})
app.delete("/cars/del/:id",function(req,res){
    let id=req.params.id
    console.log(id,"node");
    let index=cars.findIndex(ele=>ele.id===id)
    if(index>=0)cars.splice(index,1)
    res.send(cars)
})
app.put("/cars/:id",function(req,res){
    let id=req.params.id
    let body=req.body
    let index=cars.findIndex(ele=>ele.id===id)
    cars[index]=body
    res.send(body)
})
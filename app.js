import express from "express";
import bodyParser from "body-parser";
import request from "request";
import https from "https";


const app=express();

app.use('*/css',express.static('public/css'));
app.use('*/images',express.static('public/images'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile('signup.html',{root:'.'});
});

app.post("/",function(req,res){
     
   const firstName=req.body.fname;
   const LastName=req.body.lname;
   const Email=req.body.email;

   var data = {
       members:[
         {
            email_address: Email,
            status: "subscribed",
            merge_fields: {
               FNAME : firstName,
               LNAME :  LastName
            }

         }
       ]
   };

   var jsonData=JSON.stringify(data);
   
   const url="https://us21.api.mailchimp.com/3.0/lists/b28f7d2af1";
   const options = {
      method: "POST",
      auth: "abhi07:919013c9d785c10399d914b47a2c7c79-us21"
   }

  const request = https.request(url,options,function(response){

       if(response.statusCode===200){
         res.sendFile('success.html', {root: '.'});
       }
       else{
         res.sendFile('Failure.html',{ root: '.'});
       }


            response.on("data", function(data){
               console.log(JSON.parse(data));
            })
   });
   
   // request.write(jsonData);
   request.end();

});


app.post("/failure",function(req,res){
   res.redirect("/");
})







app.listen(3000,function(){
   console.log("server is started at 3000");
});

// 919013c9d785c10399d914b47a2c7c79-us21
// b28f7d2af1
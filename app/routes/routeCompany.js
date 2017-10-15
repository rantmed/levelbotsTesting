var CompanyModel = require('../models/companyModel');

module.exports = function (app) {

app.get("/companies", function(req, res) {
    //var companyObject = db.getCollection('companies').find();    
  
        var query = CompanyModel.find();
        query.select("name homepage_url _id")
        
        query.exec(function (err, data) {
            if (err) return console.error(err);
            res.json(data);
            res.end();
        });
    
}); 

app.get("/company/:id", function(req, res) {
    console.log(req.params.id);
    var ObjectId = require('mongoose').Types.ObjectId;
    var id  = req.params.id;
    var query = CompanyModel.findOne({_id: ObjectId(id)});    
    
    query.exec(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
        res.end();
    });
});


app.get("/company/:id/products", function(req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var id  = req.params.id;
    var query = CompanyModel.findOne({_id: ObjectId(id)});       
    query.select("products");
    
    query.exec(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
        res.end();
    });
});

app.post("/company/:id/products", function(req, res) {

    var ObjectId = require('mongoose').Types.ObjectId;
    var id  = req.params.id;
    CompanyModel.findOne( function(err, data){
        console.log(data);
        if (err) return console.error(err);
        data.name = data.name.concat(req.query.name)        
        data.save(function(err){
            if(err) throw err;
        })
        res.status(201);
        res.json(data);
        res.end();
    }).where("id").equals({_id: ObjectId(id)});

});



app.get("/company/:id/members", function(req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    var id  = req.params.id;
    var query = CompanyModel.findOne({_id: ObjectId(id)});     
    query.select("relationships")
    
    query.exec(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
        res.end();
    });
});

//POST - Insert a new TVShow in the DB
app.post("/company", function(req,res){
    console.log('POST');
    console.log(req.body);

    let companyModel = new CompanyModel(req.body);  
    companyModel.save(function(err, companyModel) {
        if(err) return res.status(500).send( err.message);
    res.status(200).json(companyModel);
    });

});

//PUT - Update a register already exists
app.put("/company/:id", function(req,res){
    CompanyModel.findById(req.params.id, function(err, companyModel) {
        companyModel.name  = req.body.name;

        companyModel.save(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).json(companyModel);
        });
    });
});


//DELETE - Delete a TVShow with specified ID
app.delete("/company/:id", function(req,res){
    var ObjectId = require('mongoose').Types.ObjectId;
    var id  = req.params.id;
    var query = CompanyModel.findOneAndRemove({_id: ObjectId(id)}, function(err) {
        query.exec(function (err, data) {
        if (err) return console.error(err);
        res.json(data);
        res.end();
    });
    });
});


};


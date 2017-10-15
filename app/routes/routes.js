module.exports = function (app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    

    //Página de posts


app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
  //It will find and locate index.html from View or Scripts
});

/*app.get("/companies", function (req, res) {
        res.sendFile(__dirname +"/index.html");
    })*/

};




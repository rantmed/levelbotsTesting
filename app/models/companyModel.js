// cargamos lo que vamos a necesitar
var mongoose = require('mongoose');

var companiesSchema = new mongoose.Schema({  
     _id: {
            str: String, 
            isObjectId: Boolean }, 
     name: String, 
     permalink: String, 
     crunchbase_url: String, 
     homepage_url: String, 
     blog_url: String, 
     blog_feed_url: String, 
     twitter_username: String, 
     category_code: String, 
     number_of_employees: Number,
     founded_year: Number, 
     founded_month: Number, 
     founded_day: Number, 
     deadpooled_year: Number, 
     tag_list: String, 
     alias_list: String, 
     email_address: String, 
     phone_number: String, 
     description: String, 
     created_at: Object, 
     updated_at: String, 
     overview: String, 
     image: Object, 
     products: { 
             name: String, 
             permalink: String 
             },         

     relationships: {             
             is_past: Boolean ,
             title: String ,
             person:  
                 {first_name: String,
                 last_name: String, 
                 permalink: String}
            },
     competitions: Object,         
     providerships: Object,
     total_money_raised: String ,
     funding_rounds: Object,         
     investments: Object,
     acquisition:{
         price_amount: Number, 
         price_currency_code: String, 
         term_code: String, 
         source_url: String, 
         source_description: String, 
         acquired_year: Number, 
         acquired_month: Number, 
         acquired_day: Number, 
         acquiring_company: {
             name: String, 
             permalink: String,
             }
         },  
     acquisitions: Object,
     offices: Object,         
     milestones: Object,         
     video_embeds: Object,
     screenshots: Object,        
     external_links: Object,        
     partners: Object
    
});


 module.exports = mongoose.model('Company', companiesSchema);

  

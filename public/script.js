

var $companies = $('#send');
var $publication = $('#publication');


$companies.on("click", function (e){
e.preventDefault();
showData() 
});
 //función que inicia el primer paso asignando a component CPU, que será utilizado más adelante
function showData() {

	console.log("hola");

    $.get('http://localhost:3000/companies/', function(response) { 

        response.forEach(function (eachResponse) { //recorre todos los objetos existentes guardados en la base de datos, response son todos los objetos y eachResponse es cada uno de los objetos

            var card = $('<div></div>');
            card.attr('class', 'item');
            card.attr('id', eachResponse._id);
            $('#publication').append(card);

            var companiesList = $('<div></div>');
            companiesList.attr('class', 'content');                       

            var productButton = $('<button></button>');
            productButton.attr('class','right floated ui button product');
            productButton.attr('id','products'+eachResponse._id);
            productButton.text('Ver productos');
           
           
            var membersButton = $('<div></div>');
            membersButton.attr('class','right floated ui button members');
            membersButton.attr('id','members'+eachResponse._id);
            membersButton.text('Ver miembros de la empresa');
            

            var updateButton = $('<div></div>');
            updateButton.attr('class','right floated ui button');
            updateButton.attr('id','update'+eachResponse._id);
            updateButton.text('Actualizar datos de la empresa');
            $('#updateButton').on('click', updateData);

            var deleteButton = $('<div></div>');
            deleteButton.attr('class','right floated ui button delete');
            deleteButton.attr('id', 'delete'+eachResponse._id );           
            deleteButton.text('Borrar datos de la empresa');

            var objectButton = $('<div></div>');
            objectButton.attr('class','right floated ui button object');
            objectButton.attr('id', 'object'+eachResponse._id );           
            objectButton.text('Ver todos los datos de la empresa');

            var newProductButton = $('<div></div>');
            newProductButton.attr('class','right floated ui button newProduct');
            newProductButton.attr('id', 'newProduct'+eachResponse._id );           
            newProductButton.text('Añadir nuevo producto');
            
            card.append(companiesList);
            card.append(objectButton);
            card.append(deleteButton);
            card.append(updateButton);
            card.append(productButton);
            card.append(newProductButton);
            card.append(membersButton);
            

            for (var item in eachResponse) { //recorre cada propiedad del objeto para meterla en un li
                componentList = $('<p></p>');
                componentList.attr("class", item);
                componentList.text(eachResponse[item]);
                companiesList.append(componentList);
            }
        })

        console.log(Object.keys(response).length);

        $('.delete').on('click', deleteCompany);
        $('.members').on('click', showMembers);
        $('.product').on('click', showProducts);
        $(".object").on("click", showObject);
        $(".newProduct").on("click", addProduct);


	})
}

function showObject(){

    var type =  $(this).parent().attr('id');
    var padre = $(this).parent();
    
    
    console.log(type);          

    $.get('http://localhost:3000/company/'+ type , function getObject(respon) {
      var salida = '';
      for (var p in respon) {
      salida += p + ': ' + respon[p] + 'n' }
        var carta = $('<div></div>');
          carta.attr('class', 'card-container');
          carta.text(salida);
          padre.append(carta);
        console.log(typeof(respon));
      });

}

function showProducts(){
	var type = $(this).parent().attr('id');
  var padre = $(this).parent();
  //carta.empty();
	console.log(type);
	$.get('http://localhost:3000/company/'+ type+'/products' , function getProducts(response) {
    
    var product = response.products;
    product.forEach(function (eachProduct){

     var carta = $('<div></div>');
          carta.attr('class', 'ul-list style-list');
          carta.text(eachProduct.name);
          padre.append(carta);

    console.log(typeof(product));
    console.log(product);

	})
})
};


function showMembers (){
	var type = $(this).parent().attr('id');
  var padre = $(this).parent();
  //carta.empty();
	console.log(type);
	$.get('http://localhost:3000/company/'+ type+'/members' , function getMembers(response) {
    var product = response.relationships;
    product.forEach(function (eachMember){

     var carta = $('<div></div>');
          carta.attr('class', 'ul-list style-list');
          carta.text(eachMember.person.first_name + eachMember.person.first_name +': '+ eachMember.title);
          padre.append(carta);
	console.log(response);
	
	})
})
}

function updateData (){
	var type = $(this).parent().attr('id');
	console.log(type);
	$.get('http://localhost:3000/company/'+ type+'/members' , function getMembers(response) {
	console.log(response);
	
	})
}

$('#btnAddUser').on('click', addCompany); 

function addCompany (){
	var type = $(this).parent().attr('id');
	
	   var newCompany = {
     '_id': {
	            str: $('#inputID').val(), 
	            isObjectId: 'True' 
	        },
	  'products': { 
             name: $('#inputProducts').val(), 
             permalink: $('#inputProducts').val() 
             },         

     'relationships': {             
             is_past: 'False' ,
             title: 'CEO' ,
             person:  
                 {first_name: $('#inputMembers').val(),
                 last_name: $('#inputMembers').val(), 
                 permalink: $('#inputMembers').val()}
            },        

        'name': $('#inputName').val(),
        'homepage_url': $('#inputUrl').val()
    }

console.log(newCompany);
	$.post('http://localhost:3000/company',newCompany ,function (response) {		

    alert('Empresa añadida');
         $publication.empty();
         showData();	
	}
)
}


function addProduct (){
  var type = $(this).parent().attr('id');
   var padre = $(this).parent()

       var carta = $('<input></input>');
          carta.attr('type', 'text');
          carta.attr('id', 'inputNewProducts');
          carta.attr('placeholder', 'field');
          padre.append(carta);

      var addButton = $('<button></button>');
          addButton.attr('class', 'ui button');
          addButton.attr('id', 'addButton');
          addButton.text('Añadir');        
          padre.append(addButton);
          
      $("#addButton").on("click", addNewProduct);
}



function addNewProduct () {

  var type = $(this).parent().attr('id');

        var newProduct = {

    'name': $('#inputNewProducts').val() }

console.log(newProduct);

  $.post('http://localhost:3000/company/'+ type+'/products', newProduct , function getProducts(response) {

alert('Empresa añadida');
})


}



function deleteCompany (event){

	event.preventDefault();	

	var clase = $(this).parent().attr('class');

	var buttonClicked = $(event.target).attr('id');

	var thenum = buttonClicked.replace( /^\D+/g, '');

	var type = $(this).parent().attr('id');



		if (thenum === type ){
	
	var removeClase = $(this).parent().addClass('hidden');

	
	$.ajax({
	    url: 'http://localhost:3000/company/'+ type ,
	    type: 'DELETE',
	    success: function(result) {
	    	
	    	alert('Empresa borrada');
         $publication.empty();
         showData();
	        // Do something with the result
	    }
	});
	}

	else {console.log("Error al borrar la empresa")}
}





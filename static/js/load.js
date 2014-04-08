/**
 * Created with JetBrains PhpStorm.
 * User: alfredo
 * Date: 20/03/14
 * Time: 17:25
 * To change this template use File | Settings | File Templates.
 */

var serieslyAPI = {
    //credenciales
    app_ID: 2178,
    app_secret: "TX7hZNhWKbehh4fKUbvX",

    auth_token: "", //token de autorización

    base_url: "http://api.series.ly/v2/", //para peticiones a la API

    authenticate: function (){
        //http://api.series.ly/v2/auth_token/?id_api={id_api}&secret={secret}
        var request_url = this.base_url+"auth_token/?id_api="+this.app_ID+"&secret="+this.app_secret;
        $.ajax({
            url: request_url //solicita el contenido de la página
        }).done(function(data){
                if (data['error'] == 0){//success
                    this.auth_token = data['auth_token']; //guarda el token
                }else{
                    alert("No se ha podido inicializar la API de series.ly: "+data['errorMessage']);
                }
            })
    }

}

function init(){
    initAPIs();
    initForms();
    initLinks();
};

function initAPIs(){
    serieslyAPI.authenticate();
}

function initForms(){
    $("form").on('submit',function(e){
        e.preventDefault();
        var form = $(this).serializeArray();
        var data = {};
        form.forEach(function(object){
            data[object.name] = object.value;
        })

        var formName = $(this).attr("name");
        if (formName == "search-youtube"){
            searchYoutube(data);
        }else if(formName == "search-persons"){
            requestCustomerInfo(data);
        }else{
            alert("No se ha podido enviar el formulario");
        }
    });
};

function initLinks(){


    /**
     * Habilita la navegación interna por ajax salvo cuando es a la 'home', para recargar
     * solo el contenido principal y usar 'index.html' a modo de plantilla.
     * El atributo data-url-type indica si la navegación es dentro de la
     * misma web("internal") o si se trata de un enlace externo("external")
     * El contenido dinámico(el contenido de cada página) se incrusta
     * siempre en la sección #main
     */
    $("a[href!='/'][data-url-type='internal']").on('click',function(e){
        e.preventDefault();
        $.ajax({
            url: $(this).attr("href") //solicita el contenido de la página
        }).done(function(data){
                $("#main").html(data); //carga el contenido en la sección #main
            }).fail(function(){
                var html = $.parseHTML("<p>No se encuentra la página solicitada</p>"); //TODO: sustituir por una página de error
                $("#main").html(html);
            }).always(function(){
                init(); //refresca los elementos
            })
    })
};


// realiza una búsqueda en youtube con los datos pasados por parámetros
function searchYoutube(data) {
    data['part'] = 'id,snippet'; //añade el parametro obligatorio para cualquier petición
    var request = gapi.client.youtube.search.list(data);
    request.execute(function(response) {
        var str = JSON.stringify(response.result);
        $('#resultados').html(str); //carga el resultado de la búsqueda en #resultados
    });
}

function requestCustomerInfo(data) {    <!-- A continuaci�n a�adimos este identificador a la cadena "GetCustomerData.php?id=" para crear la URL completa , y la cargamos en la pagina actual-->
//    document.location="procesadorXSL.php?artista=" + sId;

    $.ajax({
        url: "procesadorXSL.php", //solicita el contenido de la página
        data: data
    }).done(function(data){
            $("#resultados").html(data); //carga el contenido en la sección #main
        }).fail(function(){
            var html = $.parseHTML("<p>No se encuentra la página solicitada</p>"); //TODO: sustituir por una página de error
            $("#resultados").html(html);
        }).always(function(){
            init(); //refresca los elementos
        })
}


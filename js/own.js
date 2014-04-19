/**
 * Created with JetBrains PhpStorm.
 * User: alfredo
 * Date: 20/03/14
 * Time: 17:25
 * To change this template use File | Settings | File Templates.
 */
// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
//var OAUTH2_CLIENT_ID = '157761386106.apps.googleusercontent.com';
//var API_KEY = 'AIzaSyA_32yjaPOmjs_8x0trtPH5vKT41pivkrw';
//var OAUTH2_SCOPES = [
//    'https://www.googleapis.com/auth/youtube'
//];
//
//function loadApiClient(){
//    gapi.client.setApiKey(API_KEY);
//    loadAPIClientInterfaces();
//}
//
//// Load the client interfaces for the YouTube Analytics and Data APIs, which
//// are required to use the Google APIs JS client. More info is available at
//// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
//function loadAPIClientInterfaces() {
//    gapi.client.load('youtube', 'v3', function() {
//        console.log("youtube API loaded");
//    });
//}

var youtubeAPI = {
    // The client ID is obtained from the {{ Google Cloud Console }}
    // at {{ https://cloud.google.com/console }}.
    // If you run this code from a server other than http://localhost,
    // you need to register your own client ID.
    OAUTH2_CLIENT_ID: '157761386106.apps.googleusercontent.com',
    API_KEY: 'AIzaSyA_32yjaPOmjs_8x0trtPH5vKT41pivkrw',
    OAUTH2_SCOPES: ['https://www.googleapis.com/auth/youtube'],
    loadApiClient: function(){
        gapi.client.setApiKey(this.API_KEY);
        this.loadAPIClientInterfaces();
    },
    // Load the client interfaces for the YouTube Analytics and Data APIs, which
    // are required to use the Google APIs JS client. More info is available at
    // http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
    loadAPIClientInterfaces: function(){
        gapi.client.load('youtube', 'v3', function() {
            console.log("youtube API loaded");
        });
    }
}

var serieslyAPI = {
    //credenciales
    app_ID: 2178,
    app_secret: "TX7hZNhWKbehh4fKUbvX",

    auth_token: null, //token de autorización
    base_url: "http://api.series.ly/v2/", //para peticiones a la API

    authenticate: function (){
        //http://api.series.ly/v2/auth_token/?id_api={id_api}&secret={secret}
        var request_url = this.base_url+"auth_token/?id_api="+this.app_ID+"&secret="+this.app_secret;
        $.ajax({
            url: request_url //solicita el contenido de la página
        }).done(function(data){
                if (data['error'] == 0){//success
                    this.auth_token = data['auth_token']; //guarda el token
//                    console.log("series.ly API loaded");
                    return this.auth_token;
                }else{
//                    console.log("No se ha podido inicializar la API de series.ly: "+data['errorMessage']);
                    return false;
                }
            })
    },

    //método para realizar una búsqueda
    //query: texto a buscar
    //dest: contenedor donde se cargan los resultados
    search: function (query,dest){
        var method = "search";
        var request_url = this.base_url+method;
        var data = {
            filter: 2, //peliculas
            response: 'xml',
            auth_token: 'e192f14210ab13996939a274922e2b16', //todo: quitar token provisional y calcular otro
            q: query
        }

        $.ajax({
            url: request_url, //solicita el contenido de la página
            data: data
        }).done(function(resultsXML){
                //TODO: procesar el xml
                console.log("resultado de la búsqueda:");
                var string = (new XMLSerializer()).serializeToString(resultsXML);
                $("#resultados").html(string);
            })




    }

}

function init(){
    loadSeriesly();
    initForms();
    initLinks();
    initInterface();
};

function loadSeriesly(){
    if (serieslyAPI.auth_token == null){
        serieslyAPI.authenticate();
    }
}

//carga la API de youtube
function loadYoutube(){
    youtubeAPI.loadApiClient();
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
        }else if(formName == "search-series"){
            searchSeries(data);
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

function initInterface(){
    //carga la lista de generos
    $.ajax({
        url: "generos.php" //solicita el contenido de la página
    }).done(function(data){
            $("nav").html(data); //carga las categorias
        })
}


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

function searchSeries(data){
    var dest = $("#resultados");
    serieslyAPI.search(data['query'],dest);
}


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
    mediaTypeMovie: 2,
    base_url: "http://api.series.ly/v2/", //para peticiones a la API

    authenticate: function (){
        //si no hay 'auth_token' se solicita
        if (getCookie("auth_token") == ""){
            //http://api.series.ly/v2/auth_token/?id_api={id_api}&secret={secret}
            var request_url = this.base_url+"auth_token/?id_api="+this.app_ID+"&secret="+this.app_secret;
            $.ajax({
                url: request_url, //solicita el contenido de la página
                async: false
            }).done(function(data){
                    if (data['error'] == 0){//success
                        setCookie("auth_token",data['auth_token'],data['auth_expires_date']); //guarda el token en una cookie
                    }else{
                        console.log("No se ha podido inicializar la API de series.ly: "+data['errorMessage']);
                    }
                })
        }
    },

    //método para realizar una búsqueda
    //query: texto a buscar
    //page: página de resultados (0-index)
    //dest: contenedor donde se cargan los resultados
    search: function (query,page,dest){
        var method = "search";
        var request_url = this.base_url+method;
        var data = {
            filter: this.mediaTypeMovie, //peliculas
            response: 'xml',
            auth_token: getCookie("auth_token"),
            q: query,
            limit: 15, //resultados por página
            page: page
        }

        $.ajax({
            url: request_url, //solicita el contenido de la página
            data: data
        }).done(function(resultsXML){// se ha recibido el resultado de la búsqueda en series.ly
                $.ajax({
                    url: "resultPelisXSL.php", //solicita la vista de los resultados
                    data: resultsXML,
                    type: 'POST',
                    processData: false //para pasar 'data' como un objeto (sin pre-procesarlo)
                }).done(function(data){
                    dest.html(data);
                }).always(function(){
                    init(); //refresca los elementos
                })
            })
    },
    /**
     * método para solicitar las películas más vistas
     * dest: contenedor de destino
     */
    browsePopular: function (dest,mode){
        var method = "media/most_seen/movies";
        var request_url = this.base_url+method;
        var data = {
            auth_token: getCookie("auth_token"),
            limit: 10,
            response: 'xml'
        }

        $.ajax({
            url: request_url, //solicita el contenido de la página
            data: data
        }).done(function(resultsXML){// se ha recibido el resultado de la búsqueda en series.ly
                $.ajax({
                    url: "resultPelisXSL.php", //solicita la vista de los resultados
                    data: resultsXML,
                    type: 'POST',
                    processData: false //para pasar 'data' como un objeto (sin pre-procesarlo)
                }).done(function(data){
                        dest.append(data);
                }).always(function(){
                    init(); //refresca los elementos
                })
            })
    },
    /**
     * Obtiene toda la información sobre una película
     * @param id (idm) de la película
     */
    getInfo: function(id){
        var method = "media/full_info";
        var request_url = this.base_url+method;
        var data = {
            auth_token: getCookie("auth_token"),
            idm: id,
            mediaType: this.mediaTypeMovie,
            response: 'xml',
            iso_country: "ISO 3166-1 alpha-2"
        }

        $.ajax({
            url: request_url, //solicita el contenido de la página
            data: data
        }).done(function(resultsXML){// se ha recibido el resultado de la búsqueda en series.ly
                console.log("respuesta ficha");
                $.ajax({
                    url: "fichaPeli.php", //solicita la vista de los resultados
                    data: resultsXML,
                    type: 'POST',
                    processData: false //para pasar 'data' como un objeto (sin pre-procesarlo)
                }).done(function(data){
                        console.log("ver ficha");
                        console.log(data);
                    $("#main .contenido").html(data);
                }).always(function(){
                        init();
                    })
            })
    }

}


function init(){
    loadSeriesly();
    initForms();
    initInterface();
    initLinks();
};

function loadSeriesly(){
    serieslyAPI.authenticate();
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

    /**
     * Habilita la navegación por páginas en la búsqueda de series.
     * Repite la búsqueda con los datos del formulario indicando la página deseada.
     */
    $(".pagination a.page").not(".current").on("click",function(e){
        e.preventDefault();
        var page = $(this).attr("data-page-index"); //obtiene el indice de la página
        var form = $("form").serializeArray(); //lee los datos del formulario
        var data = {};
        form.forEach(function(object){ //reestructura los datos para la petición
            data[object.name] = object.value;
        })
        searchSeries(data,page); //realiza la búsqueda de la página indicada
    })

    var paginas = $(".pagination a.page").not(".next").not(".prev"); //paginas 1..actual..n
    var current = paginas.filter(".current");

    var anteriores = paginas.filter(function(){
       return parseInt($(this).attr("data-page-index")) < parseInt(current.attr("data-page-index"));
    });
    if (anteriores.length > 5){
        for(var i=2;i<anteriores.length-2;i++){
            anteriores.filter(":eq("+i+")").hide();
        }
        $("<a href='#' class='page collapse'>...</a>").insertAfter(anteriores.filter(":eq(1)"));
    }


    var siguientes = paginas.filter(function(){
        return parseInt($(this).attr("data-page-index")) > parseInt(current.attr("data-page-index"));
    });
    if (siguientes.length > 5){
        for(var i=2;i<siguientes.length-2;i++){
            siguientes.filter(":eq("+i+")").hide();
        }
        $("<a href='#' class='page collapse'>...</a>").insertAfter(siguientes.filter(":eq(1)"));
    }


    /**
     * Navega a la ficha completa de la película
     */
    $("div.lista-peliculas > div.resumen-pelicula").on("click",function(){
        var $idm= $(this).attr("id");
        serieslyAPI.getInfo($idm);
    })

     /**
     * Habilita la navegación mediante la barra de menu.
     *//*
     $("nav ul li ").on("click", function(e){
     	e.preventDefault();
     	$.ajax({
            url: $(this).attr("id").concat(".html") //solicita el contenido de la página
        }).done(function(data){
                $("#main").html(data); //carga el contenido en la sección #main
            }).fail(function(){
                var html = $.parseHTML("<p>No se encuentra la página solicitada</p>"); //TODO: sustituir por una página de error
                $("#main").html(html);
            }).always(function(){
                init(); //refresca los elementos
            })

     })

     /**
     * Habilita la navegación por categorias.
     */
     $("#categorias ul li").on("click", function(e){
     	e.preventDefault();
     	console.log("algo");
     	$.ajax({
            url: $(this).attr("id").concat(".html") //solicita el contenido de la página
        }).done(function(data){
                $("#main").html(data); //carga el contenido en la sección #main
            }).fail(function(){
                var html = $.parseHTML("<p>No se encuentra la página solicitada</p>"); //TODO: sustituir por una página de error
                $("#main").html(html);
            }).always(function(){
                init(); //refresca los elementos
            })

     })
}

function initInterface(){
    loadGenres();
    loadContent();
    setAnimations();
    setStyles();
}

function loadGenres(){
        //carga la lista de generos
        $.ajax({
            url: "generos.php" //solicita el contenido de la página
        }).done(function(data){
                $("nav ul.generos").html(data); //carga las categorias
            })
}

function loadContent(){
    var mostSeenSelector = "#most-seen";
    if ($(mostSeenSelector).is(':empty')) serieslyAPI.browsePopular($(mostSeenSelector)); //carga el contenido si está vacío
}


function setAnimations(){
    //animación de 'fade in' de la descripción de la película
    $("div.resumen-pelicula").mouseenter(function(){
        $(this).find("div.info-pelicula").fadeIn();
    }).mouseleave(function(){
        $(this).find("div.info-pelicula").fadeOut();
    })

//    $("div#buscador form[name='search-series'] input[type='text']").focus(function(){
//        $(this).animate({"width": "100px"},500);
//    });
//
//    $("div#buscador form[name='search-series'] input[type='text']").focusout(function(){
//        $(this).animate({"width": "50px"},500,function(){$(this).css});
//    });
}

function setStyles(){
    $("tr:odd").addClass("odd");
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

function searchSeries(data,page){
    var p = page || 0;
    var dest = $("#main .contenido");
    serieslyAPI.search(data['query'],p,dest);
}

function setCookie(cname,cvalue,expDate)
{
    var d = new Date(expDate*1000);
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}


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
            checkNavigation();
        });
    }
}

var serieslyAPI = {
    //credenciales
    app_ID:  2178, //2458
    app_secret: "TX7hZNhWKbehh4fKUbvX", //cteErTypg7ursNpnb26y
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
                        $(".contenido .lista-peliculas").attr("data-filter", "search");
                }).always(function(){
                    init(); //refresca los elementos
                })
            })
    },
    /**
     * método para solicitar las películas más vistas
     * dest: contenedor de destino
     */
    browsePopular: function (dest){
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
                        dest.html(data);
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
                $.ajax({
                    url: "fichaPeli.php", //solicita la vista de los resultados
                    data: resultsXML,
                    type: 'POST',
                    processData: false //para pasar 'data' como un objeto (sin pre-procesarlo)
                }).done(function(data){
                    $("#main .contenido").html(data);
                    var titulo = $("#ficha-pelicula .titulo-pelicula").text();
                    var dataYoutube={
                        "q": "trailer "+titulo,
                        "type": "video"
                    };
                    searchYoutube(dataYoutube);
                }).always(function(){
                        init();
                    })
            })
    },

    buscarGenero: function(genero,page,dest){
        $("#main .error").remove();
		var method = "media/browse";
        var request_url = this.base_url+method;
        var data = {
            auth_token: getCookie("auth_token"),
            genre: genero,
            mediaType: this.mediaTypeMovie,
            response: 'xml',
            iso_country: "ISO 3166-1 alpha-2",
            page: page,
            limit: 24
        }
 	$.ajax({
            url: request_url, //solicita el contenido de la página
            data: data
        }).done(function(data){
			$.ajax({
        	            url: "searchGeneroXSL.php", //solicita la vista de los resultados
        	            data: data,
        	            type: 'POST',
        	            processData: false //para pasar 'data' como un objeto (sin pre-procesarlo)
        	        }).done(function(data){
        	                dest.html(data);
                                $(".contenido .lista-peliculas")
                                    .attr({"data-genre": genero,
                                        "data-filter": "genre"}
                                );
        	        }).always(function(){
        	            init(); //refresca los elementos
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

function checkNavigation(){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    query = {};
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        query[pair[0]] = pair[1];
    }

    //ficha película
    if (query.hasOwnProperty("movie")){
        serieslyAPI.getInfo(query['movie']);
    }

}


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
        var resultados = $(".contenido .lista-peliculas");
        if (resultados.attr("data-filter") == "search"){
            var form = $("form").serializeArray(); //lee los datos del formulario
            var data = {};
            form.forEach(function(object){ //reestructura los datos para la petición
                data[object.name] = object.value;
            });
            searchSeries(data,page); //realiza la búsqueda de la página indicada
        }else if (resultados.attr("data-filter") == "genre"){
            console.log("pag genero");
            var genero = resultados.attr("data-genre");
            serieslyAPI.buscarGenero(genero,page,$(".contenido"));
        }
    });

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
        var url = window.location.protocol+"//"+window.location.host+"/~tm28/";  //window.location.href;
		url += '?movie='+$idm;
        window.location.href = url;
    })

    /**
     * Muestra el video en un pop-up
     */
    $("#youtube-related a.video").on("click",function(e){
        e.preventDefault();
        var id = $(this).attr("id");
        youtubePopUp(id);
    })

     /**
     * Habilita la búsqueda por categorias en el menu.
     */
	$("ul.generos").on("click","li.genero",function(e){
		console.log($(this));
		serieslyAPI.buscarGenero($(this).attr("id"),0,$(".contenido"));
	})

     /**
     * Habilita la navegación por las opciones del menu.
     */
     $(".mitem").on("click", function(e){
     	e.preventDefault();
     	var id = $(this).attr("id");
     	switch(id){
     		case "cinemedia":
     			$.ajax({url: "cinemedia.html"}).done(function(data){
					$("#main").html(data)		     			
     			})
     			break;
     			
     		case "inicio":
				var url = window.location.protocol+"//"+window.location.host+"/~tm28/";
				window.location.href = url;
				break;
			
		case "rss":
     			
     			break;

		default:
			var html = $.parseHTML("<p>No se encuentra la página solicitada</p>"); 
			$("#main").html(html);
     	}

     })
	 
	 /**
	 * Muestra o esconde las categorias
	 **/
	
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

    var content = ".contenido";
    if ($(content).is(':empty')) serieslyAPI.buscarGenero("",0,$(content));
}


function setAnimations(){
    //animación de 'fade in' de la descripción de la película
    $("div.resumen-pelicula").mouseenter(function(){
        $(this).find("div.info-pelicula").fadeIn();
    }).mouseleave(function(){
        $(this).find("div.info-pelicula").fadeOut();
    })
}

function setStyles(){
    $("tr:odd").addClass("odd");
}

// realiza una búsqueda en youtube con los datos pasados por parámetros
function searchYoutube(data) {
    console.log("buscando en youtube...");
    data['part'] = 'id,snippet'; //añade el parametro obligatorio para cualquier petición
    var request = gapi.client.youtube.search.list(data);
    request.execute(function(response) {
        var str = JSON.stringify(response.result);
        var x2js = new X2JS();
        var xml = "<youtube>"+x2js.json2xml_str($.parseJSON(str))+"</youtube>";
        console.log(xml);
        $.ajax({
            url: "relatedYoutube.php", //solicita la vista de los resultados
            data: xml,
            type: 'POST',
            processData: false //para pasar 'data' como un objeto (sin pre-procesarlo)
        }).done(function(data){
                $("#youtube-related").html(data);
            }).always(function(){
                init(); //refresca los elementos
            })
    });
}

function searchSeries(data,page){
    var dest = $("#main .contenido");
    serieslyAPI.search(data['query'],page,dest);
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

function youtubePopUp(videoID){
    //crea y añade el pop up
    $("body").prepend($.parseHTML(
        "<div id='pop-up'>" +
            "<iframe allowfullscreen webkitallowfullscreen mozallowfullscreen width='640' height='360'" +
            "src='http://www.youtube.com/embed/"+videoID+"?theme=light' >" +
           "</iframe>" +
        "</div>"
    ));

    $("#pop-up").on("click",function(e){
        $(this).remove();
    })

}

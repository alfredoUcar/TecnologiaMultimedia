/**
 * Created with JetBrains PhpStorm.
 * User: alfredo
 * Date: 20/03/14
 * Time: 17:25
 * To change this template use File | Settings | File Templates.
 */

function init(){
    initForms();
    initLinks();
};

function initForms(){
    $("form").on('submit',function(e){
        e.preventDefault();
        var form = $(this).serializeArray();
        var data = {};
        form.forEach(function(object){
            data[object.name] = object.value;
        })
        searchYoutube(data);
    });
};

function initLinks(){

    //navegación por ajax salvo cuando es a la 'home' para recargar
    //solo el contenido principal y usar 'index.html' como plantilla
    $("a[href!='/']").on('click',function(e){
        e.preventDefault();
        $.ajax({
            url: $(this).attr("href")
        }).done(function(data){
                $("#main").html(data);
            }).fail(function(){
                var html = $.parseHTML("<p>No se encuentra la página solicitada</p>"); //TODO: sustituir por una página de error
                $("#main").html(html);
            }).always(function(){
                init(); //refresca los elementos
            })

    })
};


// Search for a specified string.
function searchYoutube(data) {
    var q = data['query'];
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: q
    });

    request.execute(function(response) {
        console.log(response);
        var str = JSON.stringify(response.result);
        $('#resultados').html(str);
    });
}

function handleAPILoaded() {
    console.log("API loaded!!");
}


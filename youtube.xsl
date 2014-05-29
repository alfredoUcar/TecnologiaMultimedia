<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="youtube">
        <h3>Trailers</h3>
        <xsl:apply-templates select="items"/>
    </xsl:template>


    <xsl:template match="items">
        <div class="video">
            <img src="{snippet/thumbnails/medium/url}" />
            <p><xsl:value-of select="snippet/title"/></p>
        </div>
    </xsl:template>

</xsl:stylesheet>

<!--
<youtube>
<kind>youtube#searchListResponse</kind>
<etag>&quot;bvxF-DWHx1toJotsdJBeCm43SLs/c9s71wsPW_E1RJUQ-h9NC05palM&quot;</etag>
<nextPageToken>CAUQAA</nextPageToken>
<pageInfo>
    <totalResults>17424</totalResults>
    <resultsPerPage>5</resultsPerPage>
</pageInfo>
<items>
    <kind>youtube#searchResult</kind>
    <etag>&quot;bvxF-DWHx1toJotsdJBeCm43SLs/wDmxzdjaRAK0H6P2khkVXg7ag&quot;</etag>
    <id>
        <kind>youtube#video</kind>
        <videoId>P59fZy9Muo0</videoId>
    </id>
    <snippet>
        <publishedAt>2012-02-07T18:27:23.000Z</publishedAt>
        <channelId>UC5gF4Df71whKV1ZOS4OZcvQ</channelId>
        <title>El Hobbit : Un Viaje Inesperado - Tráiler oficial en Castellano</title>
        <description>Perro corriendo a 40KM/h, increíble http://www.youtube.com/watch?v=fq-GkA1pm5M El Hobbit : Un Viaje
            Inesperado - Trailer oficial en Castellano HD 1080p ...
        </description>
        <thumbnails>
            <default>
                <url>https://i.ytimg.com/vi/P59fZy9Muo0/default.jpg</url>
            </default>
            <medium>
                <url>https://i.ytimg.com/vi/P59fZy9Muo0/mqdefault.jpg</url>
            </medium>
            <high>
                <url>https://i.ytimg.com/vi/P59fZy9Muo0/hqdefault.jpg</url>
            </high>
        </thumbnails>
        <channelTitle>imyourlastnightmare</channelTitle>
        <liveBroadcastContent>none</liveBroadcastContent>
    </snippet>
</items>
<items>
    <kind>youtube#searchResult</kind>
    <etag>&quot;bvxF-DWHx1toJotsdJBeCm43SLs/fJAGDmWtXhN5PyPsp2m48USIweE&quot;</etag>
    <id>
        <kind>youtube#video</kind>
        <videoId>kZLEPSPdJVY</videoId>
    </id>
    <snippet>
        <publishedAt>2012-09-19T14:25:23.000Z</publishedAt>
        <channelId>UCwDWl9xjkZhiDupkJsp_HBg</channelId>
        <title>Trailer 2 El Hobbit: Un Viaje Inesperado - en español y HD</title>
        <description>Segundo trailer doblado en español y en HD de El Hobbit: Un Viaje Inesperado, la primera de las
            tres películas de El Hobbit dirigidas por Peter Jackson y pro...
        </description>
        <thumbnails>
            <default>
                <url>https://i.ytimg.com/vi/kZLEPSPdJVY/default.jpg</url>
            </default>
            <medium>
                <url>https://i.ytimg.com/vi/kZLEPSPdJVY/mqdefault.jpg</url>
            </medium>
            <high>
                <url>https://i.ytimg.com/vi/kZLEPSPdJVY/hqdefault.jpg</url>
            </high>
        </thumbnails>
        <channelTitle>ElAnilloUnico</channelTitle>
        <liveBroadcastContent>none</liveBroadcastContent>
    </snippet>
</items>
<items>
    <kind>youtube#searchResult</kind>
    <etag>&quot;bvxF-DWHx1toJotsdJBeCm43SLs/sxlkKHJk4TgGOA337-D4juHXNg0&quot;</etag>
    <id>
        <kind>youtube#video</kind>
        <videoId>dCkGZEBYYyI</videoId>
    </id>
    <snippet>
        <publishedAt>2012-02-11T01:23:22.000Z</publishedAt>
        <channelId>UCUkpR18TnoyyzWi4kDtbQtw</channelId>
        <title>El Hobbit Un Viaje Inesperado - Tráiler oficial en español (1080p).</title>
        <description>Ocho años después del estreno de &#x27;El señor de los anillos: El retorno del rey&#x27; (&#x27;The
            Lord of the Rings: The Return of the King&#x27;), Peter Jackson nos invita a ...
        </description>
        <thumbnails>
            <default>
                <url>https://i.ytimg.com/vi/dCkGZEBYYyI/default.jpg</url>
            </default>
            <medium>
                <url>https://i.ytimg.com/vi/dCkGZEBYYyI/mqdefault.jpg</url>
            </medium>
            <high>
                <url>https://i.ytimg.com/vi/dCkGZEBYYyI/hqdefault.jpg</url>
            </high>
        </thumbnails>
        <channelTitle>danielcobra17</channelTitle>
        <liveBroadcastContent>none</liveBroadcastContent>
    </snippet>
</items>
<items>
    <kind>youtube#searchResult</kind>
    <etag>&quot;bvxF-DWHx1toJotsdJBeCm43SLs/a0UYQLH586MdSpQt9Sgo_nO6a4s&quot;</etag>
    <id>
        <kind>youtube#video</kind>
        <videoId>O-tIPbAy0Bg</videoId>
    </id>
    <snippet>
        <publishedAt>2012-09-22T13:05:59.000Z</publishedAt>
        <channelId>UCiHvhIinPH29s7ezHqwyyAQ</channelId>
        <title>Trailer 2 EL HOBBIT Un Viaje Inesperado Español Proximo estreno Diciembre 2012</title>
        <description>Segundo trailer doblado en español de El Hobbit: Un Viaje Inesperado, la primera de las tres
            películas de El Hobbit dirigidas por Peter Jackson La historia, ...
        </description>
        <thumbnails>
            <default>
                <url>https://i.ytimg.com/vi/O-tIPbAy0Bg/default.jpg</url>
            </default>
            <medium>
                <url>https://i.ytimg.com/vi/O-tIPbAy0Bg/mqdefault.jpg</url>
            </medium>
            <high>
                <url>https://i.ytimg.com/vi/O-tIPbAy0Bg/hqdefault.jpg</url>
            </high>
        </thumbnails>
        <channelTitle>Videotopy</channelTitle>
        <liveBroadcastContent>none</liveBroadcastContent>
    </snippet>
</items>
<items>
    <kind>youtube#searchResult</kind>
    <etag>&quot;bvxF-DWHx1toJotsdJBeCm43SLs/t8WrDs_jm-54axRTfpOjr3APAIg&quot;</etag>
    <id>
        <kind>youtube#video</kind>
        <videoId>zhyjYRpSxBM</videoId>
    </id>
    <snippet>
        <publishedAt>2013-10-21T19:09:08.000Z</publishedAt>
        <channelId>UCwDWl9xjkZhiDupkJsp_HBg</channelId>
        <title>El Hobbit Un Viaje Inesperado - Trailer Versión Extendida español</title>
        <description>Trailer en español (al menos lo que Warner Bros España considera que es un trailer) y en Full HD de
            la Versión Extendida de El Hobbit: Un Viaje Inesperado, q.
        </description>
        <thumbnails>
            <default>
                <url>https://i.ytimg.com/vi/zhyjYRpSxBM/default.jpg</url>
            </default>
            <medium>
                <url>https://i.ytimg.com/vi/zhyjYRpSxBM/mqdefault.jpg</url>
            </medium>
            <high>
                <url>https://i.ytimg.com/vi/zhyjYRpSxBM/hqdefault.jpg</url>
            </high>
        </thumbnails>
        <channelTitle>ElAnilloUnico</channelTitle>
        <liveBroadcastContent>none</liveBroadcastContent>
    </snippet>
</items>
</youtube>
-->
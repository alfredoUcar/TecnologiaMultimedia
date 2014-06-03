<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="seriesly">
        <html>
            <body>

                <xsl:apply-templates select='results'/>
                <xsl:apply-templates select="movies/item"/>
                <xsl:if test="error != 0">
                    <h3 class="error" >Lo sentimos no se han encontrado resultados.</h3>
                </xsl:if>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="results">
        <div class="lista-peliculas">
            <xsl:apply-templates select="medias/item"/>
        </div>

        <div class="pagination">
            <xsl:call-template name="pagination">
                <xsl:with-param name="actual" select="page"/>
                <xsl:with-param name="more" select="hasMore"/>
            </xsl:call-template>
        </div>
    </xsl:template>

    <!-- PLANTILLA PARA LA FICHA RESUMEN DE PELICULA-->
    <xsl:template match="item">
        <div class="resumen-pelicula" id="{idm}">
            <img  src="{img}" onerror="this.src='images/no_img.jpg'" />
            <div class="info-pelicula" >
                <h4 class="titulo-pelicula"><xsl:value-of select="name"/></h4>
                <xsl:choose>
                    <xsl:when test="year != ''">
                        <span>Año: <xsl:value-of select="year"/></span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span>Año: (Desconocido)</span>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:choose>
                    <xsl:when test="maingenre != ''">
                        <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
                        <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
                        <xsl:variable name="maingenre" select="translate(maingenre, $uppercase, $lowercase)"/>
                        <span>Género: <xsl:value-of select="document('generos.xml')/lista_generos/genero[@id=$maingenre]"/></span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span>Género: (Desconocido)</span>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:if test="rating">
                    <xsl:apply-templates select="rating" />
                    <!--<span>Calificación: <xsl:value-of select='format-number(translate(rating,",","."),"##.#")'/></span>-->
                </xsl:if>
            </div>
        </div>
    </xsl:template>

    <!-- plantilla para la paginación de resultados-->
    <xsl:template name="pagination">
        <xsl:param name="more" select="0"/>
        <xsl:param name="actual" select="0"/>

        <!-- solo si hay más de una página -->
                <xsl:if test="$actual &gt; 0">
                    <a href="#" data-page-index="{$actual - 1}" class="page prev">Anterior</a>
                </xsl:if>

                <xsl:if test="$more = 1">
                    <a href="#" data-page-index="{$actual + 1}" class="page next">Siguiente</a>
                </xsl:if>
    </xsl:template>

    <!-- dibujo de estrella con la puntuación -->
    <xsl:template match="rating">
        <div class="rating">
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
                <defs>
                    <radialGradient spreadMethod="pad" id="svg_3">
                        <stop offset="0" stop-color="#000000"/>
                        <stop offset="1" stop-color="#ffffff"/>
                    </radialGradient>
                    <radialGradient r="0.5" cy="0.5" cx="0.5" spreadMethod="pad" id="svg_4">
                        <stop offset="0.479187" stop-opacity="0.996094" stop-color="#f9e104"/>
                        <stop offset="1" stop-color="#ffffff"/>
                    </radialGradient>
                    <radialGradient spreadMethod="pad" id="svg_5">
                        <stop offset="0.369812" stop-color="#ffff00"/>
                        <stop offset="1" stop-opacity="0.996094" stop-color="#ffaa56"/>
                    </radialGradient>
                    <radialGradient r="0.5" cy="0.5" cx="0.5" spreadMethod="pad" id="svg_9">
                        <stop offset="0.369812" stop-color="#ffff00"/>
                        <stop offset="1" stop-opacity="0.996094" stop-color="#aaff56"/>
                    </radialGradient>
                    <radialGradient r="0.5" cy="0.5" cx="0.5" spreadMethod="pad" id="svg_10">
                        <stop offset="0.725281" stop-color="#ffff00"/>
                        <stop offset="1" stop-opacity="0.996094" stop-color="#aaff56"/>
                    </radialGradient>
                </defs>
                <g>
                    <path id="estrella" d="m50,10.2168l9.999802,29.749902l30.449997,0.641697l-24.269897,19.028202l8.819496,30.146603l-24.999397,-17.989799l-24.9993,17.989799l8.819399,-30.146603l-24.269898,-19.028202l30.450101,-0.641697l9.999699,-29.749902l9.999802,29.749902" stroke-linecap="round" stroke-linejoin="round" stroke="#ffac07" fill="url(#svg_5)"/>
                    <text xml:space="preserve" text-anchor="middle" font-family="Fantasy" font-size="24" id="svg_11" y="63.5" x="49.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="null" stroke-width="0" stroke="#5fbf00" fill="#000000"><xsl:value-of select='format-number(translate(.,",","."),"##.#")'/></text>
                </g>
            </svg>
        </div>
    </xsl:template>

</xsl:stylesheet>
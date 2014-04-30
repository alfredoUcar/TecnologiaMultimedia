<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="seriesly">
        <html>
            <body>
                <xsl:apply-templates select='response'/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="response">
        <!--<h1>Se han encontrado <xsl:value-of select="found"/> resultados</h1>-->
        <div class="lista-peliculas">
            <xsl:apply-templates select="results/item/object"/>
        </div>

        <div class="pagination">
            <xsl:call-template name="pagination">
                <xsl:with-param name="actual" select="page"/>
                <xsl:with-param name="ultima_pagina" select="max_page"/>
            </xsl:call-template>
        </div>
    </xsl:template>

    <!-- PLANTILLA PARA LA FICHA RESUMEN DE PELICULA-->
    <xsl:template match="object">
        <div class="resumen-pelicula" id="{idm}">
            <img  src="{img}" onerror="this.src='http://cdn.opensly.com/no_img.jpg'" />
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
                        <span>Género: <xsl:value-of select="maingenre"/></span>
                    </xsl:when>
                    <xsl:otherwise>
                        <span>Género: (Desconocido)</span>
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:if test="rating">
                    <span>Calificación: <xsl:value-of select='format-number(translate(rating,",","."),"##.#")'/></span>
                </xsl:if>
            </div>
        </div>
    </xsl:template>

    <!-- plantilla para la paginación de resultados-->
    <xsl:template name="pagination">
        <xsl:param name="ultima_pagina" select="1"/>

        <xsl:if test="$ultima_pagina > 0">
            <p><xsl:value-of select="$ultima_pagina"/></p>
            <xsl:call-template name="pagination">
                <xsl:with-param name="ultima_pagina" select="$ultima_pagina - 1"/>
            </xsl:call-template>
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>
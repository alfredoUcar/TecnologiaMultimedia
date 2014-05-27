<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="seriesly">
        <div id="ficha-pelicula">
            <img  src="{img}" onerror="this.src='images/no_img.jpg'" />
            <xsl:apply-templates select="rating"/>
            <h1 class="titulo-pelicula"><xsl:value-of select="name"/></h1>
            <div id="sinopsis">
                <h3>Sinopsis</h3>
                <xsl:choose>
                    <xsl:when test="plot"><p><xsl:value-of select="plot"/></p></xsl:when>
                    <xsl:otherwise><p>(Ninguna descripción disponible para esta película)</p></xsl:otherwise>
                </xsl:choose>
            </div>
            <div id="informacion">
                <h3>Información</h3>
                <table>
                    <tr><td>Año</td><td><xsl:value-of select="year"/></td></tr>
                    <tr><td>Duración</td><td><xsl:value-of select="runtime"/> min.</td></tr>
                    <tr><td>País</td><td><xsl:apply-templates select="country"/></td></tr>
                    <tr><td>Idiomas</td><td><xsl:apply-templates select="languages"/></td></tr>
                    <tr><td>Director</td><td><xsl:apply-templates select="director"/></td></tr>
                    <tr><td>Guionistas</td><td><xsl:apply-templates select="write"/></td></tr>
                    <tr><td>Productores</td><td><xsl:apply-templates select="produce"/></td></tr>
                </table>
            </div>
            <div id="reparto">
                <h3>Reparto</h3>
                <table>
                    <tr><th>Nombre</th><th>Personaje</th></tr>
                    <xsl:apply-templates select="cast"/>
                </table>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="genres|country|languages|director|write|produce">
        <xsl:for-each select="item">
            <xsl:choose>
                <xsl:when test="name"><xsl:value-of select="name"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="."/></xsl:otherwise>
            </xsl:choose>
            <xsl:if test="position() != last()">, </xsl:if>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="cast">
        <xsl:for-each select="item">
            <tr><td><xsl:value-of select="name"/></td><td><xsl:apply-templates select="role"/></td></tr>
        </xsl:for-each>
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
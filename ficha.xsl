<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="seriesly">
        <div id="ficha-pelicula">
            <img  src="{img}" onerror="this.src='images/no_img.jpg'" />
            <h1 class="titulo-pelicula"><xsl:value-of select="name"/></h1>
            <!--<p>Géneros: <xsl:apply-templates select="genres"/></p>-->
            <!--<p>Idiomas: <xsl:apply-templates select="languages/"/></p>-->
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
            <div id="sinopsis">
                <h3>Sinopsis</h3>
                <xsl:value-of select="plot"/>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="genres|country|languges|director|write|produce">
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

</xsl:stylesheet>
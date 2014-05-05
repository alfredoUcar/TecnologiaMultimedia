<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <img  src="{img}" onerror="this.src='images/no_img.jpg'" />
        <h1 class="titulo-pelicula"><xsl:value-of select="name"/></h1>
        <p>Géneros: <xsl:apply-templates select="genres"/></p>
        <p>Idiomas: <xsl:apply-templates select="languages/"/></p>
        <p>Director: <xsl:apply-templates select="director"/></p>
        <p>Guionistas: <xsl:apply-templates select="write"/></p>
        <p>Productores: <xsl:apply-templates select="produce"/></p>
    </xsl:template>

</xsl:stylesheet>
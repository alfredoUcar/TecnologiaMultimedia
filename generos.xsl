<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match='lista_generos'>
        <xsl:for-each select="genero">
            <li id="{@id}" class="genero" ><xsl:value-of select="."/></li>
        </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>
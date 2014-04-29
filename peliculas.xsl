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
        <h1>Se han encontrado <xsl:value-of select="found"/> resultados</h1>
    </xsl:template>

</xsl:stylesheet>
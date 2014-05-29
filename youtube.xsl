<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="youtube">
        <xsl:apply-templates select="items"/>
    </xsl:template>


    <xsl:template match="items">
        <a id="{id/videoId}" class="video" href="#" target="_blank">
            <div>
                <img src="{snippet/thumbnails/medium/url}" />
                <p><xsl:value-of select="snippet/title"/></p>
            </div>
        </a>
    </xsl:template>

</xsl:stylesheet>

<?
    $xsl_filename = "peliculas.xsl";	/* nom arxiu xsl */
    $xml = simplexml_load_string(file_get_contents('php://input')); //crea el xml a partir de los datos que se han recibido por POST

    $doc = new DOMDocument();
    $xsl = new XSLTProcessor();

    $doc->load($xsl_filename);
    $xsl->importStyleSheet($doc);

    echo $xsl->transformToXML($xml);
?>
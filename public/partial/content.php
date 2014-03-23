<?php
/**
 * Created by JetBrains PhpStorm.
 * User: alfredo
 * Date: 23/03/14
 * Time: 18:37
 * To change this template use File | Settings | File Templates.
 */

$saludo = isset($this->saludo)? $this->saludo : "Hola mundo!";

?>

<div>
    saludo: <?=$saludo?>
</div>
<?php

if ($_REQUEST['second'] == 1) {
echo file_get_contents("http://feeds.delicious.com/v2/json/boxmodel/inspiration?count=100");
} else {
echo file_get_contents("http://feeds.delicious.com/v2/json/boxmodel/webdesign+design?count=100");

}
?>

<?php

$savename = 'image_cache/' . str_replace("/","",$_REQUEST['fl']) . '.jpg';

if ( file_exists($savename) ) {
	header('Content-Type: image/jpeg');
	readfile($savename);
}
else {
	$filename = 'http://immediatenet.com/t/l?Size=1024x768&URL=' . $_GET['fl'];
	//$filename = 'http://www.webprev.com/thumb.php?conf=1320024741va9k4fzuhh7abhshc3ehqm&imagesize=200x150&url=' . $_GET['fl'];
	$ext = 'jpg'; //pathinfo($filename, PATHINFO_EXTENSION);
	//echo $filename;
	//exit;

	switch ($ext) {
	    case "jpg":
	        header('Content-Type: image/jpeg');
			$file_contents = file_get_contents($filename);
	        break;
	    case "gif":
	        header('Content-Type: image/gif');
	        $file_contents = file_get_contents($filename);
	        break;
	    case "png":
	        header('Content-Type: image/png');
	        $file_contents = file_get_contents($filename);
	        break;
	}
	//echo $savename;
	file_put_contents($savename,$file_contents);
	echo $file_contents;
	
	
}
?>
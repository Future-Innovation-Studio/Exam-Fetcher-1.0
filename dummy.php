<?php
/**
 * Created by PhpStorm.
 * User: JackieChung
 * Date: 2/03/15
 * Time: 10:19 AM
 */
# define file array
$files = array(
    'http://google.com/images/logo.png',
    'http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Wikipedia-logo-en-big.png/220px-Wikipedia-logo-en-big.png'
);

# create new zip opbject
$zip = new ZipArchive();

# create a temp file & open it
$tmp_file = tempnam('.','');
$zip->open($tmp_file, ZipArchive::CREATE);

# loop through each file
foreach($files as $file){

    # download file
    $download_file = file_get_contents($file);

    #add it to the zip
    $zip->addFromString(basename($file),$download_file);

}

# close zip
$zip->close();

# send the file to the browser as a download
header('Content-disposition: attachment; filename=download.zip');
header('Content-type: application/zip');
ob_clean();
flush();
readfile($tmp_file);
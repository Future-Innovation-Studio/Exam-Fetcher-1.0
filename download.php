<?php
/**
 * Created by PhpStorm.
 * User: JackieChung
 * Date: 3/03/15
 * Time: 9:00 AM
 */
require_once('Resource/zipstream.php');


if (isset($_POST['downloadLinks'])){

    if (setcookie('fileLoading',true,time()+86400,'/')){
        error_log('Cookie set');
    }else{
        error_log('Failed to set cookie');
    }

    //Retrieve JSON Data
    $data = json_decode($_POST['downloadLinks'],true);
    //Create ZipArchive using Stream
    $zipStream = new ZipStream('exam.zip');
    foreach ($data as $item){
        //Add files
        $filesInDirectory = $item["value"];
        foreach ($filesInDirectory as $file){
            //Download file
            $downloaded_file = file_get_contents($file);
            //Add to zip
            $zipStream -> add_file($item["key"]."/".basename($file),$downloaded_file);
        }
    }
    $zipStream->finish();
}


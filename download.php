<?php
/**
 * Created by PhpStorm.
 * User: JackieChung
 * Date: 3/03/15
 * Time: 9:00 AM
 */
require_once('Resource/zipstream.php');


if (isset($_POST['downloadLinks'])){

    setcookie('fileLoading',true,time()+86400,'/');

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

            // The above code may be buggy -> damage in zip file
            // Try
            // $zipStream -> add_file_from_path($item["key"]."/".basename($file),$file);
        }
    }
    $zipStream->finish();

    setcookie('fileLoaded',true,time()+86400,'/');

}


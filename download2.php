<?php
/**
 * Created by PhpStorm.
 * User: ying
 * Date: 15/5/21
 * Time: 下午12:52
 */


//Sets of urls
$base_dir  = __DIR__; // Absolute path to your installation, ex: /var/www/mywebsite
$doc_root  = preg_replace("!{$_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']); # ex: /var/www
$base_url  = preg_replace("!^{$doc_root}!", '', $base_dir); # ex: '' or '/mywebsite'
$protocol  = empty($_SERVER['HTTPS']) ? 'http' : 'https';
$port      = $_SERVER['SERVER_PORT'];
$disp_port = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";
$domain    = $_SERVER['SERVER_NAME'];
$full_url  = "$protocol://{$domain}{$disp_port}{$base_url}";

//Download
if (isset($_POST['addFileToServer_url'])){
    $url = $_POST['addFileToServer_url'];
    $file_name = $_POST['addFileToServer_filename'];
    file_put_contents($base_dir.'/temp/'.$file_name,file_get_contents($url));
    setcookie('fileAdded',$full_url.'/temp/'.$file_name,time()+86400,'/');
    header('Location: index.php');
}
//Delete
if ($_POST['action'] == "delete"){
    $files = glob($base_dir.'/temp/*'); // get all file names
    foreach($files as $file){ // iterate files
        if(is_file($file))
            unlink($file); // delete file
    }
}


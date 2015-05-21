<?php

require_once('class.php');

if (isset($_POST['bulkModeIndicator'])){

    $subjectsArray = array();

    $yearArray = array();

    if (isEmptyInput((string)$_POST['bulk_subject']) || isEmptyInput((string)$_POST['bulk_year'])){

        header('HTTP/1.1 500 Internal Server');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('message' => 'ERROR: Please check your fields!', 'code' => 1337)));

    }else{

        $subjectsArray = stringToArray($_POST['bulk_subject']);

        $yearArray = stringToArray($_POST['bulk_year']);
    }

    $downloadData = array();

    $singleSubjectArray = array();

    if ($subjectsArray&&$yearArray){

        for ($i=0;$i<count($subjectsArray);$i++){

            $dom = file_get_html($exam->findSubjectURL((string)$subjectsArray[$i]));

            if (!$dom){
                exit();
            }

            foreach ($dom->find('table[class=tablestyle4]') as $table){

                for ($q=0;$q<count($yearArray);$q++){

                    foreach ($table->find('tr') as $tr) {

                        $yearTitle = $tr->find('td',0)->innertext;
                        $cleanedYearTitle = preg_replace('/[^\00-\255]+/u', '', $yearTitle);

                        if ((string)$yearArray[$q] == $cleanedYearTitle){

                            foreach ($tr->find('a') as $examLink){
                                $url = $exam->getBaseUrl().$examLink->href;
                                $title = "Download: ".$exam->generateTitle($subjectsArray[$i],$yearTitle,$examLink->href);
                                $singleSubjectArray[$title] = $url;
                            }
                        }
                    }
                }

            }
            $downloadData[$subjectsArray[$i]] = $singleSubjectArray;
            $singleSubjectArray = null;
        }

        echo json_encode($downloadData);
        exit();
    }


}else{

    if (getNumberOfSubjects()!=0){

        $downloadData = array();

        $singleSubjectArray = array();

        $subject_name = null; $subject_year = null;

        for ($i=0;$i<getNumberOfSubjects();$i++){

            if(!empty($_POST['field_div_id_'.$i.'_subject'])){
                $subject_name = $_POST['field_div_id_'.$i.'_subject'];

                if(!empty($_POST['field_div_id_'.$i.'_year'])){
                    $subject_year = $_POST['field_div_id_'.$i.'_year'];

                    $dom = file_get_html($exam->findSubjectURL((string)$subject_name));

                    foreach ($dom->find('table[class=tablestyle4]') as $table){

                        foreach ($table->find('tr') as $tr){
                            $yearTitle = $tr->find('td',0)->innertext;

                            $cleanedYearTitle = preg_replace('/[^\00-\255]+/u', '', $yearTitle);


                            if ($cleanedYearTitle == (string)$subject_year){
                                foreach ($tr->find('a') as $examLink){
                                    $url = $exam->getBaseUrl().$examLink->href;
                                    $title = "Download:".$exam->generateTitle($subject_name,$subject_year,$examLink->href);
                                    $singleSubjectArray[$title] = $url;
                                }
                            }
                        }
                    }


                    $downloadData[$subject_name] = $singleSubjectArray;
                    $singleSubjectArray = null;

                }else{
                    header('HTTP/1.1 500 Internal Server');
                    header('Content-Type: application/json; charset=UTF-8');
                    die(json_encode(array('message' => 'ERROR: Please check your fields!', 'code' => 1337)));
                }
            }else{
                header('HTTP/1.1 500 Internal Server');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => 'ERROR: Please check your fields!', 'code' => 1337)));
            }

        }


        echo json_encode($downloadData);

        exit();

    }
}

function isEmptyInput($str){
    if ($str == "[]"){
        return true;
    }
    return false;
}


function getNumberOfSubjects(){
    if (isset($_POST['counter'])){
        return (int)$_POST['counter'];
    }

    return 0;
}

function stringToArray($str){

    $replaceFrom = array("[","\"","]");
    $replaceTo = array("","","");

    $cleaned = str_replace($replaceFrom,$replaceTo,$str);
    $result = explode(",",$cleaned);

    return $result;
}


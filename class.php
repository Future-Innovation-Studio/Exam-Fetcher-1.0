<?php
/**
 * Created by PhpStorm.
 * User: JackieChung
 * Date: 16/02/15
 * Time: 1:52 PM
 */
require('Resource/simple_html_dom.php');

class exam_fetcher{

    //variables
    private $base_url = "http://www.vcaa.vic.edu.au";

    /**
     * @return string
     */
    public function getBaseUrl()
    {
        return $this->base_url;
    }

    /**
     * @param string $base_url
     */
    public function setBaseUrl($base_url)
    {
        $this->base_url = $base_url;
    }

    private $savedDOM;

    public function __construct(){

        $this->savedDOM = file_get_html("http://www.vcaa.vic.edu.au/pages/vce/exams/examsassessreports.aspx");

    }

    public function findSubjectURL($subject_name){
        foreach ($this->savedDOM -> find('a') as $element){
            $name = $element->innertext;

            if ($this->match($subject_name,$name)){
                return $this->base_url.$element->href;
                break;
            }
        }
        return false;

    }

    private function match($input,$source){
        $decodedSource = str_replace("\xc2\xa0",' ',html_entity_decode($source));
        if (preg_replace('/\s+/','',$decodedSource) == $input){
            return true;
        }
        return false;
    }


    public function generateTitle($subject,$year,$href){
        //slice URL
        $pos = strrpos($href,'/')+1;
        $slicedURL = substr($href,$pos,strlen($href)-$pos);

        return $slicedURL;

    }

}

$exam = new exam_fetcher();

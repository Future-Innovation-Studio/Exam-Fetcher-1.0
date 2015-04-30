<html>
<head>
    <title>Exam Fetcher</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src="Resource/jquery-2.1.3.min.js"></script>
    <script src="Resource/jquery-ui.js"></script>
    <script src="Resource/flip.js"></script>
    <link rel="stylesheet" href="Resource/jquery-ui.css" />
    <link rel="stylesheet" href="Resource/style.css" />
    <!-- Text Core Plugin -->
    <link rel="stylesheet" href="Resource/textext.core.css"/>
    <link rel="stylesheet" href="Resource/textext.plugin.autocomplete.css"/>
    <link rel="stylesheet" href="Resource/textext.plugin.tags.css"/>
    <script src="Resource/textext.core.js"></script>
    <script src="Resource/textext.plugin.autocomplete.js"></script>
    <script src="Resource/textext.plugin.tags.js"></script>
    <script src="Resource/textext.plugin.suggestions.js"></script>
    <script src="Resource/textext.plugin.filter.js"></script>
    <style>

    </style>
</head>

<body>
<div id="preloader">
    <div class="spinner-container">
        <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
    </div>
</div>
<div  class="centered grid__col--8" id="main" style="margin-top: 5%">
    <h1 style="text-align: center">Welcome to VCAA Exam Fetcher V1.4. FISTUDIO&copy;</h1>
    <h3 style="text-align: center">Click "Add" button to add more subject selection forms and then click "Submit".<br/></h3>
    <h5 style="text-align: center"><a href="http://fistudio.net/?p=371" target="_blank">Future Developments and change logs...</a></h5>

    <div align="center" id="buttonsDiv">
        <a class="btn--info" id="addBtn" onclick="addField()">Add</a>
        <a class="btn--warning" id="removeBtn" onclick="removeField()" style="display: none;">Remove</a>
        <a class="btn--error" id="reloadBtn" onclick="reloadWindow()">Reload</a>
        <a class="btn--default" id="downloadBtn" style="display:none">Download</a>

        <div class="dv_popup" style="display: none;">
            <div class="popup_header">
                <h3>Please select a download method</h3>
                <a class="close" href="#">&times;</a>
            </div>
            <div class="body">
                <p> Download by file: Download the file one by one with the browser downloader(Useful in Single Mode)</p>
                <p> Download to ZIP: Download a zip file containing all of the retrieved files(Useful in Bulk Mode)</p>
            </div>
            <br />
            <div class="popup_footer">
                <a class = "btn--default" style="float:left" id="download-file">Download By File</a>
                <a class = "btn--default" style="float:right" id="download-zip">Download To Zip</a>
            </div>
        </div>

        <a class="btn--success" id="flipBulk" >Bulk Mode</a>
        <a class="btn--success" id="flipSingle">Single Mode</a>
    </div>

    <div id="flipable">

        <div class="front" id="front">
            <form id="sform" method="post">

                <div id="container">
                    <div id="field_div_id_0">
                        <h5>
                            Enter your subject
                        </h5>
                        <input type="text" placeholder="Type a few characters and select a subject" name="field_div_id_0_subject" id="field_div_id_0_subject" class="form__input ui-autocomplete-input" autocomplete="off">
                        <h5>
                            Enter year
                        </h5>
                        <input type="text" placeholder="Type a few characters and select a year" name="field_div_id_0_year" id="field_div_id_0_year" class="form__input">
                        <br>
                    </div>
                </div>
                <br/>
                <input type="submit" id="submit" value="submit"/>
                <input type="hidden" name="counter" id="counter"/>

            </form>


        </div>

        <div class="back" id="back">
            <form id="bform" method="post">
                <div>
                    <h5>Enter your subjects:</h5>
                    <input id="bulk_subject" placeholder="Type a few characters and select a subject" name="bulk_subject" class="form__input" style="width: 100% !important;" />
                    <h5>Enter years (no more than 5!!):</h5>
                    <input id="bulk_year" placeholder="Type a few characters and select a year" name="bulk_year" class="form__input" style="width:100%;" />
                    <br>
                </div>
                <input type="submit" id="submit" name="submit" value="submit">
                <input type="hidden" id="bulkModeIndicator" name="bulkModeIndicator" value="">
            </form>
        </div>
    </div>

    <div id="post-result-div" style="display: none">

    </div>


</div>

<script src="function.js" type="text/javascript"></script>
<script src="Resource/jquery.cookie.js"></script>
<script>
    //tracking
    setInterval(function(){
        if ($.cookie("fileLoaded")) {
            // clean the cookie for future downloads
            $.removeCookie("fileLoaded");
            $.removeCookie("fileLoading");
            //Conceal preloader
            $('#preloader').fadeOut();
        }else if($.cookie("fileLoading")){
            //Reveal preloader
            $('#preloader').fadeIn();
        }
    },1000);

</script>
</body>
</html>
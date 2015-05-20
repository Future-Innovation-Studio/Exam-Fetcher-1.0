/**
 * Created by JackieChung on 3/03/15.
 */
// ========== INITIALIZATION ===========
var searchIndex = ["Accounting","AgriculturalandHorticulturalStudies","Albanian","Arabic","Armenian","Art","Auslan","AustralianHistory","AustralianPolitics","Bengali","Biology","Bosnian","Business(VCEVET)","BusinessManagement","Chemistry","ChineseFirstLanguage","ChineseSecondLanguage","ChineseSecondLanguageAdvanced","ClassicalStudies","CommunityServices(VCEVET)","ContemporaryAustralianSociety","Croatian","Czech","Dance","Dance(VCEVET)","Drama","Dutch","Economics","EngineeringStudies(VCEVET)","English","EnglishasanAdditionalLanguage(EAL)","EnglishLanguage","EnvironmentalScience","EquineStudies(VCEVET)","ExtendedInvestigation","Filipino","FinancialServices(VCEVET)","FoodandTechnology","French","Furnishing(VCEVET)","FurtherMathematics","GeneralAchievementTest(GAT)","Geography","German","Greek","GlobalPolitics","HealthandHumanDevelopment","Hebrew","Hindi","History","AustralianHistory","RenaissanceItaly","Revolutions","Hospitality(VCEVET)","Hospitality","Hospitality-KitchenOperations","Hungarian","IndigenousLanguagesofVictoria","IndonesianFirstLanguage","IndonesianSecondLanguage","IndustryandEnterprise","InformationTechnology","ITApplications","SoftwareDevelopment","InformationandCommunicationsTechnology(VCEVET)","IntegratedTechnologies(VCEVET)","InteractiveDigitalMedia(VCEVET)","Italian","JapaneseFirstLanguage","JapaneseSecondLanguage","Khmer","KoreanFirstLanguage","KoreanSecondLanguage","LaboratorySkills(VCEVET)","Latin","Latvian","LegalStudies","Literature","Lithuanian","Macedonian","Maltese","Mathematics","FurtherMathematics","MathematicalMethods(CAS)","SpecialistMathematics","Media","Music","CertificateIIIinMusic(VCEVET)","CertificateIIIinMusic(TechnicalProduction)(VCEVET)","MusicInvestigation","MusicPerformance","MusicStyleandComposition","OutdoorandEnvironmentalStudies","Persian","Philosophy","PhysicalEducation","Physics","Polish","PoliticalStudies","Portuguese","ProductDesignandTechnology","Psychology","Punjabi","ReligionandSociety","RenaissanceItaly","Revolutions","Romanian","Russian","Serbian","Sinhala","Slovenian","Sociology","Spanish","SpecialistMathematics","SportandRecreation(VCEVET)","StudioArts","Swedish","SystemsEngineering","Tamil","Technology","ProductDesignandTechnology","FoodandTechnology","SystemsEngineering","TextsandTraditions","TheatreStudies","Turkish","Ukrainian","Vietnamese","VisualCommunicationDesign","Yiddish"];
var years = ["2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002"];
var fieldSet = 1;
var isFront = true;

$(window).load(function(){
    $('#preloader').fadeOut();

    $('#flipable').flip({
        trigger:'manual'
    });
    $('#flipSingle').hide();

    $('#field_div_id_0_subject').autocomplete({
        source:searchIndex
    });
    $('#field_div_id_0_year').autocomplete({
        source:years
    });
    //prevent enter to submit in front form
    $(window).keydown(function(e){
        if (e.keyCode == 13){
            e.preventDefault();
            return false;
        }
    });
    //keep functional buttons floated after scrolling
    $("#buttonsDiv").sticky({topSpacing:0});


});
// ========== FRONT FORM ==================

function addField(){

    var subjectPlaceholder = "Type a few characters and select a subject";
    var yearPlaceholder = "Type a few characters and select a year";

    var form = document.getElementById("container");
    //create container
    var div = document.createElement("div");
    div.id = "field_div_id_"+fieldSet;

    div.innerHTML += "<h5>Enter your subject</h5>";
    //create subject field
    var subjectField = document.createElement("input");
    subjectField.type = "text";
    subjectField.name = "field_div_id_"+fieldSet+"_subject";
    subjectField.id = "field_div_id_"+fieldSet+"_subject";
    subjectField.className = "form__input";
    subjectField.placeholder = subjectPlaceholder;
    div.appendChild(subjectField);

    div.innerHTML += "<h5>Enter year</h5>";
    //create year field
    var yearField = document.createElement("input");
    yearField.type = "text";
    yearField.name = "field_div_id_" + fieldSet + "_year";
    yearField.id = "field_div_id_" + fieldSet + "_year";
    yearField.className = "form__input";
    yearField.placeholder= yearPlaceholder;
    div.appendChild(yearField);
    div.innerHTML += "<br/>";

    //create hidden counter
    form.appendChild(div);

    //Link sources
    $('#field_div_id_'+ fieldSet +'_subject').autocomplete({
        source:searchIndex
    });

    $('#filed_div_id' + fieldSet + '_year').autocomplete({
        source:years
    });

    fieldSet++;

    //Reveal remove button
    var removeBtn = document.getElementById('removeBtn');
    removeBtn.style.display = "inline";

    //Reveal submit button
    var submitBtn = document.getElementById('submit');
    submitBtn.style.display = "inline";
}

$("#sform").submit(function(e){
    $('#counter').val(fieldSet);

    $('#preloader').fadeIn();

    var postData = $(this).serializeArray();
    var formURL = 'function.php';
    $.ajax({
        url: formURL,
        type: "POST",
        data: postData,
        success:function(data){

            // Remove fields
            var div = document.getElementById('front');
            div.innerHTML = "<h3>Here are the files that are retrieved. Tap one of them or download them all using the button at the <a href='#'><b>TOP</b></a> of the page <br/> To reset, click the reload button in your browser </h3></br>";
            console.log(data);
            var jsonObj = $.parseJSON(data);

            var frontTableResult = document.createElement('table');
            frontTableResult.id = "table-result-front";
            frontTableResult.style.width = "70%";
            frontTableResult.style.margin = "0 auto";
            frontTableResult.innerHTML += "<thead> <tr> <th>Subject</th> <th>Download Links</th> </tr> </thead>";

            var dlCounter = 0;

            $.each(jsonObj,function(key,val){
                //Create table rows
                var tr = document.createElement('tr');
                var tdSubject = document.createElement('td');
                tdSubject.innerText = key;
                tr.appendChild(tdSubject);
                var tdDownloadLinks = document.createElement('td');
                tdDownloadLinks.style.float = "right";

                $.each(val,function(idx,vlu){

                    var link = document.createElement('a');
                    link.href = vlu;
                    link.innerHTML = idx;
                    link.className = "downloadable";
                    link.id = "downloadable-front-"+dlCounter;
                    link.setAttribute("target","_blank");
                    tdDownloadLinks.appendChild(link);
                    //Add Print Button
                    var printBtn = document.createElement('button');
                    printBtn.innerHTML = "Print this";
                    printBtn.id = "print-front-"+dlCounter;
                    tdDownloadLinks.appendChild(printBtn);
                    printBtn.addEventListener('click',function(){
                        //TODO::PRINT!
                    });
                    dlCounter ++;

                    var hiddenLink = document.createElement('a');
                    hiddenLink.href = vlu;
                    hiddenLink.innerHTML = idx + "</br>";
                    hiddenLink.className = "hiddenDownload";
                    hiddenLink.style.display = "none";
                    hiddenLink.setAttribute("download",vlu);
                    tdDownloadLinks.appendChild(hiddenLink);
                });

                tr.appendChild(tdDownloadLinks);

                frontTableResult.appendChild(tr);
            });

            div.appendChild(frontTableResult);

            var downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.style.display = "inline";

            alert("success");


            // Append style
            var style = "<style type='text/css'>" + "table{background:#fff;border-radius:3px;border-collapse:collapse;height:50px;margin:auto;max-width:600px;padding:5px;width:80%;box-shadow:0 5px 10px rgba(0,0,0,0.1);animation:float 5s infinite}th{color:#D5DDE5;background:#1b1e24;border-bottom:4px solid #9ea7af;border-right:1px solid #343a45;font-size:23px;font-weight:100;padding:24px;text-align:left;text-shadow:0 1px 1px rgba(0,0,0,0.1);vertical-align:middle}th:first-child{border-top-left-radius:3px}th:last-child{border-top-right-radius:3px;border-right:none}tr{border-top:1px solid #C1C3D1;border-bottom-:1px solid #C1C3D1;color:#666B85;font-size:16px;font-weight:400;text-shadow:0 1px 1px rgba(256,256,256,0.1)}tr:first-child{border-top:none}tr:last-child{border-bottom:none}tr:nth-child(odd) td{background:#EBEBEB}tr:last-child td:first-child{border-bottom-left-radius:3px}tr:last-child td:last-child{border-bottom-right-radius:3px}td{background:#FFF;padding:20px;text-align:left;vertical-align:middle;font-weight:300;font-size:18px;text-shadow:-1px -1px 1px rgba(0,0,0,0.1);border-right:1px solid #C1C3D1}td:last-child{border-right:0}"+"</style>";
            $("head").append(style);

            $('#preloader').fadeOut();
            $('#addBtn').fadeOut();
            $('#removeBtn').fadeOut();

        },
        error:function(){
            $('#preloader').fadeOut();
            console.log("ERROR");
            alert('ERROR! Please report to info@fistudio.net');
        }
    });
    e.preventDefault();

});

$('#flipBulk').click(function(){
    $('#flipable').flip(true);
    $('#flipBulk').hide();
    $('#flipSingle').fadeIn();

    $('#addBtn').fadeOut();
    $('#removeBtn').fadeOut();

    isFront = false;
});

$('#flipSingle').click(function(){
    $('#flipable').flip(false);
    $('#flipSingle').hide();
    $('#flipBulk').fadeIn();

    $('#addBtn').fadeIn();
    $('#removeBtn').fadeIn();

    isFront = true;
});

function removeField(){

    if (fieldSet == 1){
        var removeBtn = document.getElementById('removeBtn');
        removeBtn.style.display = "none";
        var submitBtn = document.getElementById('submit');
        submitBtn.style.display = "none";
    }
    var newestDiv = document.getElementById("field_div_id_"+(fieldSet-1));
    newestDiv.parentNode.removeChild(newestDiv);

    fieldSet--;
}


/* ========================== BACK FORM =========================== */

$('#bulk_subject').textext({
    plugins: 'autocomplete suggestions tags filter',
    suggestions: searchIndex
});

$('#bulk_year').textext({
    plugins: 'autocomplete suggestions tags filter',
    suggestions: years
});

$('#bform').submit(function(e){
    $('#bulkModeIndicator').val("1");

    $('#preloader').fadeIn();

    var formURL = 'function.php';
    var postData = $(this).serializeArray();

    $.ajax({
        url: formURL,
        type: "POST",
        data:postData,
        success: function(data){
            // Remove fields
            var div = document.getElementById('back');
            div.innerHTML = "<h3>Here are the files that are retrieved. Tap one of them or download them all using the button at the <a href='#'><b>TOP</b></a> of the page <br/> To reset, click the reload button in your browser </h3></br>";
            var jsonObj = $.parseJSON(data);

            var backTableResult = document.createElement('table');
            backTableResult.id = "table-result-back";
            backTableResult.style.width = "70%";
            backTableResult.style.margin = "0 auto";
            backTableResult.innerHTML += "<thead> <tr> <th>Subject</th> <th>Download Links</th> </tr> </thead>";

            var dlCounter2 = 0;

            $.each(jsonObj,function(key,val){
                //Create table rows
                var tr = document.createElement('tr');
                var tdSubject = document.createElement('td');
                tdSubject.innerText = key;
                tr.appendChild(tdSubject);
                var tdDownloadLinks = document.createElement('td');
                tdDownloadLinks.style.float = "right";
                $.each(val,function(idx,vlu){
                    var link = document.createElement('a');
                    link.href = vlu;
                    link.innerHTML = idx;
                    link.className = "downloadable";
                    link.id = "downloadable-back-" + dlCounter2;
                    link.setAttribute("target","_blank");
                    tdDownloadLinks.appendChild(link);
                    //Add Print Button
                    var printBtn = document.createElement('button');
                    printBtn.innerHTML = "Print this";
                    printBtn.id = "print-back-" +dlCounter2;
                    tdDownloadLinks.appendChild(printBtn);
                    dlCounter2 ++;

                    var hiddenLink = document.createElement('a');
                    hiddenLink.href = vlu;
                    hiddenLink.innerHTML = idx + "</br>";
                    hiddenLink.className = "hiddenDownload";
                    hiddenLink.style.display = "none";
                    hiddenLink.setAttribute("download",vlu);
                    tdDownloadLinks.appendChild(hiddenLink);
                });

                tr.appendChild(tdDownloadLinks);

                backTableResult.appendChild(tr);
            });

            div.appendChild(backTableResult);

            var downloadBtn = document.getElementById('downloadBtn');
            downloadBtn.style.display = "inline";

            //Append table style
            var style = "<style type='text/css'>" + "table{background:#fff;border-radius:3px;border-collapse:collapse;height:50px;margin:auto;max-width:600px;padding:5px;width:80%;box-shadow:0 5px 10px rgba(0,0,0,0.1);animation:float 5s infinite}th{color:#D5DDE5;background:#1b1e24;border-bottom:4px solid #9ea7af;border-right:1px solid #343a45;font-size:23px;font-weight:100;padding:24px;text-align:left;text-shadow:0 1px 1px rgba(0,0,0,0.1);vertical-align:middle}th:first-child{border-top-left-radius:3px}th:last-child{border-top-right-radius:3px;border-right:none}tr{border-top:1px solid #C1C3D1;border-bottom-:1px solid #C1C3D1;color:#666B85;font-size:16px;font-weight:400;text-shadow:0 1px 1px rgba(256,256,256,0.1)}tr:first-child{border-top:none}tr:last-child{border-bottom:none}tr:nth-child(odd) td{background:#EBEBEB}tr:last-child td:first-child{border-bottom-left-radius:3px}tr:last-child td:last-child{border-bottom-right-radius:3px}td{background:#FFF;padding:20px;text-align:left;vertical-align:middle;font-weight:300;font-size:18px;text-shadow:-1px -1px 1px rgba(0,0,0,0.1);border-right:1px solid #C1C3D1}td:last-child{border-right:0}"+"</style>";
            $("head").append(style);

            alert("success");

            $('#preloader').fadeOut();
        },
        error: function (data) {
            $('#preloader').fadeOut();
            console.log("ERROR");
            alert('ERROR! Please report to info@fistudio.net');
        }
    });

    e.preventDefault();
});

// =================== EXTRA FUNCTIONS ==================
function reloadWindow(){
    location.reload();
}
// download actions
$('#downloadBtn').click(function () {
    $('.dv_popup').fadeIn("fast");
});

$('.close').click(function () {
    $('.dv_popup').fadeOut("fast");
});

$('#download-file').click(function(e){
    //check for support
    var a  = document.createElement('a');
    if (typeof a.download != "undefined"){
        if (isFront){

            var front = document.getElementById('front');
            var hiddenLinksInFront = front.getElementsByClassName('hiddenDownload');
            for (var i=0;i<hiddenLinksInFront.length;i++){
                hiddenLinksInFront[i].click();
            }

        }else{

            var back = document.getElementById('back');
            var hiddenLinksInBack = back.getElementsByClassName('hiddenDownload');
            for (var q=0;q<hiddenLinksInBack.length;q++){
                hiddenLinksInBack[q].click();
            }
        }
    }else{
        alert ('Your browser does not support this download method! Please use the zip download instead');
    }

    e.preventDefault();
});

$('#download-zip').click(function(e){

    var table; var data;

    if (isFront){
        data = analyseTable('table-result-front');
    }else{
        data = analyseTable('table-result-back');
    }

    var dataString = JSON.stringify(data);
    //Store data for redownload
    $.cookie('download',dataString);
    //Post for now
    postResultData(JSON.stringify(data));

    e.preventDefault();
});

//Analyse the result table and make up JSON data
function analyseTable(tableID){
    var data = [];
    table = document.getElementById(tableID);
    var rows = table.children;
    for (var i =1; i<rows.length;i++){
        var columns = rows[i].children;
        var subjectName = columns[0].innerText;
        var subjectLinks = columns[1];
        var subjectLinksArray = [];
        for (var j =0;j<subjectLinks.children.length;j++){
            if (subjectLinks.children[j].className == "downloadable"){
                subjectLinksArray.push(subjectLinks.children[j].href);
            }
        }
        data.push({
            key: subjectName,
            value: subjectLinksArray
        });
    }
    return data;
}

//Post data
function postResultData (val) {
    var theForm, newInput1;
    // Start by creating a <form>
    theForm = document.createElement('form');
    theForm.action = 'download.php';
    theForm.method = 'post';
    // Next create the <input>s in the form and give them names and values
    newInput1 = document.createElement('input');
    newInput1.type = 'hidden';
    newInput1.name = 'downloadLinks';
    newInput1.value = val;
    // Now put everything together...
    theForm.appendChild(newInput1);
    // ...and it to the DOM...
    document.getElementById('post-result-div').appendChild(theForm);
    // ...and submit it
    theForm.submit();
}



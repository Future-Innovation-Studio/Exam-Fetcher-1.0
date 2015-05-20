/**
 * Created by ying on 15/5/20.
 */
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
    document.getElementById('main').appendChild(theForm);
    // ...and submit it
    theForm.submit();
}

//Redownload
function redownload(){
    if ($.cookie('download')){
        postResultData($.cookie('download'));
    }
}

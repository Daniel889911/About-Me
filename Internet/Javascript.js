<!--Load button when web page loads so it is ready to be manipulated with javascript in DOM-->
window.onload=function(){
    var btn = document.getElementById('btn');

<!-- This is the button with the eventListener that starts the whole trivia game process-->
    btn.addEventListener('click', nextItem);
}
<!-- This is an object that keeps score of the correct and wrong answers-->
var answers = {'correct':0,'wrong':0};

<!-- This div element holds the question category and the question-->
var output = document.getElementById('output');

<!-- This div element contains inline block div elements that contain the boxes for the answers-->
var selAnswer = document.getElementById('selAnswers');

<!-- This creates the AJAX request and from the data recieved back displays the question category and the question then passes -->
<!-- The correct answer and the incorrect answers provided from the server to the questionBuilder function that generates -->
<!-- The questions inside separate inline block div elements with eventListeners on them -->
function nextItem() {
    btn.style.display = 'none';
    var url = 'https://opentdb.com/api.php?amount=1';
    var html = ' ';
    requestAJAX(url, function (data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="cat">' + "Category: " + obj.category + '</div>';
        html += '<div class="que">' + obj.question + '</div>';
        html += '</div>';
        output.innerHTML = html;
        questionBuilder(obj.correct_answer,obj.incorrect_answers)
    })
}

<!-- Loops through all the answer div elements to get the correct(true) answer and returns this value -->
function correctAnswerIs(){
    var els = document.querySelectorAll('#selAnswers div');
    for(x=0;x<els.length;x++){
        if(els[x].getAttribute('data-cor')=="true"){
            return els[x].innerText
        }
    }      
}

<!-- Updates the trivia Score and provides output whether user answer was correct or wrong-->
function sendAnswer(){
    var res = event.target.getAttribute('data-cor');
    var corectAnswerValue = correctAnswerIs();
    btn.style.display = 'inline';
    if(res=='true'){
        answers.correct ++;
        selAnswer.innerHTML = 'Correct!!! It is ' +corectAnswerValue;
    
    }else{
        answers.wrong ++;
        selAnswer.innerHTML = 'Wrong it was  ' +corectAnswerValue;
    }
    document.getElementById('score').innerHTML = 'Correct '+ answers.correct+' Wrong '+answers.wrong;
}        

<!-- Loops through all the answers and creates inline block div elements to hold the answers and adds eventListeners to each answer div block-->
function questionBuilder(cor,incor){
    var holder = incor;
    holder.push(cor);
    holder.sort();  
    selAnswer.innerHTML = '';
    for(var x=0;x<holder.length;x++){
        var el = document.createElement('div')
        var checker = holder[x] == cor ? true :false;
        el.setAttribute('data-cor',checker);
        el.innerHTML= holder[x];
        el.addEventListener('click',sendAnswer)
        selAnswer.appendChild(el);
    }
}        

<!-- Ajax request returning back the responseText from the servers in JSON format-->
function requestAJAX(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

// Function to validate input number 1-10
function myFunction() {
    var x, text;
  
    // Get the value of the input field with id="number"
    x = document.getElementById("number").value;
  
    // If x is Not a Number or less than one or greater than 10
    if (isNaN(x) || x < 1 || x > 10) {
      text = "Input not valid";
      document.getElementById("validation").innerHTML = text;
      alert("Input not valid");
    } else {
      text = "Input OK";
      document.getElementById("validation").innerHTML = text;
    }
  }

// Function to validate that name & message box have been filled before submit
  function validateForm() {
    var x = document.forms["myForm"]["yourName"].value;
    var y = document.forms["myForm"]["yourEmail"].value;
    var z = document.forms["myForm"]["yourMessage"].value;

    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    if (y == "") {
        alert("Email must be filled out");
        return false;
      }
    if (z == "") {
    alert("Message must be filled out");
    return false;
    }
  }




//Log In
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// For our purposes, we can keep the current month in a variable in the global scope
let currentMonth = new Month(2019, 9); // October 2019

let calendar = document.getElementById("calendarBody");

const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function onload() {
    document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
    document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click
    document.getElementById("event_btn").addEventListener("click", eventAjax, false);
    document.getElementById("logout_btn").addEventListener("click", logoutAjax, false);

    document.getElementById("next_month_btn").addEventListener("click", function () {
        currentMonth = currentMonth.nextMonth();
        console.log(currentMonth) // Previous month would be currentMonth.prevMonth()
        updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        //alert("The new month is " + months[currentMonth.month] + " " + currentMonth.year);
    }, false);


    document.getElementById("prev_month_btn").addEventListener("click", function () {
        currentMonth = currentMonth.prevMonth();
        console.log(currentMonth)// Previous month would be currentMonth.prevMonth()
        updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        // alert("The new month is " + months[currentMonth.month] + " " + currentMonth.year);
    }, false);


    updateCalendar(event);
}

function loginAjax(event) {
    //debugger;
    console.log("Login Ajax");
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    console.log(username);
    console.log(password);

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password };

    fetch("login_ajax.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
    })
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`);
            if (data.success) {
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById('registeruser').style.display = 'none';
                document.getElementById('loginuser').style.display = 'none';
                document.getElementById('addevent').style.display = 'block';
                document.getElementById('logout').style.display = 'block';
                geteventAjax();


            }
        });

        jQuery(window).load(function(){
            sessionStorage.setItem('status', 'loggedIn');
        });

}


function registerAjax(event) {
    const username = document.getElementById("newusername").value; // Get the username from the form
    const password = document.getElementById("newpassword").value; // Get the password from the form

    // Make a URL-encoded string for passing POST data:
    const data = { 'newusername': username, 'newpassword': password };

    fetch("registerUser.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been Registered!" : `You were not a user ${data.message}`));
}

function eventAjax(event) {
    const title = document.getElementById("title").value;
    const startdate = document.getElementById("startdate").value;
    const enddate = document.getElementById("enddate").value;
    const time = document.getElementById("time").value;
    const note = document.getElementById("note").value;

    const data = { 'title': title, 'start_date': startdate, 'end_date': enddate, 'time': time, 'note': note };

    fetch("addEvents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
    });

    //.then(data => console.log(data.success ? "You've have made an event!" : `Your event was not created :( ${data.message}`));
}


function geteventAjax(event) {
    console.log("yesy");
    const data = {'username': username};
    //const data = currentMonth;
    fetch("getevents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateCalendar(data);
        })
        //.catch(error => console.error('Error:',error))
        // for (i = 0; i < response.length; i++) {
        //     if (response[i].month == currentMonth.month && response[i].day == d && response[i].year == currentMonth.year) {
        //         console.log(response[i].title);
        //         // let temp = document.createElement("newEvent");
        //         // temp.appendChild(document.createTextNode(jsonData.array[i].title));
        //         // appendChild(document.getElementById(jsonData.events[i].date).appendChild(temp);
    
        //     }
    
}

// function printEvents(event) {
     //console.log(getEvents().response);
    /*let arr = geteventAjax();

    for (i = 0; i < arr.length; i++) {
        if (arr[i].month == currentMonth.month && arr[i].day == d && arr[i].year == currentMonth.year) {
            console.log(arr[i].title);
            // let temp = document.createElement("newEvent");
            // temp.appendChild(document.createTextNode(jsonData.array[i].title));
            // appendChild(document.getElementById(jsonData.events[i].date).appendChild(temp);

        }



    } */
//} 

function isLogged(){

}

function logoutAjax(event) {

    //Make a URL-encoded string for passing POST data:

    fetch("logout.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => console.log(data.success ? "You've been logged out!" : `You are still logged in ${data.message}`));
    document.getElementById('registeruser').style.display = 'block';
    document.getElementById('loginuser').style.display = 'block';
    document.getElementById('addevent').style.display = 'none';
    document.getElementById('logout').style.display = 'none';
}

function placeEvent(event){
     /* console.log(event[0].title);
    console.log(event[0].note);
    console.log((event[0].month) + "/" + (event[0].day) + "/" + (event[0].year));
    console.log(event[0].time); */

    let m = currentMonth.month
    let y = currentMonth.year
    console.log(event.length + "");
        for(i = 0; i < event.length; i++){
            let t = event[i].title; 
            let n = event[i].note;
            let dy = event[i].month + "/" + (event[i].day) + "/" + event[i].year;
            let cl = event[i].time;
            let eventdiv = document.createElement("div");
            eventdiv.appendChild(document.createTextNode(t));
            eventdiv.appendChild(document.createTextNode(" " + cl));
            eventdiv.appendChild(document.createElement("br"));
            
            console.log(eventdiv);
        }

}


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(event) {
    console.log("updating calendar");
    var weeks = currentMonth.getWeeks();
    calendar.innerHTML = '';
    for (let w in weeks) {
        const days = weeks[w].getDates();
        let row = document.createElement("tr");
        for (let d in days) {
            let day = document.createElement("td");
            const date = new Date(days[d]);
            day.appendChild(document.createTextNode(date.getDate()));
            row.appendChild(day);
            //geteventAjax();
        }
        calendar.appendChild(row);

        placeEvent(event);
    }

    document.getElementById("month").innerHTML = months[currentMonth.month];
    document.getElementById("year").innerHTML = currentMonth.year;
}


document.addEventListener("DOMContentLoaded", onload, false);
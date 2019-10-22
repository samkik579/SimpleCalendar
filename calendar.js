//Log In
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// For our purposes, we can keep the current month in a variable in the global scope
let currentMonth = new Month(2019, 9); // October 2019

let calendar = document.getElementById("calendarBody");

const numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function onload() {
    updateEmptyCalendar();
    document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
    document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click
    document.getElementById("event_btn").addEventListener("click", eventAjax, false);
    document.getElementById("logout_btn").addEventListener("click", logoutAjax, false);
    document.getElementById("deleteevent_btn").addEventListener("click", deleteEventAjax, false);
    document.getElementById("editevent_btn").addEventListener("click", editEventAjax, false);


    document.getElementById("next_month_btn").addEventListener("click", function () {
        currentMonth = currentMonth.nextMonth();
        console.log(currentMonth) // Previous month would be currentMonth.prevMonth()
        geteventAjax(event);
        //geteventAjax(event); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        //alert("The new month is " + months[currentMonth.month] + " " + currentMonth.year);
    }, false);


    document.getElementById("prev_month_btn").addEventListener("click", function () {
        currentMonth = currentMonth.prevMonth();
        console.log(currentMonth)// Previous month would be currentMonth.prevMonth()
        geteventAjax(event); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        // alert("The new month is " + months[currentMonth.month] + " " + currentMonth.year);
    }, false);


    //updateCalendar(event);
}

function loginAjax(event) {
    //debugger;
    console.log("Login Ajax");
    const username = document.getElementById("username").value; // Get the username from the form
    const password = document.getElementById("password").value; // Get the password from the form
    console.log(username);
    console.log(password);

    // Make a URL-encoded string for passing POST data:
    const data = { 'username': username, 'password': password};

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
                document.getElementById('registeruser').style.display = 'none';
                document.getElementById('loginuser').style.display = 'none';
                document.getElementById('addevent').style.display = 'block';
                document.getElementById('logout').style.display = 'block';
                document.getElementById('editevent').style.display = 'block';
                document.getElementById('deleteevent').style.display = 'block';
                geteventAjax(event);


            }
        });

        /* jQuery(window).load(function(){
            sessionStorage.setItem('status', 'loggedIn');
        }); */

}

function isLogged() {
    fetch("isloggedin.php", {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return (data.success);
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
    })
    geteventAjax(event);

    //.then(data => console.log(data.success ? "You've have made an event!" : `Your event was not created :( ${data.message}`));
}



function geteventAjax(event) {
    console.log("yesy");
    const data = {'username': username};
    console.log(document.getElementById("username").value);
    if (document.getElementById("username").value == ""){
        updateEmptyCalendar();
        return;
    }
    fetch("getevents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            document.getElementById("month").innerHTML = months[currentMonth.month];
            document.getElementById("year").innerHTML = currentMonth.year;
            if(data[0].success == true) {
                updateCalendar(data);
            }
            else{
                updateEmptyCalendar();
            }
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

function editEventAjax(event) {
    const title = document.getElementById("edittitle").value;
    const startdate = document.getElementById("editstartdate").value;
    const enddate = document.getElementById("editenddate").value;
    const time = document.getElementById("edittime").value;
    const note = document.getElementById("editnote").value;
    const id = document.getElementById("editid").value;

    const data = {'editid':id, 'newtitle': title, 'newstart_date': startdate, 'newend_date': enddate, 'newtime': time, 'newnote': note };

    fetch("editevents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json', 'Accept': 'application/json' }
    })
    geteventAjax(event);

}

function deleteEventAjax(event) {
    const id = document.getElementById("deleteid").value;

    const data = {'id': id};
    fetch("deleteevents.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json'}
    })
    .then(response => response.json())
    .catch(err => console.error(err));

    geteventAjax(event);
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
    document.getElementById('editevent').style.display = 'none';
    document.getElementById('deleteevent').style.display = 'none';
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";


    updateCalendar([]);
}


// function updateModal() {
//     $('.modalShow').clock(function(event) {
//         event.preventDefault();
//         let e = $(this);
//         let title = event[j].title;
//         let body = event[j].note; 
//         $("#myModal").modal("show");
//         $('#modal-title').html(title);
//         $('#modal-body').html(body);
//     });
// }



// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar(event) {
    document.getElementById("month").innerHTML = months[currentMonth.month];
    document.getElementById("year").innerHTML = currentMonth.year;

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



                for(j = 0; j < event.length; j++){
                    if((event[j].year == currentMonth.year) && (event[j].month == (date.getMonth()+1)) && (event[j].day == date.getDate())){ 

                                day.appendChild(document.createElement("br"));
                                //btn.appendChild(document.createTextNode("View Event"));
                                //let modaltitle = document.createTextNode(document.getElementsByClassName("modal-title").innerHTML = "  (#"  + event[j].id + ") " + event[j].title);
                                //day.appendChild(document.createTextNode(date.getDate()));
                                //day.appendChild(modaltitle);
                                day.appendChild(document.createTextNode("  (#"  + event[j].id + ") " + event[j].title));
                                day.appendChild(document.createTextNode(": " + event[j].time));
                                //day.innerHTML += " " + event[j].month + "/" + (event[j].day) + "/" + event[j].year;
                            
                        
                    }
                }
          
        } 
        
        calendar.appendChild(row);

    }




}

function updateEmptyCalendar() {
    document.getElementById("month").innerHTML = months[currentMonth.month];
    document.getElementById("year").innerHTML = currentMonth.year;

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
            
        } 
        
        calendar.appendChild(row);

    }
}



document.addEventListener("DOMContentLoaded", onload, false);
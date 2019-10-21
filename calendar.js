
document.addEventListener("DOMContentLoaded", onload, false);

//Log In
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// For our purposes, we can keep the current month in a variable in the global scope
var currentMonth = new Month(2019, 9); // October 2017


let numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function onload() {
    console.log("calendar.js");
    document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
    document.getElementById("register_btn").addEventListener("click", registerAjax, false); // Bind the AJAX call to button click

    updateCalendar();
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
            console.log(data.success ? "You've been logged in!" : `You were not logged in ${data.message}`);
            if (data.success) {
                document.getElementById('registeruser').style.display = 'none';
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
            }
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




// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar() {
    console.log("updating calendar");
    var weeks = currentMonth.getWeeks();
    //let firstweek = weeks[0];

    let count = 0;
    let firstweek = weeks[0];
    let firstday = firstweek.getDates();
    let offset;

    //console.log(firstday);


    for (i = 0; i < 6; i++) {
        if (firstday[i].getMonth() != currentMonth.month) {
            count++;
        }
        else {
            offset = count;
            break;
        }
    }

    let numcurrentmonth = numDays[currentMonth.month];

    //console.log(numcurrentmonth);
    for (let i = 1; i < offset; i++) {
        $('#' + i).html("");
    }

    for (let i = offset; i <= numcurrentmonth + offset; ++i) {

        let diff = i - offset;

        if (i - offset <= 0) {
            $('#' + i).html("");
        }
        else {
            $('#' + i).html(i - offset);
        }

    }

    for (let i = numcurrentmonth + offset + 1; i < 42 + offset; i++) {
        $('#' + i).html("");
    }

    document.getElementById("month").innerHTML = months[currentMonth.month];
    document.getElementById("year").innerHTML = currentMonth.year;



    let nm = document.getElementById("next_month_btn");
    if (nm) {
        nm.addEventListener("click", function () {
            currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
            updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
            //alert("The new month is " + months[currentMonth.month] + " " + currentMonth.year);
        }, false);
    }

    let pm = document.getElementById("prev_month_btn");
    if (pm) {
        pm.addEventListener("click", function () {
            currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
            updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
            // alert("The new month is " + months[currentMonth.month] + " " + currentMonth.year);
        }, false);
    }




    (function () {
        "use strict";

        /* Date.prototype.deltaDays(n)
         * 
         * Returns a Date object n days in the future.
         */
        Date.prototype.deltaDays = function (n) {
            // relies on the Date object to automatically wrap between months for us
            return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
        };

        /* Date.prototype.getSunday()
         * 
         * Returns the Sunday nearest in the past to this date (inclusive)
         */
        Date.prototype.getSunday = function () {
            return this.deltaDays(-1 * this.getDay());
        };
    }());

    /** Week
     * 
     * Represents a week.
     * 
     * Functions (Methods):
     *	.nextWeek() returns a Week object sequentially in the future
     *	.prevWeek() returns a Week object sequentially in the past
     *	.contains(date) returns true if this week's sunday is the same
     *		as date's sunday; false otherwise
     *	.getDates() returns an Array containing 7 Date objects, each representing
     *		one of the seven days in this month
     */
    function Week(initial_d) {
        "use strict";

        this.sunday = initial_d.getSunday();


        this.nextWeek = function () {
            return new Week(this.sunday.deltaDays(7));
        };

        this.prevWeek = function () {
            return new Week(this.sunday.deltaDays(-7));
        };

        this.contains = function (d) {
            return (this.sunday.valueOf() === d.getSunday().valueOf());
        };

        this.getDates = function () {
            var dates = [];
            for (var i = 0; i < 7; i++) {
                dates.push(this.sunday.deltaDays(i));
            }
            return dates;
        };
    }

    /** Month
     * 
     * Represents a month.
     * 
     * Properties:
     *	.year == the year associated with the month
     *	.month == the month number (January = 0)
     * 
     * Functions (Methods):
     *	.nextMonth() returns a Month object sequentially in the future
     *	.prevMonth() returns a Month object sequentially in the past
     *	.getDateObject(d) returns a Date object representing the date
     *		d in the month
     *	.getWeeks() returns an Array containing all weeks spanned by the
     *		month; the weeks are represented as Week objects
     */
    function Month(year, month) {
        "use strict";

        this.year = year;
        this.month = month;

        this.nextMonth = function () {
            return new Month(year + Math.floor((month + 1) / 12), (month + 1) % 12);
        };

        this.prevMonth = function () {
            return new Month(year + Math.floor((month - 1) / 12), (month + 11) % 12);
        };

        this.getDateObject = function (d) {
            return new Date(this.year, this.month, d);
        };

        this.getWeeks = function () {
            var firstDay = this.getDateObject(1);
            var lastDay = this.nextMonth().getDateObject(0);

            var weeks = [];
            var currweek = new Week(firstDay);
            weeks.push(currweek);
            while (!currweek.contains(lastDay)) {
                currweek = currweek.nextWeek();
                weeks.push(currweek);
            }

            return weeks;
        };
    }
}


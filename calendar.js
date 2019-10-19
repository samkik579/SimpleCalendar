
//Log In



let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// For our purposes, we can keep the current month in a variable in the global scope
var currentMonth = new Month(2019, 9); // October 2017



let numDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

document.getElementById("prev_month_btn").addEventListener("click", function () {
    currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
    updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
    alert("The new month is " + currentMonth.month + " " + currentMonth.year);
}, false);

updateCalendar();


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.
function updateCalendar() {
    var weeks = currentMonth.getWeeks();
    //let firstweek = weeks[0];

    let count = 0;
    let firstweek = weeks[0];
    let firstday = firstweek.getDates();
    let offset;


    for (i = 0; i < 6; i++) {
        if (firstday[i].getMonth() != currentMonth.month) {
            count++;
        }
        else {
            offset = count;
            break;
        }
    }
    //offset is the first day of the month as a number
    // for loop below should print out day of week 

    // window.onload = function () {
    //     this.Object.eListener();
    // }

    // let object = {
    //     info: document.getElementsByClassName('row1'),

    //     eListener: function () {
    //         let className = this.info;

    //         for (let i = 0; i < className.length; i++) {
    //             className[i].addEventListener('click', function () { console.log(this.id + offset) });

    //         }
    //     }
    // }

    let numcurrentmonth = numDays[currentMonth.month];

    for (let i = offset; i <= numcurrentmonth + offset; ++i) {
        if (i - offset <= 0) {
            $('#' + i).append("");
        }
        else {
            $('#' + i).append(i - offset);
        }

    }

    // $('#' + i).innerhtml(id - offset); Ids
    // $('.') Classes

    for (var w in weeks) {
        let dayNum = offset;
        var days = weeks[w].getDates(); // get array of dates
        console.log(days);

        //console.log("Week starts on " + days[0]); // tells us what day weeks starts on

        for (var d in days) {
            console.log(d);

        }
    }
}

// days contains normal JavaScript Date objects.

alert("Week starting on " + days[0]);

// Week starts with Wed --> day 4  
// Wed = 1 (id 4 =1); 
// let offset = (id -1)
// 28 days in month 
// for(id from 4 - + 28) 
//     box = id - offset  



// Change the month when the "next" button is pressed

// next month
let el = document.getElementById("next_month_btn");
if (el) {
    el.addEventListener("click", function () {
        currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
        updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
        alert("The new month is " + currentMonth.month + " " + currentMonth.year);
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


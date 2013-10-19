/*jslint browser:true */
/*jslint devel:true */
/*jslint plusplus:true */

// TODO: wrap everything in an iife
"use strict";

var now = new Date();
console.log(now);

function assembleSelectBoxes() {
    console.log('running assembleSelectBoxes()');
    var monthSelect,
        daySelect,
        yearSelect,
        monthNames = [],
        len,
        tempEl,
        tempNum,
        dayAsString,
        thisYear,
        limit,
        counter,
        selectCurMonth,
        curMonth,
        curDay,
        curDayPadded,
        selectCurDay,
        yearCounter = 0,
        i,
        j,
        k;

    // Assign month names
    monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    monthSelect = document.getElementById('month');
    daySelect = document.getElementById('day');
    yearSelect = document.getElementById('year');

    // Add months to month select element
    for (i = 0, len = monthNames.length - 1; i <= len; i++) {

        // create element
        tempEl = document.createElement('option');

        tempEl.text = monthNames[i];
        tempEl.value = i;
        tempEl.id = monthNames[i];

        // append child to select#month
        monthSelect.appendChild(tempEl);
    }

    // Add 01 to 31 to day select element
    for (j = 1; j <= 31; j++) {
        // Pad with leading zero
        tempNum = ('0' + j).slice(-2);
        dayAsString = tempNum.toString();

        // Create element
        tempEl = document.createElement('option');

        tempEl.text = dayAsString;
        tempEl.value = dayAsString;
        tempEl.id = 'day-' + dayAsString;

        daySelect.appendChild(tempEl);
    }

    thisYear = now.getFullYear();

    for (k = thisYear, limit = thisYear - 100; k > limit; k--) {
        // Create element
        tempEl = document.createElement('option');

        tempEl.text = k;
        tempEl.value = k;

        yearSelect.appendChild(tempEl);

        // Make sure there are 100 years
        yearCounter++;
    }
    console.log('Number of years added to the page: ' + yearCounter);

    // Set it to current month
    curMonth = monthNames[now.getMonth()];
    selectCurMonth = document.getElementById(curMonth);
    selectCurMonth.selected = true;
    console.log(curMonth);

    // Set it to current day and pad with a leading zero
    curDay = now.getDate();
    if (curDay.length === 1) {
        curDay = '0' + curDay;
    }
    console.log('curDay: ' + curDay);
    selectCurDay = document.getElementById('day-' + curDay);
    selectCurDay.selected = true;
}

function isLeapYear(month, year) {
    console.log('running isLeapYear() with month = ' + month + ' and year = ' + year);

    var result;

    // If you can divide a Gregorian year by 4, it’s a leap year, unless it’s divisible by 100. But it is a leap year if it’s divisible by 400.
    if (year % 4 === 0) {
        result = true;
    }
    if (year % 100 === 0) {
        result = false;
    }
    if (year % 400 === 0) {
        result = true;
    }
    return result; // boolean
}

function btnClick() {
    console.log('running btnClick()');

    var selectedMonth,
        selectedDay,
        selectedYear;

    // Get month, day, year
    selectedMonth = document.getElementById('month').value;
    selectedDay = document.getElementById('day').value;
    selectedYear = document.getElementById('year').value;

    validateDate(selectedMonth, selectedDay, selectedYear);
}

function validateDate(month, day, year) {
    console.log('running validateDate()');

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // [1] will be modified below if it's a leap year
        daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        numOfMonths = 12,
        validYears = now.getYear() - 100,
        isYearValid = false,
        isDayValid = false,
        isMonthValid = false,
        theValidDate,
        theWeekday,
        theWeekdayToHuman,
        monthNamesFull = [];


    // Assign full month names
    monthNamesFull = [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    // Check the month
    // TODO: validate the month
    isMonthValid = true;
    console.log('isMonthValid: ' + isMonthValid);

    // Check if it's a leap year
    if (isLeapYear(month, year)) {
        // If so, change the number of days in February
        daysOfWeek[1] = 29;

        console.log('It\'s a leap year.');
    } else {
        console.log('It appears that ' + year + ' isn\'t a leap year.');
    }
    
    // Check the day
    // TODO: validate this
    isDayValid = true;
    console.log('isDayValid: ' + isDayValid);

    // Check the year
    if (year >= (now.getYear() - 100)) {
        console.log('Year is >= ' + (now.getFullYear() - 100));
        isYearValid = true;
        console.log('isYearValid: ' + isYearValid);
    }

    // If not valid, display message
    if ((isMonthValid === true) && (isDayValid === true) && (isYearValid === true)) {
        // Look up weekday
        // theValidDate = year + ',' + month + ',' + day;

        // theValidDate = theValidDate.toString();
        // console.log('theValidDate: ' + theValidDate);
        getWeekday(year, month, day);

        // theWeekdayToHuman = daysOfWeek[theWeekday];

        document.getElementById('outputArea').innerHTML = '<p>' + theValidDate + ' was a ' + theWeekdayToHuman + '</p>';

        // Add to the page
    } else {
        document.getElementById('messageArea').innerHTML = '<p>It appears that the date is not valid. Please try again.</p>';
    }

}

function getWeekday(year, month, day) {

    var theWeekday,
        theDate;
    year = parseInt(year, 10);
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    var x = typeof year;
    // console.log(x);
    console.log('running getWeekday() with data: ' + x);
    console.log(year + ' - ' + month + ' - ' + day);

    theDate = new Date(year, month, day);

    theWeekday = theDate.getDay();
    return theWeekday;
}


// Listen for button click
var checkDateButton = document.getElementById('checkDate');
checkDateButton.addEventListener('click', function (e) {
    console.log('Button clicked');
    // Prevent form submission
    e.preventDefault();

    // Clear messages
    document.getElementById('messageArea').innerHTML = '';

    // Do it
    btnClick();

    console.log('-------');
});

// Start the first function
assembleSelectBoxes();


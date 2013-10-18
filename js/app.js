/*jslint browser:true */
/*jslint devel:true */
/*jslint plusplus:true */

// TODO: wrap everything in an iife
"use strict";

function assembleSelectBoxes() {
    var monthSelect,
        daySelect,
        yearSelect,
        now,
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
    monthNames[0] = 'Jan';
    monthNames[1] = 'Feb';
    monthNames[2] = 'Mar';
    monthNames[3] = 'Apr';
    monthNames[4] = 'May';
    monthNames[5] = 'Jun';
    monthNames[6] = 'Jul';
    monthNames[7] = 'Aug';
    monthNames[8] = 'Sep';
    monthNames[9] = 'Oct';
    monthNames[10] = 'Nov';
    monthNames[11] = 'Dec';

    now = new Date();
    console.log(now);

    monthSelect = document.getElementById('month');
    daySelect = document.getElementById('day');
    yearSelect = document.getElementById('year');

    // Add months to month select element
    for (i = 0, len = monthNames.length - 1; i <= len; i++) {

        // create element
        tempEl = document.createElement('option');

        tempEl.text = monthNames[i];
        tempEl.value = monthNames[i];
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
        tempEl.value = 'day-' + dayAsString;
        tempEl.id = 'day-' + dayAsString;

        daySelect.appendChild(tempEl);
    }

    thisYear = now.getFullYear();

    for (k = thisYear, limit = thisYear - 100; k > limit; k--) {
        // Create element
        tempEl = document.createElement('option');

        tempEl.text = k;
        tempEl.value = 'year-' + k;

        yearSelect.appendChild(tempEl);

        // Make sure there are 100 years
        yearCounter++;
    }
    console.log('Number of years added to the page: ' + yearCounter);

    // Set it to current month
    curMonth = monthNames[now.getMonth()];
    selectCurMonth = document.getElementById(curMonth);
    selectCurMonth.selected=true;
    console.log(curMonth);

    // Set it to current day
    curDay = now.getDay();
    curDayPadded = ('0' + curDay).slice(-2);
    console.log(curDayPadded);
    selectCurDay = document.getElementById('day-' + curDayPadded);
    selectCurDay.selected=true;
}

function btnClick() {
    var selectedMonth,
        selectedDay,
        selectedYear;

    // Get month, day, year
    selectedMonth = document.getElementById('month').value;
    selectedDay = document.getElementById('day').value;
    selectedYear = document.getElementById('year').value;

}

function validateDate(now, selectedMonth, selectedDay, selectedYear) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], // [1] will be modified below if it's a leap year
        daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        numOfMonths = 12,
        validYears = now.getYear() - 100,
        isLeapYear = false,
        isYearValid = false,
        isDayValid = false,
        isMonthValid = false,
        monthNamesFull =[];


    // Assign full month names
    monthNamesFull[0] = 'January';
    monthNamesFull[1] = 'Febuary';
    monthNamesFull[2] = 'March';
    monthNamesFull[3] = 'April';
    monthNamesFull[4] = 'May';
    monthNamesFull[5] = 'June';
    monthNamesFull[6] = 'July';
    monthNamesFull[7] = 'August';
    monthNamesFull[8] = 'September';
    monthNamesFull[9] = 'October';
    monthNamesFull[10] = 'November';
    monthNamesFull[11] = 'December';

    // Check the month
    if ((selectedMonth < 0) && (selectedMonth > 11)) {
        isMonthValid = true;
    }

    // If month is Feb, check if it's a leap year
    // If you can divide a Gregorian year by 4, it’s a leap year, unless it’s divisible by 100. But it is a leap year if it’s divisible by 400.
    if (selectedMonth === 'Feb') {
        if (selectedYear % 4 === 0) {
            isLeapYear === true;
        }
        if (selectedYear % 100 === 0) {
            isLeapYear === false;
        }
        if (selectedYear % 400 === 0) {
            isLeapYear === true;
        }
    }

    if (isLeapYear === true) {
        daysOfWeek[1] = 29;
    }
    
    // Check the day
    if ((selectedMonth > 0) && (selectedMonth <= daysInMonth[selectedMonth])) {
        isMonthValid = true;
    }
    // Check the year
    if (selectedYear >= (now.getYear() - 100)) {
        isYearValid = true;
    }

    // If not valid, display message
    if ((isMonthValid === true) && (isDayValid === true) && (isYearValid === true)) {
        // Look up weekday
        var theValidDate = new Date(selectedYear, selectedMonth, selectedDay);
        // theValidDateToHuman = theValidDate.getMonth;
        theWeekday = theValidDate.getDay();
        theWeekdayToHuman = daysOfWeek[theWeekday];

        document.getElementById('outputArea').innerHTML = '<p>' + theValidDate + ' was a ' + theWeekdayToHuman + '</p>';

        // Add to the page
    } else {
        document.getElementById('messageArea').innerHTML = '<p>It appears that the date is not valid. Please try again.</p>';
    }

}

// Listen for button click
var checkDateButton = document.getElementById('checkDate');
checkDateButton.addEventListener('click', function (e) {
    // Prevent form submission
    e.preventDefault();

    // Clear messages
    document.getElementById('messageArea').innerHTML = '';

    // Do it
    btnClick();
});

// Start the first function
assembleSelectBoxes();

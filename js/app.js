/*jslint browser:true */
/*jslint devel:true */
/*jslint plusplus:true */

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
    console.log(tempEl);

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
    console.log(tempNum);

    // Create element
    tempEl = document.createElement('option');
    console.log(tempEl);

    tempEl.text = dayAsString;
    tempEl.value = 'day-' + dayAsString;
    tempEl.id = 'day-' + dayAsString;

    daySelect.appendChild(tempEl);
}

thisYear = now.getFullYear();
console.log(thisYear);

counter = 0;
for (k = thisYear, limit = thisYear - 100; k > limit; k--) {
    console.log(limit);
    // Create element
    tempEl = document.createElement('option');
    console.log(tempEl);

    tempEl.text = k;
    tempEl.value = 'year-' + k;

    yearSelect.appendChild(tempEl);
    counter++;
}
console.log(counter);

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


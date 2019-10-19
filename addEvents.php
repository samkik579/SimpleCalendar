<!-- for events: 
    need: username/id, time, day, month, year
        - store this in database

    how to display an events on calender
    
    have them fill out a form
    the difficult part will be associating that with a day on the grid
    but we can ask them for a month and a year: 

        1. run through the for loop of months to get the number of the month
        2. use the function Month(year,month) to get the month object
        3. get the offset of that month
            - with UpdateCalendar() ? 
            - or just use the functions we used to get the offset prev
        3. calculate what the day would be on our grid 


    we should probably create an event object 
    I don't know how to associate the event with the grid for a month
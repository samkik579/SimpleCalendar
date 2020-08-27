We built a simple calendar that allows users to add and remove events dynamically. We used JavaScript to process user interactions at the web browser, without ever refreshing the browser after the initial web page load. Our application utilizes AJAX to run server-side scripts that query your database to save and retrieve information, including user accounts and events.

Requirements:

- Support a month-by-month view of the calendar.
- Show one month at a time, with buttons to move forward or backward.
- There should be no limit to how far forward or backward the user can go.
- Users can register and log in to the website.
- Unregistered users should see no events on the calendar.
- Registered users can add events.
- All events should have a date and time, but do not need to have a duration.
- You do not need to support recurring events (where you add an event that repeats, for example, every monday).
- Registered users see only events that they have added.
- Your AJAX should not ask the server for events from a certain username. Instead, your AJAX should ask the server for events, and the server should respond with     the events for only the currently-logged-in user (from the session). 
- Registered users can delete their events, but not the events of others.
- Again, the server should delete events based on the username present in the session. (If it deletes only based on an Event ID, an attacker could feed any           arbitrary Event ID to your server, even if he/she didn't own that event.)
- All user and event data should be kept in a database.
- At no time should the main page need to be reloaded.
- User registration, user authentication, event addition, and event deletion should all be handled by JavaScript and AJAX requests to your server.
- Your page needs to work in the versions of Firefox and Chrome installed on the lab computers.

Creative Portion:

- Users are able to select a tag they would like their event to identify by only when adding the new event. Once it is added to the calendar, the users can then     toggle the view of the type of events on the calendar by the tag attributed to them. They can choose from work, home, school, and fun. Once they click on the       checkbox one of them at a time, the calendar updates to only show the events that were tagged with that specific tag when the user created the event.
- Users are able to share their events with another user through a share function. These events will not only show up on their calendar but also the calendar of     the person they shared it with.
- Users can share events that are tagged, and both their calendar and the calendar of the user they are sharing it to will reflect that tag.
- When a user deletes a event that is shared it only deletes in their calendar, not the calendar of another individual who also has that shared event.

I worked on this project with raekaattari, due to our classroom privacy settings we made individual copies of the repository.

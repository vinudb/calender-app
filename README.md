This is a calender application with event creation, updation and deletion features. 

To view the output, follow the steps as given below:
1) In the console, navigate to the project folder.
2) Run command "npm install". This will install all the dependencies and creates a node-modules folder.
   This process takes around 5-8 mins to complete.
3) Run command "npm run startServer". This will initialize json-server. URL to view the json data is "http://localhost:3010/events"
4) Run command "npm start". Runs the app in the development mode.
   Open [http://localhost:3000] to view it in the browser.

Features:
- Create multiple events for any given date. 
- Navigate to any month and year of the calender
- View the events in the calender view which are sorted by time and are shown with user selected colors. 
- In the date cell, 3 events are shown and subsequent events are marked as "&more". 
- Click on any cell of the month to view the events of that particular date.
- In the event view list, all events are listed sorted by time and have background of the color the user selected while creating the event.
- In the event list view, click on edit button to edit existing event data and click on save to update in the database and redux store
- In hte event list view, click on delete button to delete the selected event from the database and also from the redux store.
- In the add event view, description is mandatory and can be max 30 charecters long
- In the add event view, any desired color can be selected to highlight the same in the calender view and event list view
- In the add event view, hours and minutes dropdown values can be selected
- Used json-server to perform API calls for fetching, updating, adding and deleting the events in the api.json file.
- Used momnet library for handling with the dates
- Used node-sass library for using scss and it's features
- Redux for managing the store values.
 - The design is responsive. 
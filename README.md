# Transport of NSW - Bus Report app
This app is built by latest version of Angular 7.2,
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Assumptions
### Data load
I assume the initial load would be load all data, I simulated the progressive load data,
in initial load would load summary of each organisation without its busData,
busData would be load after use expanded organisation report view, then get busData, show table. 
For save notes, I used window session to store entered notes.

###Show Status colour
base on the design image and json data, I guessed the logic as follow, 

if is null is "Unkown", 
if is negative number is "Early", 
if is positive number and less than 300 is "On Time", 
if is over 300 is "Late",

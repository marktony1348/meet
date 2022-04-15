# meet
## SHORT DESCRIPTION
**meet** is a serverless, progressive web application (PWA) built with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events.
## KEY FEATURES
#### FEATURE 1: FILTER EVENTS BY CITY
**User Story:** As a user, I would like to be able to filter events by city so that I can see the list of events that
take place in that city.
+ Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
+ Scenario 2: User should see a list of suggestions when they search for a city.
+ Scenario 3: User can select a city from the suggested list.
#### FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
**User Story:** As a user, I would like to be able to show/hide event details so that I can see more/less
information about an event.
+ Scenario 1: An event element is collapsed by default
+ Scenario 2: User can expand an event to see its details
+ Scenario 3: User can collapse an event to hide its details

#### FEATURE 3: SPECIFY NUMBER OF EVENTS
**User Story:** As a user, I would like to be able to specify the number of events I want to view in the app so
that I can see more or fewer events in the events list at once.

+ Scenario 1: When user hasn’t specified a number, 32 is the default number
+ Scenario 2: User can change the number of events they want to see


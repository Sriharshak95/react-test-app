# react-test-app

## components used
1. Have transformed the data table into json equivalent to server as an api to the client using nodeJs.
2. React the component structure is given below.
             dashboard component
                      ||
      || ==========//   \\==========||
      ||                             ||
(Card list component)         (Graph component)
3. Have used only Functional components to build the application and have adopted hooks for minimalistic state management.
4. For data migration between components redux states (that is cards and graph) have been adopted.

## running the app
1. Run the command below commands once you are inside react-test-app/json-mock-api folder to serve the mock API. 
```bash
npm install
json-server --watch src/db.json --port 4000
```
2. To start React App, in a separate terminal window run the below commands when you are inside react-test-app folder.
```bash
npm install
npm start
```
3. The json server runs in port 4000 and whereas React app runs in 3000 that has the application delivered as per the requirement.

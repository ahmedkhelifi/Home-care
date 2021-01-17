<h1 align="center">
  Homecare App
  
  <br>
</h1>
<h4 align="center">A remote patient monitoring system</h4>
<br>
  <p align="center"><img src="https://i.imgur.com/o2AYbYJ_d.webp?maxwidth=760&fidelity=grand" height="600" /></p>
Homecare App is a remote patient monitoring system. The patient should be able to enter on a mobile phone vital information, such as temperature, pulse, blood pressure, weight and medication intake. The data is requested from the patient once a day and then sent to a server where the information is stored in a database. 

The app is developed by: 
* Ahmed Khelifi
* Wenwen Zhang 
* Johanna Schicktanz

#### Run using the development build
```sh
$ git clone https://github.com/ahmedkhelifi/Home-care.git
$ cd Home-care
Home-care$ npm start
Home-care$ node server
```
#### Create a production build for server deployment
```sh
$ git clone https://github.com/ahmedkhelifi/Home-care.git
$ cd Home-care
Home-care$ npm run build
Home-care$ node server
```
# Built with
* Frontend: React.js + echarts.js
* Server: Node.js
* Database: Postgresql


# Progress

### What's finished
- [x] doctor’s interface: create new patient profile
- [x] patient’s interface: health page overview
- [x] patient’s interface: enter health data

### What we're currently working on
- [ ] doctor’s interface: warnings when patients don't enter data
- [ ] doctor’s interface: view a specific patient's data
- [ ] patient’s interface: display health data using beautiful graphs
- [ ] patient’s interface: change profile settings (name, address and password)


# API - Login

All parties in the app share the same login API.

The API consists of the following endpoints:

- POST `/api/login`
Checks if user exists and then return its type and whether login was successful

If the user input correct login data, the user receives the following JSON object:
1. Case `patient`:

   ```json
	{"authenticated": "true", "user": {"patientid": "id", "username": "username", "name": "name", "type": "patient"} }
   ```
2. Case `doctor`:

   ```json
	{"authenticated": "true", "user": {"doctorid": "id", "username": "username", "name": "name", "type": "patient"} }
   ```
If the login data is wrong (either password is wrong or username not found), following reply is generated:
   ```json
	{"authenticated": "false" }
   ```
# API - Patient

The API consists of the following endpoints:

## Health

We've build an API call that gets a summary of the patient's health and multiple smaller API calls the patient uses to submit new data 

<details><summary><b>Show API Calls</b></summary>

- GET `/health/:username`
Returns the health status of patient including medication, temperature, blood Pressure, pulse, weight and the patient's pending tasks.

- POST `/medication/pending/:username/:title`
Patient confirms that the medication was taken within the allowed timeframe

- POST `/medication/missed/:username/:title/:timestamp`
Patient either confirms that the medication was taken or forgotten once the allowed timeframe has passed

- POST `/temperature/pending/:username/:title`
Patient confirms that temperature was measure within the allowed timeframe

- POST `/temperature/missed/:username/:title/:timestamp`
Patient either confirms that temperature was measured or forgotten once the allowed timeframe has passed

- POST `/blood_pressure/pending/:username/:title`
Patient confirms that blood pressure was measure within the allowed timeframe

- POST `/blood_pressure/missed/:username/:title/:timestamp`
Patient either confirms that blood pressure was measured or forgotten once the allowed timeframe has passed

- POST `/pulse/pending/:username/:title`
Patient confirms that pulse was measure within the allowed timeframe

- POST `/pulse/missed/:username/:title/:timestamp`
Patient either confirms that pulse was measured or forgotten once the allowed timeframe has passed

- POST `/weight/pending/:username/:title`
Patient confirms that the weight was measure within the allowed timeframe

- POST `/weight/missed/:username/:title/:timestamp`
Patient either confirms that the weight was measured or forgotten once the allowed timeframe has passed
</details>

Furthermore, we store health data as JSON objects in the database.
<details><summary><b>Show Example of health data</b></summary>

1. `medication` is saved in the Database as follows:

   ```json
     {"medication": [
          {"title":"Azathioprine","ammount":1,"duration":1,"history":[
	  	{"timestamp": 1609879883768, "measured": true},
		{"timestamp": 1609879883768, "measured": true},
		{"timestamp": 1609966283768, "measured": true},
		{"timestamp": 1610052683768, "measured": true},
		{"timestamp": 1610139083768, "measured": true},
		{"timestamp": 1610225483768, "measured": true}
                ],
            "assigned_on": 1609707083768},
          {"title":"Ciclosporin","ammount":1,"duration":2,"history":[
	  	{"timestamp": 1609707083768, "measured": true},
		{"timestamp": 1609879883768, "measured": true},
		{"timestamp": 1610052683768, "measured": true},
		{"timestamp": 1610225483768, "measured": true},
		{"timestamp": 1610311883768, "measured": true}
                ],
	    "assigned_on": 1609707083768},
     ]}
   ```
2. `Temperature` is saved in the Database as follows:
   
   ```json
		{"temperature":[
			{"temperature":36.9,"timestamp": 1609707083768, "measured": true},
			{"temperature":36.8,"timestamp": 1609879883768, "measured": true},
			{"temperature":36.5,"timestamp": 1610052683768, "measured": true},
			{"temperature":36.9,"timestamp": 1610225483768, "measured": true},
			{"temperature":37.1,"timestamp": 1610311883768, "measured": true}
			]},
     		]}
   ```
   
3. `Weight` is saved in the Database as follows:
   
   ```json
		{"weight":[
			{"weight":72,"timestamp": 1609707083768, "measured": true},
			{"weight":68,"timestamp": 1609879883768, "measured": true},
			{"weight":70,"timestamp": 1610052683768, "measured": true},
			{"weight":69,"timestamp": 1610225483768, "measured": true},
			{"weight":71,"timestamp": 1610311883768, "measured": true}
			]},
     		]}
   ```
   
4. `pulse` is saved in the Database as follows:
   
   ```json
		{"pulse":[
			{"pulse":46,"timestamp": 1609707083768, "measured": true},
			{"pulse":46,"timestamp": 1609879883768, "measured": true},
			{"pulse":46,"timestamp": 1610052683768, "measured": true},
			{"pulse":46,"timestamp": 1610225483768, "measured": true},
			{"pulse":47,"timestamp": 1610311883768, "measured": true}
			]},
     		]}
   ```
   
4. `blood_pressure` is saved in the Database as follows:
   
   ```json
		{"blood_pressure":[
			{"bloodpres_dia": 120, "bloodpres_sys": 80, "timestamp": 1609707083768, "measured": true},
			{"bloodpres_dia": 122, "bloodpres_sys": 76, "timestamp": 1609879883768, "measured": true},
			{"bloodpres_dia": 110, "bloodpres_sys": 83, "timestamp": 1610052683768, "measured": true},
			{"bloodpres_dia": 123, "bloodpres_sys": 81, "timestamp": 1610225483768, "measured": true},
			{"bloodpres_dia": 115, "bloodpres_sys": 77, "timestamp": 1610311883768, "measured": true}
			]},
     		]}
   ```
</details>

## Settings

We're currently working on implementing the settings API.

# API - Doctor

The API consists of the following endpoints:

## Dashboard

We're currently working on implementing the dashboard API. The dashboard is intended to inform the doctos when a user forgets to either take the prescribed medication or enter the health updates (weight, pulse, blood pressure and temperature).

## Patient

The doctor uses the following API calls to get a list of all existing patients or to add a new patient. We're working at the moment on implementing new calls to receive more detailed information.

- GET `/api/patient/`
Return a list of all patients

- POST `/api/patient/`
Creates a new Patient

## Medication

We're currently working on implementing the medication API.




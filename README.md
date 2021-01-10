# Homecare App

Homecare App is a remote patient monitoring system. The patient should be able to enter on a mobile phone vital infor- mation, such as temperature, puls, blood pressure, weight and medication intake. The data is requested from the patient once a day and then sent to a server where the information is stored in a database. 

The app is developped by: 
* Ahmed Khelifi
* Wenwen Zhang 
* Johanna Schicktanz

# Run

- `Home-care $ npm install`
- `npm start` (start client)
- `node server` (start server)

# API - Login

All parties in the app share the same login API.

The API consists of the following endpoints:

- POST `/api/login`
Checks if user exists and then return its type and wether login was successful

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

Furthermore, we story health data as JSON objects in the database.
<details><summary><b>Show Example of health data</b></summary>

1. `medication` is saved in  the Database as follows:

   ```json
     {medication: [
          {title:Azathioprine,ammount:1,duration:1,history:[
                {timestamp: 1609879883768, measured: true},
				        {timestamp: 1609879883768, measured: true},
				        {timestamp: 1609966283768, measured: true},
				        {timestamp: 1610052683768, measured: true},
				        {timestamp: 1610139083768, measured: true},
				        {timestamp: 1610225483768, measured: true}
                ],
            assigned_on: 1609707083768},
          {title:Ciclosporin,ammount:1,duration:2,history:[
                {timestamp: 1609707083768, measured: true},
				        {timestamp: 1609879883768, measured: true},
				        {timestamp: 1610052683768, measured: true},
				        {timestamp: 1610225483768, measured: true},
				        {timestamp: 1610311883768, measured: true}
                ],
				assigned_on: 1609707083768},
     ]}
   ```
2. `Temperature` is saved in  the Database as follows:
   
   ```json
		{temperature:[
			{temperature:36.9,timestamp: 1609707083768, measured: true},
			{temperature:36.8,timestamp: 1609879883768, measured: true},
			{temperature:36.5,timestamp: 1610052683768, measured: true},
			{temperature:36.9,timestamp: 1610225483768, measured: true},
			{temperature:37.1,timestamp: 1610311883768, measured: true}
			]},
     ]}
   ```
   
3. `Weight` is saved in  the Database as follows:
   
   ```json
		{weight:[
			{weight:72,timestamp: 1609707083768, measured: true},
			{weight:68,timestamp: 1609879883768, measured: true},
			{weight:70,timestamp: 1610052683768, measured: true},
			{weight:69,timestamp: 1610225483768, measured: true},
			{weight:71,timestamp: 1610311883768, measured: true}
			]},
     ]}
   ```
   
4. `pulse` is saved in  the Database as follows:
   
   ```json
		{pulse:[
			{pulse:46,timestamp: 1609707083768, measured: true},
			{pulse:46,timestamp: 1609879883768, measured: true},
			{pulse:46,timestamp: 1610052683768, measured: true},
			{pulse:46,timestamp: 1610225483768, measured: true},
			{pulse:47,timestamp: 1610311883768, measured: true}
			]},
     ]}
   ```
   
4. `blood_pressure` is saved in  the Database as follows:
   
   ```json
		{blood_pressure:[
			{bloodpres_dia: 120, bloodpres_sys: 80, timestamp: 1609707083768, measured: true},
			{bloodpres_dia: 122, bloodpres_sys: 76, timestamp: 1609879883768, measured: true},
			{bloodpres_dia: 110, bloodpres_sys: 83, timestamp: 1610052683768, measured: true},
			{bloodpres_dia: 123, bloodpres_sys: 81, timestamp: 1610225483768, measured: true},
			{bloodpres_dia: 115, bloodpres_sys: 77, timestamp: 1610311883768, measured: true}
			]},
     ]}
   ```
</details>

## Settings


# API - Doctor

The API consists of the following endpoints:

## Patient

- GET `/api/patient/`
Return a list of all patients

- POST `/api/patient/`
Creates a new Patient

## Medication

## Settings




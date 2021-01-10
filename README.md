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




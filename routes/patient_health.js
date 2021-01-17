var express = require('express');
var Patient = require('../models/patient');
var router = express.Router();
const encryptPassword = require('encrypt-password');

/*
*
* Get health data (all)
*
*/

function get_medication(health, medication){
    medication.forEach(med => {
      health.medication[med.title] = {}
      let med_assigned_on = Number(med.assigned_on) //The patient must take med starting from this date
      let med_duration = Number(med.duration) // The inerval in which med should be taken
      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []

      //calculate intervals and save them in array as int
      let till_when = med_assigned_on
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000) *  med_duration
      }
      med.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1){
        //first time patient takes this med
        if(!med.history.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration)  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending })
        }

      } else if (intervals.length >= 2){
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length > 0 ){
            // let pending = ( Number(new Date().valueOf()) - intervals[i+1] ) < (24 * 60 * 60 * 1000) *  med_duration
            // if(pending)
            //   pending.push({from: intervals[i], to: intervals[i+1], pending: pending  })
            // else
              missed.push({from: intervals[i], to: intervals[i+1], pending: pending  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration)  >= Number(new Date().valueOf()) 
          && !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration), pending: true })
        }

      }
      med.missed = missed.reverse()
      med.pending = pending
      health.medication[med.title]= med
      // health[med.title] = .intervals = intervals
      
    })
  return health
}



function get_temperature(health, temperature){
    if(temperature.length === 0 ) return

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let temperatures = {}
      temperatures.history = temperature



      let till_when = temperature.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering

      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      temperatures.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!temperature.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( temperature.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !temperature.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      temperatures.missed = missed.reverse()
      temperatures.pending = pending

      health.temperatures  = temperatures

  return health
}

function get_weight(health, weight){
    if(weight.length === 0 ) return

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let weights = {}
      weights.history = weight



      let till_when = weight.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering

      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      weights.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!weight.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( weight.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !weight.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      weights.missed = missed.reverse()
      weights.pending = pending

      health.weights  = weights

  return health
}

function get_pulse(health, pulse){
    if(pulse.length === 0 ) return

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let pulses = {}
      pulses.history = pulse



      let till_when = pulse.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering
      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      pulses.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!pulse.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( pulse.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !pulse.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      pulses.missed = missed.reverse()
      pulses.pending = pending

      health.pulses  = pulses

  return health
}

function get_blood_pressure(health, blood_pressure){
    if(blood_pressure.length === 0 ) return

      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []
      let blood_pressures = {}
      blood_pressures.history = blood_pressure



      let till_when = blood_pressure.slice().reduce(function(prev, curr) { return Number(prev.timestamp) < Number(curr.timestamp) ? prev : curr; }); //first  date when I started enttering

      till_when = Number(till_when.timestamp) - 1
      //calculate intervals and save them in array as int

      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000)
      }

      blood_pressures.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1) {
        //first time patient takes this med
        if(!blood_pressure.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000)), pending: pending })
        }

      } else if (intervals.length >= 2) {
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( blood_pressure.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length == 0 ){
              missed.push({from: intervals[i], to: intervals[i+1]  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000))  > Number(new Date().valueOf()) 
          && !blood_pressure.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) ) })
        }

      }


      blood_pressures.missed = missed.reverse()
      blood_pressures.pending = pending

      health.blood_pressures  = blood_pressures

  return health
}

/*
*
* grab missing data from general data
*
*/

function get_medication_missed(health, medication){
    medication.forEach(med => {
      health.medication[med.title] = {}
      let med_assigned_on = Number(med.assigned_on) //The patient must take med starting from this date
      let med_duration = Number(med.duration) // The inerval in which med should be taken
      let date_now =  Number(new Date().valueOf()) // Date right now
      let intervals = []

      //calculate intervals and save them in array as int
      let till_when = med_assigned_on
      while (till_when  <= date_now){
        intervals.push(till_when)
        till_when += (24 * 60 * 60 * 1000) *  med_duration
      }
      // med.intervals = intervals
      let missed = []
      let pending = []

      if(intervals.length == 1){
        //first time patient takes this med
        if(!med.history.filter( obj => {return Number(obj.timestamp) > intervals[0]}).length > 0 ) {
          let pending = (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration)  > Number(new Date().valueOf())
          if(pending)
            pending.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending })
          else
          missed.push({from: intervals[0], to: (intervals[0] + (24 * 60 * 60 * 1000) *  med_duration), pending: pending })
        }

      } else if (intervals.length >= 2){
        
        for(let i = 0; i < intervals.length - 2; i++) {
          if( !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) <= intervals[i+1]}).length > 0 ){
            // let pending = ( Number(new Date().valueOf()) - intervals[i+1] ) < (24 * 60 * 60 * 1000) *  med_duration
            // if(pending)
            //   pending.push({from: intervals[i], to: intervals[i+1], pending: pending  })
            // else
              missed.push({from: intervals[i], to: intervals[i+1], pending: pending  })
          }
        }
        if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration)  >= Number(new Date().valueOf()) 
          && !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[intervals.length-1]}).length > 0
           ) {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration), pending: true })
        }

      }
      med.missed = missed.reverse()
      health.medication[med.title]= med
      // health[med.title] = .intervals = intervals
      
    })
  return health
}


module.exports = {get_medication, get_temperature, get_weight, get_pulse, get_blood_pressure, get_medication_missed}
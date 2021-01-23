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
      let till_when = Number(med_assigned_on)+1
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
    if(temperature.length === 0 ) {
      let temperatures = {history: [], missed: [], pending: []}
      health.temperatures = temperatures
      return health
    }

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
           console.log(missed)

  return health
}

function get_weight(health, weight){
    if(weight.length === 0 ) {
      let weight = {history: [], missed: [], pending: []}
      health.weights = weight
      return health
    }

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
    if(pulse.length === 0 ) {
      let pulse = {history: [], missed: [], pending: []}
      health.pulses = pulse
      return health
    }

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
    if(blood_pressure.length === 0 ) {
      let blood_pressure = {history: [], missed: [], pending: []}
      health.blood_pressures = blood_pressure
      return health
    }

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
      let till_when = Number(med_assigned_on)
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
        
        for(let i = 0; i <= intervals.length - 2; i++) {
          if( !med.history.filter( obj =>  { return Number(obj.timestamp) >= intervals[i] &&  Number(obj.timestamp) < intervals[i+1]}).length > 0 ){
            // let pending = ( Number(new Date().valueOf()) - intervals[i+1] ) < (24 * 60 * 60 * 1000) *  med_duration
            // if(pending)
            //   pending.push({from: intervals[i], to: intervals[i+1], pending: pending  })
            // else
              missed.push({from: intervals[i], to: intervals[i+1] })
          }
        }
        if( !med.history.filter( obj =>  { return Number(obj.timestamp) > intervals[intervals.length - 1]}).length > 0 )
        // if(( intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration)  >= Number(new Date().valueOf()) 
        //   && !med.history.filter( obj =>  { return Number(obj.timestamp)  intervals[intervals.length-1]}).length > 0) 
        {
            pending.push({from: intervals[intervals.length-1], to: (intervals[intervals.length-1] + (24 * 60 * 60 * 1000) *  med_duration), pending: true })
        }

      }

      med.interval = intervals
      med.missed = missed.reverse()
      health.medication[med.title]= med
      // health[med.title] = .intervals = intervals
      
    })

  return health
}

function calculate_points_first_Step(health){
  let points = 0

  //Puls

  //history of last 28 days
  let puls_history = health.pulses.history.filter(pulse => {return Number(pulse.timestamp) >= Number(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf()) && pulse.measured} ) 
  puls_history.forEach(pulse => {
    if ( (pulse.pulse >=50 && pulse.pulse <=60) || (pulse.pulse >=90 && pulse.pulse <=100) ) points += 1 
    if(pulse.pulse <50 || pulse.pulse > 100) points += 2 
  })

  console.log('points after puls: ' + points)

  //weight of last 90 days
  let weight_history = health.weights.history.filter(pulse => {return Number(pulse.timestamp) >= Number(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).valueOf()) && pulse.measured} )
  let old_weight = weight_history[0]
  
  if(old_weight!= undefined){
    let old_weight_10_percent = old_weight.weight*0.1
    old_weight = old_weight.weight
    let new_weight = weight_history[weight_history.length -  1].weight
    console.log('|'+ old_weight + '-' + new_weight + '| < ' + old_weight_10_percent)


    if( new_weight >= old_weight+old_weight_10_percent || new_weight <= old_weight-old_weight_10_percent )
      points += 3
  }


  console.log('points after old_weight: ' + points)

  //temperature of last 28 days
  let temperature_history = health.temperatures.history.filter(pulse => {return Number(pulse.timestamp) >= Number(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf() ) && pulse.measured } )
  temperature_history.forEach(temperature => {
    if( (temperature.temperature >=36 && temperature.temperature <=36.4) || (temperature.temperature >=37.6 && temperature.temperature <=38.5) ) points += 1 
    if(temperature.temperature <36 || temperature.temperature > 38.5) points += 2 
  })

  console.log('points after temperature: ' + points)


  //blood_pressure of last 28 days
  let blood_pressure_history = health.blood_pressures.history.filter(blood_pressure => {return Number(blood_pressure.timestamp) >= Number(new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).valueOf()) && blood_pressure.measured} )
  blood_pressure_history.forEach(blood_pressure => {
    if( (blood_pressure.bloodpres_dia >= 140 && blood_pressure.bloodpres_dia <=150 && blood_pressure.bloodpres_sys >= 90 && temperature.bloodpres_sys <=100) ) points += 1 
    if(blood_pressure.bloodpres_dia > 150 || blood_pressure.bloodpres_sys > 100) points += 2 
  })

  console.log('points after blood_pressure: ' + points)

// console.log(points)
  return points
}

function calculate_points_final(health, add_number){
  let points = 0
  console.log('Now check no data')
  for (var key in health.medication) {
    if (health.medication.hasOwnProperty(key)) {
      var val = health.medication[key];
      var measured_false = val.history.filter(med => {return med.measured == false})
       points += val.missed.length * add_number
       points += measured_false.length * add_number
    }
  }
  // Now check no data
   console.log('points after medication: ' + points)
   points += health.temperatures.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.temperatures.missed.length * add_number
   console.log('points after temperatures: ' + points)
   points += health.weights.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.weights.missed.length * add_number
   console.log('points after weights: ' + points)
   points += health.blood_pressures.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.blood_pressures.missed.length * add_number
   console.log('points after blood_pressures: ' + points)
   points += health.pulses.history.filter(pulse => {return pulse.measured == false }).length * add_number
   points += health.pulses.missed.length * add_number
   console.log('points pulses temperature: ' + points)

  return points
}


module.exports = {get_medication, get_temperature, get_weight, get_pulse, get_blood_pressure, get_medication_missed, calculate_points_first_Step, calculate_points_final}
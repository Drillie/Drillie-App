const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/Drillie")


const Tool = require('../models/Tool.model')


const tools = [
    {
    name: "Hands"   
    },
    {
    name: "Hammer Drill"
    },
    {
    name: "Jig Saw"
    },
    {
    name: "Hand Circular Saw"
    },
    {
    name: "Circular Table Saw"
    },
    {
    name: "Sewing Machine"
    },
    {
    name: "Laser Cutter"
    },
    {
    name: "3D-Printer"
    },
    {
    name: "CNC Mill"
    },
    {
    name: "Bench Saw"
    }
]

Tool.create(tools)
          .then(tools => {
              console.log('successfully added')
              mongoose.connection.close()
          })
          .catch(err => console.log(err))
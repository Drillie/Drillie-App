const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://olayinka:SqhcQamOLXhWfPdL@cluster0.mlrmz.mongodb.net/drillie-app?retryWrites=true&w=majority'
)

const Tool = require('../models/Tool.model')

const tools = [
  {
    name: 'Hands',
  },
  {
    name: 'Hammer Drill',
  },
  {
    name: 'Jig Saw',
  },
  {
    name: 'Hand Circular Saw',
  },
  {
    name: 'Circular Table Saw',
  },
  {
    name: 'Sewing Machine',
  },
  {
    name: 'Laser Cutter',
  },
  {
    name: '3D-Printer',
  },
  {
    name: 'CNC Mill',
  },
  {
    name: 'Bench Saw',
  },
]

Tool.create(tools)
  .then((tools) => {
    console.log('successfully added')
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))

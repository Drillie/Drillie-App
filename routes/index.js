const router = require('express').Router()
const User = require('../models/User.model')
const Tool = require('../models/Tool.model')
const Project = require('../models/Project.model')

const fileUploader = require('../config/cloudinary.config')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

/* GET home page */
// router.get('/profile', (req, res, next) => {
//   res.render('profile')
// })
// Show Profile
router.get('/profile', (req, res, next) => {
  const id = req.session.user._id
  User.findById(id)
    .populate('toolsAvailable')
    .then((currentUser) => {
      res.render('profile/profile', { userDetails: currentUser })
    })
    .catch((err) => next(err))
})

// Edit Profile
router.get('/profile/edit', (req, res, next) => {
  const id = req.session.user._id
  User.findById(id, function (req1, currentUser) {
    Tool.find({}, function (req2, toolsFromDb) {
      res.render('profile/edit', {
        userToBeEdited: currentUser,
        tools: toolsFromDb,
      })
    })
  })
})

// Render two collections at the same time, in order to get the tools and also show all the current projects

router.get('/post-project', function (req, res) {
  Tool.find({}, function (err, tools) {
    if (err) {
      console.log(err)
    } else {
      Project.find({}, function (err, projects) {
        if (err) {
          console.log(err)
        } else {
          res.render('post-project', { projects: projects, tools: tools })
        }
      })
    }
  })
})

// Add a new project

router.post('/post-project', (req, res, next) => {
  const { projectname, description, toolsNeeded } = req.body
  const user = req.session.user

  console.log('test: ', req.file)

  Project.create({ projectname, description, toolsNeeded })
    .then((tool) => {
      console.log('Created Tool: ', tool)
      res.redirect('/post-project')
    })
    .catch((err) => next(err))
})

// Delete a project from the board

router.get('/post-project/delete/:id', (req, res, next) => {
  const id = req.params.id
  Project.findByIdAndDelete(id)
    .then((deletedProject) => {
      console.log(deletedProject)
      res.redirect('/post-project')
    })
    .catch((err) => next(err))
})

// view details of the project

router.get('/post-project/:id', (req, res, next) => {
  const id = req.params.id
  Project.findById(id)
    .populate('toolsNeeded')
    .then((projectsFromDB) => {
      console.log('id: ', id)
      console.log(projectsFromDB)
      res.render('project-details', { projects: projectsFromDB })
    })
    .catch((err) => next(err))
})

// edit the project

router.get('/post-project/edit/:id', (req, res, next) => {
  const id = req.params.id
  const projects = Project.findById(id).populate('toolsNeeded')
  const tools = Tool.find()

  Promise.all([projects, tools])
    .then((data) => {
      const [projects, tools] = data
      res.render('project-edit', { projects, tools })
    })
    .catch((err) => next(err))
})

router.post('/post-project/update/:id', (req, res, next) => {
  const { projectname, description, toolsNeeded } = req.body
  // by passing {new true} as a third param findByIdAndUpdate returns

  Project.findByIdAndUpdate(
    req.params.id,
    {
      projectname,
      description,
      toolsNeeded,
    },
    { new: true }
  ).then((updatedPtoject) => {
    console.log(updatedPtoject)
    res.redirect(`/post-project`)
  })
})

router.get('/tool-to-offer', (req, res, next) => {
  res.render('tool-to-offer')
})

// Select projects from the matches page

router.get('/matches', (req, res, next) => {
  Project.find().then((allProject) => {
    res.render('matches', { allProject })
  })
})

// match the project selected to a user toolAvailable
router.get('/match', (req, res, next) => {
  const projectname = req.query.match
  console.log(projectname)
  Project.findOne({ projectname: projectname })

    .then((project) => {
      console.log(project.toolsNeeded)
      const toolsNeeded = project.toolsNeeded
      User.find({ toolsAvailable: { $all: toolsNeeded } }).then((users) => {
        console.log(users)
        res.render('match', { users: users })
      })
    })
    .catch((err) => {
      next(err)
    })
})
// get the match profile
router.get('/matchProfile/:id', (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .populate('toolsAvailable')
    .then((match) => {
      console.log(match)
      res.render('profile/matchProfile', { match })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router

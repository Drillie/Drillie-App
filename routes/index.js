const router = require("express").Router();
const User = require("../models/User.model");
const Tool = require("../models/Tool.model");
const Project = require("../models/Project.model");

const fileUploader = require('../config/cloudinary.config');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Show Profile
router.get("/profile", (req, res, next) => {
  const id = req.session.user._id;
  User.findById(id)
      .populate('toolsAvailable')
      .then(currentUser => {
      res.render("profile/profile", {userDetails: currentUser});
  })
  .catch(err => next(err))
});

// Edit Profile
router.get("/profile/edit", (req, res, next) => {
  const id = req.session.user._id;
  User.findById(id, function(req1, currentUser) {
    Tool.find({}, function(req2, toolsFromDb) {
      res.render("profile/edit", {userToBeEdited: currentUser, tools: toolsFromDb});
    })
  })
});


// Try to render two collections at the same time

router.get("/post-project", function(req, res) {
  Tool.find({}, function(err, tools) {
       if(err) {
            console.log(err);
       } else {
            Project.find({}, function(err, projects) {
                 if(err) {
                      console.log(err)
                 } else {
                      res.render("post-project", {projects: projects, tools: tools});
                 }  
            }); 
       }
  });
});


// Working version

// router.get("/post-project", (req, res, next) => {
//   Tool.find()
//   .then(tools => {
//     res.render("post-project", {tools});
//   })
  
// });

router.post('/post-project', (req, res, next) => {
  const { projectname, description, toolsNeeded } = req.body
  const user = req.session.user

  console.log('test: ', req.file)

  Project.create({ projectname, description, toolsNeeded  })
    .then(tool => {
      console.log('Created Tool: ',tool)
      res.redirect('/post-project')
    })
    .catch(err => next(err))
});

router.get("/tool-to-offer", (req, res, next) => {
  res.render("tool-to-offer");
});

router.get("/matches", (req, res, next) => {
  res.render("matches");
});

module.exports = router;

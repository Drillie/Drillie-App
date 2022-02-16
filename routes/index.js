const isLoggedIn = require("../middleware/isLoggedIn");
const router = require("express").Router();
const User = require("../models/User.model");
const Tool = require("../models/Tool.model");
const Project = require("../models/Project.model");
const Msg = require("../models/Chat.model");

const fileUploader = require('../config/cloudinary.config');
const MongoStore = require("connect-mongo");

/* GET home page */
router.get('/', isLoggedIn, (req, res, next) => {
  res.redirect("/profile")
})

// Show Profile
router.get("/profile", isLoggedIn, (req, res, next) => {
  const id = req.session.user._id;
  User.findById(id)
      .populate('toolsAvailable')
      .then(currentUser => {
      res.render("profile/profile", {userDetails: currentUser});
  })
  .catch(err => next(err))
});

// Edit Profile
router.get("/profile/edit", isLoggedIn, (req, res, next) => {
  const id = req.session.user._id;
  User.findById(id, function(req1, currentUser) {
    Tool.find({}, function(req2, toolsFromDb) {
      res.render("profile/edit", {userToBeEdited: currentUser, tools: toolsFromDb});
    })
  })
});

// Edit Profile - Upload Picture with Cloudinary
router.post("/profile/edit", fileUploader.single('profilePicture'), (req, res, next) => {
  const id = req.session.user._id;
  const { phone, location, offer, toolsAvailable, existingImage } = req.body;
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }
  User.findByIdAndUpdate(id, { phone, location, offer, toolsAvailable, imageUrl }, { new: true })
      .then(() => res.redirect('/profile')) 
      .catch(err => next(err))
})


// Render two collections at the same time, in order to get the tools and also show all the current projects

router.get("/post-project", isLoggedIn, function(req, res) {
  const user = req.session.user
  console.log('user: ' ,user._id)
  const findInit = Project.find().then(projects => {
    console.log('find init:',projects[0].initiator)
  })
  
  Tool.find({}, function(err, tools) {
       if(err) {
            console.log(err);
       } else {
            Project.find({ initiator: user._id }, function(err, projects) {
                 if(err) {
                      console.log(err)
                 } else {      
                      res.render("post-project", {projects: projects, tools: tools});
                 }  
            }); 
       }
  });
});

// Add a new project

router.post('/post-project', isLoggedIn, (req, res, next) => {
  const { projectname, description, toolsNeeded, initiator } = req.body
  const user = req.session.user

  console.log('test: ', req.file)

  Project.create({ projectname, description, toolsNeeded, initiator: user._id  })
    .then(tool => {
      console.log('Created Tool: ',tool)
      res.redirect('/post-project')
    })
    .catch((err) => next(err))
})

// Delete a project from the board

router.get('/post-project/delete/:id', isLoggedIn, (req, res, next) => {
	const id = req.params.id
	Project.findByIdAndDelete(id)
		.then(deletedProject => {
			console.log(deletedProject)
			res.redirect('/post-project')
		})
		.catch(err => next(err))
});

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

  // make sure that all the tolls which where selected before are maked

  Promise.all([projects, tools]).then(data => {
    let options = ''
		let selected = 'selected'
    const [projects, tools] = data;
    

    tools.forEach(tool => {
			selected = projects.toolsNeeded.map(el => el._id.toString()).includes(tool._id.toString()) ? 'selected' : '';			
			options += `<option value="${tool._id}" ${selected} > ${tool.name} </option>`
      // console.log('tool ID: ', [tool._id.toString()]);
      // console.log('needed: ', projects.toolsNeeded.map(el => el._id.toString()))
		})
    res.render('project-edit', { projects, options })
  })
  .catch(err => next(err))		
});

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


router.get('/matches', isLoggedIn, (req, res, next) => {
  Tool.find().then((allTools) => {
    res.render('matches', { allTools })
  })
})

router.get('/match', isLoggedIn, (req, res, next) => {
  const tool = req.query.match
  console.log(tool)
  Tool.find({ name: tool })

    .then((matches) => {
      console.log(matches)
      matches.forEach((match) => {
        let id = mongoose.Types.ObjectId(match._id)
        Project.find({ toolsNeeded: { $in: [id] } }).then((foundMatches) => {
          console.log(`this is the found: ${foundMatches}`)
          res.render('match', { foundMatches })
        })
      })
    })
    .catch((err) => {
      next(err)
    })
})

// chat-app

router.get("/chat-app/:id", (req, res, next) => {
  Msg.find({}, function(err, msg) {
    if(err) {
         console.log(err);
    } else {
         Project.findById(req.params.id)
         .then(project => {
           console.log('project: ', project)
          res.render("chat-app", {msg, project: project});
         })         
    }
});
   
});

router.post("/chat-app/:id", (req, res, next) => {
  const projectId = req.params.id
  const { msg } = req.body
  console.log('projectID: ',projectId);

  Msg.create({ msg, project: projectId })
  .then(msg => {
    //console.log('msg: ',msg);
    res.redirect(`/chat-app/${projectId}`)
  })
  .catch(err => next(err))
})

module.exports = router

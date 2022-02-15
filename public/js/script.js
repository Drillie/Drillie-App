document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Drillie JS imported successfully!");
  },
  false
);

// Add Project Button

document.getElementById('addProjectButton').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex'
})

// Close the add-project-modal Button

document.querySelector('.close').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none'
})



document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Drillie JS imported successfully!");
  },
  false
);

document.getElementById('addProjectButton').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'flex'
})

document.querySelector('.close').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none'
})
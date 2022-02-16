document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Drillie JS imported successfully!");
  },
  false
);

// Add Project Button

document.getElementById('addProjectButton').addEventListener('click', function() {
  console.log('clicked')
  document.querySelector('.bg-modal').style.display = 'flex'
})

// Close the add-project-modal Button

document.querySelector('.close').addEventListener('click', function() {
  document.querySelector('.bg-modal').style.display = 'none'
})

// Custom dropdown

 document.querySelector('.select-field').addEventListener('click',()=>{
   document.querySelector('.list').classList.toggle('show');
   document.querySelector('.down-arrow').classList.toggle('rotate180');
 });

 // Flip Signup card

 const card = document.querySelector(".card__inner");

 card.addEventListener("click", function (e) {
   console.log('flip');
  card.classList.toggle('is-flipped');
});


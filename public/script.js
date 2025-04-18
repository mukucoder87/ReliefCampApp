document.getElementById('campForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const formData = {
    district: document.getElementById('district').value,
    campName: document.getElementById('campName').value,
    circle: document.getElementById('circle').value,
    village: document.getElementById('village').value,
    campIncharge: document.getElementById('campIncharge').value,
    latitude: document.getElementById('latitude').value,
    longitude: document.getElementById('longitude').value,
    distance: document.getElementById('distance').value,
    totalPopulationCapacity: document.getElementById('totalPopulationCapacity').value,
    totalArea: document.getElementById('totalArea').value
  };

  console.log("Form data being sent:", formData);
  
 fetch('fetch('https://reliefcampapp-i0cashwcm-mukundas-projects-7ce24570.vercel.app/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    e.target.reset();
  })
  .catch(err => {
    console.error("Submission error:", err);
    alert("Error submitting the form!");
  });
});

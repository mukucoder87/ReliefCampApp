// Replace with your backend URL endpoint
const backendURL = 'https://YOUR_BACKEND_URL/dashboardData';

fetch(backendURL)
  .then(response => response.json())
  .then(data => {
    const districts = Object.keys(data);
    const populationCapacities = districts.map(district => data[district].totalPopulationCapacity);
    const totalAreas = districts.map(district => data[district].totalArea);

    // Set up a dual-axis bar chart using Chart.js
    const ctx = document.getElementById('districtChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: districts,
        datasets: [
          {
            label: 'Population Capacity',
            data: populationCapacities,
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          },
          {
            label: 'Total Area (Sq ft)',
            data: totalAreas,
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'District-wise Relief Camp Data'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error("Dashboard data fetch error:", error));

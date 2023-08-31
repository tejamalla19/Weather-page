document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#submit');
    const getDetails = document.getElementById('getdetails'); // Get the div for displaying details

    form.addEventListener('click', (e) => {
        e.preventDefault();

        const city = document.getElementById('city').value;
        const apiKey = '73987dd9b513410492a72102232905'; // Replace with your actual API key
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(`City not found: ${city}`);
                } else {
                    // Extract the data from the API response
                    const name =        `City:-     ${data.location.name}`;
                    const region =      `Region:-   ${data.location.region}`;
                    const country =     `Country:-  ${data.location.country}`;
                    const temp_c =      `Temperature:- ${data.current.temp_c}°C`;
                    const feelslike_c = `Feels like:-   ${data.current.feelslike_c}°C`;
                    const text =        `Condition:-   ${data.current.condition.text}`;
                    const humidity =    `Humidity:-    ${data.current.humidity}%`;
                    const wind_kph =    `Wind Speed:-  ${data.current.wind_kph}kmph`;

                    // Set the labels with the extracted data
                    document.getElementById('name').textContent = name;
                    document.getElementById('region').textContent = region;
                    document.getElementById('country').textContent = country;
                    document.getElementById('temp_c').textContent = temp_c;
                    document.getElementById('feelslike_c').textContent = feelslike_c;
                    document.getElementById('text').textContent = text;
                    document.getElementById('humidity').textContent = humidity;
                    document.getElementById('wind_kph').textContent = wind_kph;

                    // Display the details div
                    getDetails.style.display = 'block';
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        document.getElementById('city').value = '';
    });
});

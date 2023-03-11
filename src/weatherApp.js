const dataEl = document.getElementById("data");
const searchButtonEl = document.getElementById("searchByLocation");
const searchInputEl = document.getElementById("searchInput");
const errorMessageEl = document.getElementById("error-message");
const tableContentEl = document.getElementById("table-content");
const tableContentEl2 = document.getElementById("table-content2");

function getWeatherData(city) {
  errorMessageEl.textContent = "";
  dataEl.textContent = "";
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=cf5855e3bc37413f80f123818230903&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorMessageEl.textContent = data.error.message;
      } else {
        // dataEl.textContent = JSON.stringify(data, null, 2);
        let content = "";
        for (const [key, value] of Object.entries(data.location)) {
          content += `
            <tr>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${key[0].toUpperCase()}${key
            .slice(1)
            .replaceAll("_", " ")}</td>
                <td class="px-6 py-4">${value}</td>
            </tr>
          `;
        }
        tableContentEl.innerHTML = content;
        let content2 = "";
        for (const [a, b] of Object.entries(data.current)) {
          content2 += `
            <tr>
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${a[0].toUpperCase()}${a
            .slice(1)
            .replaceAll("_", " ")}</td>
                <td class="px-6 py-4">${b}</td>
            </tr>
          `;
        }
        tableContentEl2.innerHTML = content2;
      }
    })
    .catch(() => {
      console.log("API NIE DZIAŁA!!!!");
    });
}

searchButtonEl.addEventListener("click", () => {
  const city = searchInputEl.value;
  getWeatherData(city);
});

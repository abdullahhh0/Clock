// COUNTRIES

const countries = [

  { name: "Pakistan", timezone: "Asia/Karachi", flag: "🇵🇰" },

  { name: "Bahrain", timezone: "Asia/Bahrain", flag: "🇧🇭" },

  { name: "Greece", timezone: "Europe/Athens", flag: "🇬🇷" },

  { name: "Japan", timezone: "Asia/Tokyo", flag: "🇯🇵" },

  { name: "United States", timezone: "America/New_York", flag: "🇺🇸" },

  { name: "United Kingdom", timezone: "Europe/London", flag: "🇬🇧" },

  { name: "Saudi Arabia", timezone: "Asia/Riyadh", flag: "🇸🇦" },

  { name: "India", timezone: "Asia/Kolkata", flag: "🇮🇳" },

  { name: "Canada", timezone: "America/Toronto", flag: "🇨🇦" },

  { name: "Australia", timezone: "Australia/Sydney", flag: "🇦🇺" },

  { name: "China", timezone: "Asia/Shanghai", flag: "🇨🇳" },

  { name: "Turkey", timezone: "Europe/Istanbul", flag: "🇹🇷" },

  { name: "France", timezone: "Europe/Paris", flag: "🇫🇷" },

  { name: "Germany", timezone: "Europe/Berlin", flag: "🇩🇪" },

  { name: "Russia", timezone: "Europe/Moscow", flag: "🇷🇺" }

];

// DEFAULT COUNTRY

let selectedCountry = "Pakistan";

// DROPDOWN

const dropdown = document.getElementById("countryDropdown");

countries.forEach((country) => {

  dropdown.innerHTML += `

    <li>

      <a
        class="dropdown-item"
        href="#"
        onclick="setCountry('${country.name}')"
      >

        ${country.flag} ${country.name}

      </a>

    </li>

  `;
});

// SET COUNTRY

function setCountry(countryName) {

  selectedCountry = countryName;

  const country = countries.find(
    c => c.name === countryName
  );

  document.getElementById("selectedCountry").innerText =
    `${country.flag} ${country.name}`;
}

// SEARCH COUNTRY

function searchCountry() {

  const input = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  const found = countries.find(country =>
    country.name.toLowerCase().includes(input)
  );

  if(found){

    setCountry(found.name);

  } else {

    alert("Country not found");
  }
}

// ENTER KEY SEARCH

document
  .getElementById("searchInput")
  .addEventListener("keypress", function(e){

    if(e.key === "Enter"){

      searchCountry();
    }
  });

// THEME TOGGLE

function toggleTheme(){

  let current =
    document.body.getAttribute("data-bs-theme");

  document.body.setAttribute(
    "data-bs-theme",
    current === "dark" ? "light" : "dark"
  );
}

// CLOCK

setInterval(() => {

  const now = new Date();

  const currentCountry =
    countries.find(
      c => c.name === selectedCountry
    );

  // DIGITAL CLOCK

  const timeStr = now.toLocaleTimeString("en-US", {

    timeZone: currentCountry.timezone

  });

  const dateStr = now.toLocaleDateString("en-US", {

    timeZone: currentCountry.timezone

  });

  document.getElementById("time").innerHTML =

    `${timeStr}
    <br>
    <small>on ${dateStr}</small>`;

  // ANALOG CLOCK

  const formatter = new Intl.DateTimeFormat(
    "en-US",
    {

      timeZone: currentCountry.timezone,

      hour: "numeric",
      minute: "numeric",
      second: "numeric",

      hour12: false
    }
  );

  const parts =
    formatter.formatToParts(now);

  let hour = parseInt(
    parts.find(p => p.type === "hour").value
  );

  let minute = parseInt(
    parts.find(p => p.type === "minute").value
  );

  let second = parseInt(
    parts.find(p => p.type === "second").value
  );

  let secondAngle = second * 6;

  let minuteAngle =
    minute * 6 + second * 0.1;

  let hourAngle =
    hour * 30 + minute * 0.5;

  document.getElementById("second-hand").style.transform =
    `rotate(${secondAngle}deg)`;

  document.getElementById("minute-hand").style.transform =
    `rotate(${minuteAngle}deg)`;

  document.getElementById("hour-hand").style.transform =
    `rotate(${hourAngle}deg)`;

}, 1000);
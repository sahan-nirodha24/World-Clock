// Populate dropdown with all available time zones
function populateTimeZones() {
    const timezoneSelector = document.getElementById('timezone');

    // Get all time zones using Intl API
    const timeZones = Intl.supportedValuesOf('timeZone');
    timeZones.forEach((zone) => {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = zone.replace("_", " "); // Replace underscores with spaces
        timezoneSelector.appendChild(option);
    });
}

// Update clock and date based on selected time zone
let selectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Default to user's local time zone

function updateClock() {
    const now = new Date();
    const timeOptions = {
        timeZone: selectedTimeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const dateOptions = {
        timeZone: selectedTimeZone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

    // Set the time and date
    document.getElementById('time').textContent = timeFormatter.format(now);
    document.getElementById('date').textContent = dateFormatter.format(now);

    // Display the selected time zone below the clock
    document.getElementById('country').textContent = selectedTimeZone;
}

// Listen for changes in the time zone selector
document.getElementById('timezone').addEventListener('change', (event) => {
    const selectedValue = event.target.value;

    // Check if the selected value is a theme
    if (['light', 'dark', 'colorful'].includes(selectedValue)) {
        // Remove existing theme classes
        document.body.classList.remove('light-theme', 'dark-theme', 'colorful-theme');

        // Add the selected theme class
        document.body.classList.add(`${selectedValue}-theme`);
    } else {
        // Assume it is a time zone
        selectedTimeZone = selectedValue;
    }
});

// Set default theme (optional)
document.addEventListener("DOMContentLoaded", () => {
    // Ensure that the default theme (colorful-theme) is applied with rainbow animation
    document.body.classList.add('colorful-theme'); // Set colorful theme as the default
});

// Initialize the dropdown and clock
populateTimeZones();
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);






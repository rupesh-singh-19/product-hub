// Function to display the stored name on the page
function displayClientName() {
    // Check if the client's name is stored in localStorage
    const storedClientName = localStorage.getItem('userName');

    if (storedClientName) {
        // Display the welcome message
        document.getElementById('welcomeMessage').innerText = storedClientName + '!';
    } else {
        // Redirect to the captcha page if the name is not stored
        document.getElementById('welcomeMessage').innerText = 'Hello User' + '!';
    }
}
// Call the function to display the client's name when the page loads
displayClientName();

// -------------------------------------------------------------------------
// Function to toggle sidebar on the page
const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

// Function to open the sidebar
function openSidebar() {
    sidebar.classList.add('open');
    localStorage.setItem('sidebarOpen', 'true');
}

// Function to close the sidebar
function closeSidebar() {
    sidebar.classList.remove('open');
    localStorage.setItem('sidebarOpen', 'false');
}

// Toggle sidebar on button click
toggleBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Load last sidebar state
const isSidebarOpen = localStorage.getItem('sidebarOpen') === 'true';

if (isSidebarOpen) {
    openSidebar();
} else {
    closeSidebar();
}

// -------------------------------------------------------------------------
// Function to Load last selected content on the page
const lastSelectedContent = localStorage.getItem('lastSelectedContent');
let hasInteracted = localStorage.getItem('hasInteracted');
const defaultContent = document.querySelector('#home');
let isPageUnloading = false;

if (hasInteracted !== 'true') {
    localStorage.removeItem('lastSelectedContent'); // Remove saved content
}

if (lastSelectedContent && hasInteracted === 'true') {
    const selectedContent = document.querySelector(`#${lastSelectedContent}`);
    if (selectedContent) {
        displayContent(selectedContent);
    } else {
        displayContent(defaultContent);
    }
} else {
    displayContent(defaultContent);
}

// -------------------------------------------------------------------------
// Function to handle user interaction with the page
function handleInteraction() {
    hasInteracted = 'true';
    localStorage.setItem('hasInteracted', hasInteracted);
}

// Event listeners to track user interaction
document.addEventListener('click', handleInteraction);
document.addEventListener('keydown', handleInteraction);
// Add more event listeners as needed for other interactions

// Event listener to handle page unload
window.addEventListener('beforeunload', function (event) {
    isPageUnloading = true;
});

// Event listener to handle page close
window.addEventListener('unload', function (event) {
    if (!isPageUnloading && hasInteracted === 'true') {
        localStorage.removeItem('lastSelectedContent');
    }
    localStorage.setItem('hasInteracted', 'false');
});

// -------------------------------------------------------------------------
// Function to Get Navbar links on page
const NavBarLinks = document.querySelectorAll('.NavBar a');
NavBarLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target.getAttribute('data-target');

        // Store last selected content in local storage
        localStorage.setItem('lastSelectedContent', target);

        // Display selected content
        displayContent(document.querySelector(`#${target}`));

        // Push state to browser history
        history.pushState({ target }, '', `#${target}`);
    });
});

// -------------------------------------------------------------------------
// Function to display content section on the page
function displayContent(contentSection) {
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    contentSection.classList.add('active');

    // Update local storage with the latest selected content
    localStorage.setItem('lastSelectedContent', contentSection.id);
}

// -------------------------------------------------------------------------
// Function to Listen for popstate event (back button) on the page
window.addEventListener('popstate', (event) => {
    const target = event.state ? event.state.target : 'home';
    const contentSection = document.querySelector(`#${target}`);

    if (contentSection) {
        displayContent(contentSection);
    }
});

// -------------------------------------------------------------------------
// Function For sidebar DropDown Menu on the page

// -------------------------------------------------------------------------

// -------------------------------------------------------------------------

// -------------------------------------------------------------------------

class Member {
    constructor(id, fullName, password, pledgeClass, roomNumber, status, position) {
        this.id = id;
        this.fullName = fullName;
        this.password = password;
        this.pledgeClass = pledgeClass;
        this.roomNumber = roomNumber;
        this.status = status;
        this.position = position;
    }
}

// Sample members
/**
 * Members have the following attributes:
 * an ID, an integer from zero up. I"m going to reserve 0 for test users.
 * the full name of the member
 * the members password. This should be stored safer but this will do for now.
 * the members pledge class
 * the members room number, or address if not applicable. May just stick to live out as a catchall
 * the members status, currenly just Associate or Active. 
 * the members position, if applicable.
 * TODO: Add family trees, a key pair relationship. 
 */

const members = [
    new Member(0, 'pop', 'asdf', 'Sir', '401', 'Active', 'Rizz Manager'),
    new Member(1, 'Benjamin Wormsley', 'password1', 'Sigma', '307', 'Active', 'Technology Chair'),
    new Member(2, 'Nathan Hochstein', 'password2', 'Sigma', '307', 'Active', 'Sargent-of-Arms'),
    new Member(3, 'Adam Lierz', 'password3', 'Rho', '211', 'Active', 'Secratary'),
    new Member(4, 'Grant Kerrigan', 'password4', 'Sigma', '309', 'Active', 'None'),
    new Member(5, 'Joseph Casey', 'password5', 'Tau', '306', 'Associate', 'None'),
    new Member(6, 'Christain Friesen', 'password6', 'Pi', 'Live Out', 'Active', 'Member-at-Large'),
    new Member(7, 'Matthew Brown', 'password7', 'Omicron', 'N/A', 'Alumni', 'None'),
    new Member(8, 'Jack Svaboda', 'password8', 'Pi', '202', 'Active', 'Risk Manager')
    //TODO: Add Reduced, Alumni, and On Probation to statuses.
    //TODO: Add dymanic user creation on the front end of the website.
    //TODO store passwords in a safer way.
];


/**
 * Given a member, this function returns what the members home page should look like.
 * @param {*} member 
 */
function showDashboard(member) {
    localStorage.setItem('memberInfo', JSON.stringify(member));
    if (member.status === 'Active') {
        if(member.position === 'Intellectual Chair') {
            window.location.href = 'intellectual.html';
        }
        else if(member.position === 'Risk Manager') {
            window.location.href = 'riskman.html';
        }
        else if(member.position === 'Technology Chair') {
            window.location.href = 'techchair.html';
        }
        else if(member.position === 'Secretary') {
            window.location.href = 'secretary.html';
        }
        else if(member.position === 'Alumni and Family Relations') {
            window.location.href = 'afr.html';
        }
        else if (member.position === 'Poop Chair') {
            window.location = 'poopchair.html'
        }
        window.location.href = 'active.html';
    }
    else if (member.status === 'Associate') {
        window.location.href = 'associate.html';
    }
    else {
        window.location.href = 'login.html';
    }
}


/**
 * Logs the user in, or requests a different login
 */
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const matchedMember = members.find(member => member.fullName === username && member.password === password);

    if (matchedMember) {
        window.location.href = 'dashboard.html';
        showDashboard(matchedMember);
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

/**
 * 
 * @param {*} member 
 * 
 * Creates a string containing all data pertaining to the user, minus the password, and sends it
 * to the member-info div
 */
function displayMemberInfo() {

    const member = JSON.parse(localStorage.getItem('memberInfo'));

    const memberInfoHTML = `
        <h2>${member.fullName}'s Information</h2>
        <p>ID: ${member.id}</p>
        <p>Pledge Class: ${member.pledgeClass}</p>
        <p>Room Number: ${member.roomNumber}</p>
        <p>Status: ${member.status}</p>
        <p>Position: ${member.position}</p>
    `;

    // Update the content of the 'member-info' div
    document.getElementById('member-info').innerHTML = memberInfoHTML;
}
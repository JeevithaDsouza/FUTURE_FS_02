const API = "http://localhost:5000";
async function login() {
    console.log("Login clicked"); 
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.success) {
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error").innerText = "Invalid credentials";
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Server not running!");
    }
}
async function addLead() {
    console.log("Add Customer clicked");
    const lead = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        followUp: document.getElementById("followUp").value,
        status: document.getElementById("status").value
    };
    try {
        const res = await fetch(`${API}/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead)
        });
        if (!res.ok) throw new Error("Failed to add");
        alert("Customer added!");
        loadLeads(); 
    } catch (err) {
        console.error("Add error:", err);
        alert("Error adding customer");
    }
}
async function loadLeads() {
    try {
        const res = await fetch(`${API}/leads`);
        const data = await res.json();
        const table = document.getElementById("tableBody");
        if (!table) return;
        table.innerHTML = "";
        let newC = 0, contacted = 0, converted = 0;
        data.forEach(l => {
            const row = `
                <tr>
                    <td>${l.name}</td>
                    <td>${l.phone}</td>
                    <td>${l.email}</td>
                    <td>${l.status}</td>
                    <td>${l.followUp}</td>
                </tr>
            `;
            table.innerHTML += row;
            if (l.status === "new") newC++;
            if (l.status === "contacted") contacted++;
            if (l.status === "converted") converted++;
        });
        if (document.getElementById("newCount")) {
            document.getElementById("newCount").innerText = newC;
            document.getElementById("contactedCount").innerText = contacted;
            document.getElementById("convertedCount").innerText = converted;
        }
    } catch (err) {
        console.error("Load error:", err);
    }
}
function logout() {
    window.location.href = "login.html";
}
window.onload = function () {
    if (window.location.pathname.includes("dashboard.html")) {
        loadLeads();
    }
};
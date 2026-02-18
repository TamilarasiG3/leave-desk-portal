const form = document.getElementById("leaveForm");
const table = document.getElementById("leaveTable");

function loadLeaves() {
    fetch("http://localhost:5000/api/leaves")
    .then(res => res.json())
    .then(data => {
        table.innerHTML = "";
        data.forEach(leave => {
            table.innerHTML += `
                <tr>
                    <td>${leave.name}</td>
                    <td>${leave.leave_type}</td>
                    <td>${leave.from_date.split('T')[0]}</td>
                    <td>${leave.to_date.split('T')[0]}</td>
                    <td>${leave.status}</td>
                </tr>
            `;
        });
    });
}

loadLeaves();

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const leaveData = {
        user_id: 1,
        leave_type: document.getElementById("leaveType").value,
        from_date: document.getElementById("fromDate").value,
        to_date: document.getElementById("toDate").value,
        reason: document.getElementById("reason").value
    };

    fetch("http://localhost:5000/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveData)
    })
    .then(res => res.json())
    .then(() => {
        loadLeaves();
        form.reset();
    });
});

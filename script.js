
function calculateResult() {

    const name = document.getElementById("studentName").value.trim();

    const subjectIds = ["english","math","science","computer","urdu"];

    // Check empty name
    if (name === "") {
        alert("Please enter student name.");
        return;
    }
    // Check empty marks before converting to numbers
    for (let id of subjectIds) {
        const value = document.getElementById(id).value.trim();

        if (value === "") {
            alert("Please enter marks for all subjects.");
            return;
        }
    }
    // Get all subject marks
    const subjects = subjectIds.map(function(id) {
        return Number(document.getElementById(id).value);
    });

    // Validate marks
    for (let mark of subjects) {

        if (!Number.isFinite(mark)) {
            alert("Please enter valid marks.");
            return;
        }
        if (mark < 0) {
            alert("Marks cannot be negative.");
            return;
        }
        if (mark > 100) {
            alert("Marks cannot exceed 100.");
            return;
        }
    }
    const totalMarks = 500;

    const obtainedMarks = subjects.reduce(
        (sum, mark) => sum + mark, 0
    );
    const percentage = (
        obtainedMarks / totalMarks * 100
    ).toFixed(2);

    // Calculate grade
    let grade;
    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }
    // Calculate pass or fail
    let status = "Pass";

    for (let mark of subjects) {
        if (mark < 40) {
            status = "Fail";
            break;
        }
    }
    // Create result object
    const resultData = {
        name: name,
        subjects: subjects,
        totalMarks: totalMarks,
        obtainedMarks: obtainedMarks,
        percentage: percentage,
        grade: grade,
        status: status
    };
    // Get all previous results
    let results = JSON.parse(
        localStorage.getItem("studentResults")
    ) || [];

    // Add new result
    results.push(resultData);

    // Save all results
    localStorage.setItem(
        "studentResults",
        JSON.stringify(results)
    );

    // Show latest result in Result Card
    displayResult(resultData);

    // Show all saved results
    displayAllResults();

    // Clear input fields
    document.getElementById("studentName").value = "";

    subjectIds.forEach(function(id) {
        document.getElementById(id).value = "";
    });
}
// Display the latest result
function displayResult(data) {

    document.getElementById("rName").innerText = data.name;

    document.getElementById("totalMarks").innerText =
        data.totalMarks;

    document.getElementById("obtainedMarks").innerText =
        data.obtainedMarks;

    document.getElementById("percentage").innerText =
        data.percentage + "%";

    document.getElementById("grade").innerText =
        data.grade;

    const statusElement = document.getElementById("status");

    statusElement.innerText = data.status;

    statusElement.className =
        data.status === "Pass" ? "pass" : "fail";

    document.getElementById("result").style.display = "block";
}
// Display all saved results
function displayAllResults() {
    const resultsContainer =
        document.getElementById("savedResults");
    resultsContainer.innerHTML = "";
    const results = JSON.parse(
        localStorage.getItem("studentResults")
    ) || [];
    if (results.length === 0) {
        return;
    }
    const heading = document.createElement("h2");
    heading.innerText = "All Saved Results";
    resultsContainer.appendChild(heading);
    results.forEach(function(data, index) {
        const card = document.createElement("div");
        card.className = "saved-card";
        const title = document.createElement("h3");
        title.innerText = "Student " + (index + 1);
        const details = document.createElement("p");
        details.innerText =
            "Name: " + data.name +
            " | Obtained: " + data.obtainedMarks +
            "/" + data.totalMarks +
            " | Percentage: " + data.percentage + "%" +
            " | Grade: " + data.grade +
            " | Status: " + data.status;
        card.appendChild(title);
        card.appendChild(details);
        resultsContainer.appendChild(card);
    });     
}
// Load saved results when page opens
window.addEventListener("DOMContentLoaded", function() {
    const results = JSON.parse(
        localStorage.getItem("studentResults")
    ) || [];

    // Show all saved results
    displayAllResults();
});


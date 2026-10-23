
function calculateResult() {

    const name = document.getElementById("studentName").value.trim();

    const subjects = [
        Number(document.getElementById("english").value),
        Number(document.getElementById("math").value),
        Number(document.getElementById("science").value),
        Number(document.getElementById("computer").value),
        Number(document.getElementById("urdu").value)
    ];

    if(name === ""){
        alert("Please enter student name.");
        return;
    }

    for(let mark of subjects){

        if(isNaN(mark)){
            alert("Marks cannot be empty.");
            return;
        }

        if(mark < 0){
            alert("Marks cannot be negative.");
            return;
        }

        if(mark > 100){
            alert("Marks cannot exceed 100.");
            return;
        }
    }

    const totalMarks = 500;
    const obtainedMarks = subjects.reduce((sum, mark) => sum + mark, 0);
    const percentage = (obtainedMarks / totalMarks * 100).toFixed(2);

    let grade;

    if(percentage >= 90){
        grade = "A+";
    }
    else if(percentage >= 80){
        grade = "A";
    }
    else if(percentage >= 70){
        grade = "B";
    }
    else if(percentage >= 60){
        grade = "C";
    }
    else if(percentage >= 50){
        grade = "D";
    }
    else{
        grade = "F";
    }

    let status = "Pass";

    for(let mark of subjects){
        if(mark < 40){
            status = "Fail";
            break;
        }
    }

    document.getElementById("rName").innerText = name;
    document.getElementById("totalMarks").innerText = totalMarks;
    document.getElementById("obtainedMarks").innerText = obtainedMarks;
    document.getElementById("percentage").innerText = percentage + "%";
    document.getElementById("grade").innerText = grade;

    const statusElement = document.getElementById("status");
    statusElement.innerText = status;
    statusElement.className = status === "Pass" ? "pass" : "fail";

    document.getElementById("result").style.display = "block";
}
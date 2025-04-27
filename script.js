function getRecommendation() {
    let data = {
        N: document.getElementById("nitrogen").value,
        P: document.getElementById("phosphorus").value,
        K: document.getElementById("potassium").value,
        temperature: document.getElementById("temperature").value,
        humidity: document.getElementById("humidity").value,
        ph: document.getElementById("ph").value,
        rainfall: document.getElementById("rainfall").value
    };

    let resultElement = document.getElementById("result");
    let resultContainer = document.getElementById("result-container");
    let loadingSpinner = document.getElementById("loading");

    // Show loading spinner
    resultContainer.classList.add("d-none");
    loadingSpinner.classList.remove("d-none");

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading spinner
        loadingSpinner.classList.add("d-none");

        if (data.error) {
            resultElement.classList.remove("alert-success");
            resultElement.classList.add("alert-danger");
            resultElement.innerText = "Error: " + data.error;
        } else {
            resultElement.classList.remove("alert-danger");
            resultElement.classList.add("alert-success");
            resultElement.innerHTML = `<i class="bi bi-award-fill"></i> Recommended Crop: <strong>${data.crop}</strong>`;
        }

        // Show result
        resultContainer.classList.remove("d-none");
    })
    .catch(error => {
        // Hide loading spinner
        loadingSpinner.classList.add("d-none");

        resultElement.classList.remove("alert-success");
        resultElement.classList.add("alert-danger");
        resultElement.innerText = "Error fetching prediction.";
        resultContainer.classList.remove("d-none");
    });
}

const form = document.getElementById("message-form");
const input = document.getElementById("message");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const button = form.querySelector("button");

form.addEventListener("submit", async (event) => {
    // Prevent the browser's normal form submission
    event.preventDefault();

    const message = input.value.trim();

    if (!message) {
        return;
    }

    result.textContent = "";
    result.classList.remove("error");

    loading.hidden = false;
    button.disabled = true;

    try {
        // Send data to the Flask API
        const response = await fetch("/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        // Update the existing page without reloading it
        result.textContent = data.response;

    } catch (error) {
        result.textContent = error.message || "Something went wrong.";
        result.classList.add("error");

    } finally {
        loading.hidden = true;
        button.disabled = false;
    }
});
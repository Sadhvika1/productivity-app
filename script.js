document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    fetchDailyQuote();
    fetchWeather();
    loadReminders();
    loadNotes();
    loadEvents();
});

// To-Do List
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = taskInput.value;
        li.addEventListener("click", () => {
            li.style.textDecoration = "line-through";
            updateProgress();
        });
        taskList.appendChild(li);
        saveTasks();
        taskInput.value = "";
    }
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll("#taskList li")).map(
        (li) => li.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click", () => {
            li.style.textDecoration = "line-through";
            updateProgress();
        });
        taskList.appendChild(li);
    });
}

function updateProgress() {
    const completedTasks = document.querySelectorAll(
        "#taskList li[style*='line-through']"
    ).length;
    document.getElementById("progress").textContent = completedTasks;
}

// Reminders
function addReminder() {
    const title = document.getElementById("reminderTitle").value;
    const time = document.getElementById("reminderTime").value;
    const reminderList = document.getElementById("reminderList");

    if (title && time) {
        const li = document.createElement("li");
        li.textContent = `${title} - ${new Date(time).toLocaleString()}`;
        reminderList.appendChild(li);

        const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.push({ title, time });
        localStorage.setItem("reminders", JSON.stringify(reminders));

        setTimeout(() => {
            alert(`Reminder: ${title}`);
        }, new Date(time).getTime() - Date.now());

        document.getElementById("reminderTitle").value = "";
        document.getElementById("reminderTime").value = "";
    }
}

function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const reminderList = document.getElementById("reminderList");
    reminders.forEach((reminder) => {
        const li = document.createElement("li");
        li.textContent = `${reminder.title} - ${new Date(reminder.time).toLocaleString()}`;
        reminderList.appendChild(li);
    });
}

// Notes
function saveNotes() {
    const notes = document.getElementById("notesArea").value;
    localStorage.setItem("notes", notes);
}

function loadNotes() {
    const notes = localStorage.getItem("notes") || "";
    document.getElementById("notesArea").value = notes;
}

// Calendar
function addEvent() {
    const eventDate = document.getElementById("eventDate").value;
    const eventTitle = document.getElementById("eventTitle").value;
    const eventList = document.getElementById("eventList");

    if (eventDate && eventTitle) {
        const li = document.createElement("li");
        li.textContent = `${new Date(eventDate).toDateString()} - ${eventTitle}`;
        eventList.appendChild(li);

        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.push({ date: eventDate, title: eventTitle });
        localStorage.setItem("events", JSON.stringify(events));

        document.getElementById("eventDate").value = "";
        document.getElementById("eventTitle").value = "";
    }
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventList = document.getElementById("eventList");
    events.forEach((event) => {
        const li = document.createElement("li");
        li.textContent = `${new Date(event.date).toDateString()} - ${event.title}`;
        eventList.appendChild(li);
    });
}




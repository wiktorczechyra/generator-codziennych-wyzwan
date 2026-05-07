/* -------------- Lista zadań -------------- */
const zadania = [
    "Pościel łóżko",
    "Podlej kwiaty",
    "Umyj kubek",
    "Wyrzuć śmieci",
    "Przetrzyj biurko",
    "Zrób 10 przysiadów",
    "Otwórz okno na 5 minut",
    "Uporządkuj dokumenty na biurku",
    "Naładuj telefon",
    "Odpisz na jedną wiadomość",
    "Zrób porządek w plecaku lub torbie",
    "Umyj ręce", "Schowaj ubrania do szafy",
    "Zetrzyj kurz z półki",
    "Zapisz coś ważnego w notatniku",
    "Umyj zęby", "Sprawdź, co trzeba kupić",
    "Posłuchaj jednej piosenki",
    "Posprzątaj blat w kuchni",
    "Przygotuj sobie szklankę wody"
];

/* -------------- Elementy HTML -------------- */
const losujBtn = document.getElementById("losujBtn");
const wyzwanie = document.getElementById("wyzwanie");
const tekst = document.getElementById("tekst");
const koniec = document.getElementById("koniec");
const historiaBtn = document.getElementById("historiaBtn");
const historiaClearBtn = document.getElementById("historiaClearBtn");
const historia = document.getElementById("historia");

/* -------------- Sprawdzenie Daty -------------- */
if (localStorage.getItem("data") != new Date().toLocaleDateString()) {
    localStorage.clear();
    localStorage.setItem("data", new Date().toLocaleDateString());
}

/* -------------- Funkcja zaznaczania jako ukończone -------------- */
function ukoncz() {
    if (wyzwanie.textContent == "") {
        return;
    }
    else {
        document.getElementById("wyzwanie").style = "text-decoration: underline; color: green;";
        document.getElementById("tekst").textContent = "Gratulacje! Wyzwanie wykonane 🎉";
        if ((localStorage.getItem("historia") || "").includes(wyzwanie.textContent) == false) {
            if (localStorage.getItem("historia") == null) {
                localStorage.setItem("historia", wyzwanie.textContent + "\n");
            }
            else {
                localStorage.setItem("historia", localStorage.getItem("historia") + wyzwanie.textContent + "\n");
            }
        }
        localStorage.setItem("done", "1");
    }
}

/* -------------- Funkcja losowania zadań -------------- */
function losuj() {
    if (localStorage.getItem("done") == "1") {
        return;
    }
    else {
        wyzwanie.textContent = zadania[Math.floor(Math.random() * zadania.length)];
        koniec.className = "fade";
        historiaBtn.className = "fade";
        historiaClearBtn.className = "fade";
    }
}

/* -------------- Funkcja wywołująca historię ukończonych zadań -------------- */
function hist() {
    if (localStorage.getItem("historia") == null) {
        historia.innerHTML = "Brak historii";
    }
    else {
        historia.innerHTML = localStorage.getItem("historia").split("\n").join("<br>");
    }
}

    /* -------------- Funkcja pokazująca rejestrację -------------- */
    function regShow() {
        document.getElementById("login").style = "display: none";
        document.getElementById("register").style = "display: block";
        document.getElementById("message").innerText = "";
    }
    /* -------------- Funkcja pokazująca logowanie -------------- */
    function logShow() {
        document.getElementById("register").style = "display: none";
        document.getElementById("login").style = "display: block";
        document.getElementById("message").innerText = "";
    }
    /* -------------- Rejestracja użytkownika -------------- */
    function reg() {
        const name = document.getElementById("SignupName").value;
        const surname = document.getElementById("SignupSurname").value;
        const email = document.getElementById("SignupEmail").value;
        const password = document.getElementById("SignupPassword").value;
        if (email === "" || password === "") {
            showMessage("Wypełnij wszystkie pola","red");
            return;
        }
        const user = {
            name: name,
            surname: surname,
            email: email,
            password: password
        };
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        showMessage("Konto założone pomyślnie","green");
        logShow();
    }

    /* -------------- Logowanie użytkownika -------------- */
    function log() {
        const email = document.getElementById("LoginEmail").value;
        const password = document.getElementById("LoginPassword").value;
        const logEmail = localStorage.getItem("email");
        const logPassword = localStorage.getItem("password");
        if (logEmail == null || logPassword == null)
        {
            showMessage("Najpierw załóż konto", "red");
        }
        else
        {
        if (email == logEmail) {
            if (password == logPassword) {
                localStorage.setItem("zalogowano", "true");
                showMessage("Zalogowano", "green");
            }
            else
            {
                showMessage("Błędne hasło", "red");
            }
        }
        else
        {
            showMessage("Błędna nazwa użytkownika", "red");
        }
    }
    }
/* -------------- Funkcja pokazująca wiadomość logowania/rejestracji -------------- */
    function showMessage(text, color) {
        const message = document.getElementById("message");
        message.innerText = text;
        message.style.color = color;
    }

    function histClear() {
        localStorage.clear();
    }


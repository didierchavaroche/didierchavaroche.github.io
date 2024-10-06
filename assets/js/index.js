/*
 * Fonction qui retourne un cookie
 */
function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}
/*
 * Fonction qui enregistre un cookie
 */
function setCookie(cookieName, cookieValue, expiresInDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

/*
 * Fonction qui change le titre de la page ainsi que le menu
 */
function setTitre() {
    const url = window.location.href;
    const searchParams = new URLSearchParams(url.split('?')[1]);
    let titre = searchParams.get('titre');
    
    if(titre){
        titre = decodeURIComponent(titre);
        setCookie('titreDuCours',titre,7);
    } else {
        const storedTitle = getCookieValue('titreDuCours');
        if(storedTitle) {
            titre = storedTitle;
        }
    }

    if(titre) {
        document.title = titre;
        document.getElementById('title').innerText = titre;
    }

    const textareas = document.getElementsByTagName('textarea');

    for(let i=0; i<textareas.length; i++) {
        textareas[i].addEventListener('input', () => {
            textareas[i].style.height = textareas[i].scrollHeight + 'px';
        });
    }
}

/*
 * Fonction qui valide un version de code
 */
function validateVersion(input) {
    const versionPattern = /^\d+\.\d+\.\d+$/;
    if (!versionPattern.test(input.value)) {
        alert("Le format de la version doit être MAJEUR.MINEUR.PATCH");
        input.value = "";
    }
}

/*
 * Fonctions d'affichage des images
 */
function openFullscreen() {
    document.getElementById("fullscreen-image").style.display = "block";
}

function closeFullscreen() {
    document.getElementById("fullscreen-image").style.display = "none";
}
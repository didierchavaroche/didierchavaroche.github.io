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
    const searchParams = new URLSearchParams(url);
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
    document.title = titre;
    document.getElementById('title').innerText = titre;
}
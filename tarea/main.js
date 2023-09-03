const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=20&api_key=live_D0AJOS6o5mhpyad6XtJzXvNnRNGPdrW7IzywTDnDLSTxLyL0HRwsPOy8prmCr2po';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=40&api_key=live_D0AJOS6o5mhpyad6XtJzXvNnRNGPdrW7IzywTDnDLSTxLyL0HRwsPOy8prmCr2po'
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}&?api_key=live_D0AJOS6o5mhpyad6XtJzXvNnRNGPdrW7IzywTDnDLSTxLyL0HRwsPOy8prmCr2po`;
const spanError = document.getElementById('error');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const imgAvatar = document.getElementById('list');
const imgAvatar2 = document.getElementById('list2');
const imgAvatar3 = document.getElementById('list3');
const imgAvatar4 = document.getElementById('list4');
const imgAvatar5 = document.getElementById('list5');
const imgAvatar6 = document.getElementById('list6');
const imgAvatar7 = document.getElementById('list7');
const imgAvatar8 = document.getElementById('list8');
const imgAvatar9 = document.getElementById('list9');
const imgAvatar10 = document.getElementById('list10');
const imgAvatar11 = document.getElementById('list11');
const button = document.querySelector('button');

async function generarGatosRandom() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Gatos aleatorios');
    console.log(data);
    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status;
    } else {
        img1.src = data[0].url;
        img2.src = data[1].url;
        imgAvatar.src = data[2].url;
        imgAvatar2.src = data[3].url;
        imgAvatar3.src = data[4].url;
        imgAvatar4.src = data[5].url;
        imgAvatar5.src = data[6].url;
        imgAvatar6.src = data[7].url;
        imgAvatar7.src = data[8].url;
        imgAvatar8.src = data[9].url;
        imgAvatar9.src = data[10].url;
        imgAvatar10.src = data[11].url;
        imgAvatar11.src = data[12].url;
        btn1.onclick = () => guardarGatitosFavoritos(data[0].id);
        btn2.onclick = () => guardarGatitosFavoritos(data[1].id);
    }
}

async function cargarGatosFavoritos() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Gatos favoritos');
    console.log(data);
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById('gatosFavoritos');
        section.classList.add('sectionPost');
        section.innerHTML = "";

        data.forEach(gato => {
            //Crea el div header
            const headerDiv = document.createElement('headerDiv');
            headerDiv.classList.add('headerDiv');

            //la imagen del headerDiv
            const imgHeader = document.createElement('img');
            imgHeader.src = gato.image.url;
            imgHeader.classList.add('imgHeader');
            headerDiv.appendChild(imgHeader);

            //Crea el subdiv del header con sus elementos
            const subDiv = document.createElement('div');
            subDiv.classList.add('subDiv');
            const textoSubDiv = document.createElement('h4');
            textoSubDiv.textContent = 'Joe Cotto';
            subDiv.appendChild(textoSubDiv);
            const textoSubDiv2 = document.createElement('p');
            textoSubDiv2.textContent = '13h · ';
            subDiv.appendChild(textoSubDiv2);
            const imgSubDiv = document.createElement('img');
            imgSubDiv.src = 'images/world.svg';
            textoSubDiv2.appendChild(imgSubDiv);
            headerDiv.appendChild(subDiv);

            //Crea el elemento final del headerDiv con sus elementos
            const finalSubDiv = document.createElement('div');
            finalSubDiv.classList.add('finalSubDiv');
            const finalSubDivButton = document.createElement('button');
            finalSubDivButton.classList.add('finalSubDivButton');
            const finalSubDivImg = document.createElement('img');
            finalSubDivImg.classList.add('finalSubDivImg');
            finalSubDivImg.src = 'images/x.svg';
            finalSubDivButton.appendChild(finalSubDivImg);
            finalSubDiv.appendChild(finalSubDivButton);
            headerDiv.appendChild(finalSubDiv);
            finalSubDiv.onclick = () => eliminarGatitosFavoritos(gato.id);

            // Crear el artículo
            const article = document.createElement('article');
            article.classList.add('cardArticle'); // Agregar clase al artículo

            // Crear el div de navegación
            const navDiv = document.createElement('div');
            navDiv.classList.add('navigation'); // Agregar clase al div de navegación

            // Crear el botón de agregar
            const button1 = document.createElement('button');
            button1.textContent = 'Agregar';
            navDiv.appendChild(button1);

            // Crear la imagen
            const img = document.createElement('img');
            img.classList.add('cardArticleImg');
            img.src = gato.image.url;
            img.width = 150;
            article.appendChild(img);

            // Agregar el artículo y el div de navegación al section
            article.insertBefore(headerDiv, img);
            section.appendChild(article);
            section.appendChild(navDiv);
        });
    }
}



async function guardarGatitosFavoritos(id) {
    const res = await fetch(API_URL_FAVORITES,
        {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image_id: id
            }),
        });
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Guardado en favoritos');
        cargarGatosFavoritos();
    }
}

async function eliminarGatitosFavoritos(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id),
        {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            },
        });
    const data = await res.json();
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Gatito eliminado');
        cargarGatosFavoritos();
    }
}

generarGatosRandom();
cargarGatosFavoritos();
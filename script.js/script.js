const API = 'https://www.thecocktaildb.com/api/json/v1/1/';
const GET_ALL_COCKTAILS = API + 'filter.php?c=Cocktail';
const GET_COCKTAILS_BY_NAME = API + 'search.php?s=';
const FILTER_COCKTAILS_BY_ALCO = API + 'filter.php?a=';
const GET_COCKTAILS_BY_ID = API + 'lookup.php?i=';
const GET_COCKTAILS_BY_INGR = API + 'lookup.php?iid=';
const GET_COCKTAILS_BY_NAME_INGR = API + 'search.php?i='

const input = document.querySelector('#input');
const searchBtn = document.querySelector('#btn');
const output = document.querySelector('#output');
const select = document.querySelector('#select')

const audio = new Audio('./../audio/fly.mp3')
    
// window.onload = () => {
//     audio.play()
// }

    
// window.onload = 
// audio.play()


const getAllCocktails = async () => {
    const request = await fetch(GET_ALL_COCKTAILS);
    const response = await request.json();
    renderCocktails(response.drinks)
}

const getById = async (id) => {
    const request = await fetch(GET_COCKTAILS_BY_ID + id);
    const response = await request.json();
    renderDetailById(response.drinks[0]);
}
const getByIdIngr = async (ingr) => {
    const request = await fetch(GET_COCKTAILS_BY_INGR + ingr);
    const response = await request.json()
    renderDetailById(response.drinks[0]);

}

const getByNameIngr = async (idName) => {
    const request = await fetch(GET_COCKTAILS_BY_NAME_INGR + idName);
    const response = await request.json();
    renderIngredient(response.ingredients[0]);
}
const renderIngredient = (idName) => {
    output.innerHTML = ''
    console.log(idName);
    const cardIngr = document.createElement('div')
    cardIngr.classList.add('cardIngr');
    const titleIngr = document.createElement('h3')
    titleIngr.classList.add('titleIngr')
    titleIngr.textContent = 'Name: ' + idName.strIngredient
    const desc = document.createElement('p')
    desc.classList.add('desc')
    
        if (idName.strDescription == null) {
            desc.textContent = 'без описания'
        } else {
            desc.textContent = 'Description: ' + idName.strDescription
        }
    const img = document.createElement('img')
    img.src = `https://www.thecocktaildb.com/images/ingredients/${idName.strIngredient}-Medium.png`
    cardIngr.append(titleIngr, img, desc)
    output.append(cardIngr)
}
const renderDetailById = (detail) => {
    output.innerHTML = ''
    // consol.log(detail);
    const card = document.createElement('div');
    const ol = document.createElement('ol')
    card.classList.add('detail');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const alco = document.createElement('h2');
    alco.textContent = detail?.strAlcoholic;
    const instruction = document.createElement('h4');
    instruction.textContent = 'Instruction: ' + detail?.strInstructions;
    img.src = detail?.strDrinkThumb;
    title.textContent = 'Name: ' + detail?.strDrink;

    card.append(img, title, alco, instruction )

    for (let key in detail) {
        if (key.includes('strIngredient') && detail[key] !== null) {
            const ingr = document.createElement('li');
            ingr.textContent = detail[key];
            ingr.addEventListener('click', () => {
                getByNameIngr(detail[key]);
                audio.play()
            } )

            card.append(ingr,);
        } 
        if (key.includes('strMeasure') && detail[key] !== null) {
            const mera= document.createElement('li');
            mera.textContent = detail[key];
            ol.append(mera);
            
        }
       
    }
    
    card.append(ol);
        
    

    output.append(card)
}





const renderCocktails = (data = []) => {
    output.innerHTML = ''
    data.map(element => {
        const card = document.createElement('div')
        card.classList = ('card wow bounceInLeft data-wow-duration="6s" data-wow-delay="5s"')
        card.setAttribute('data-wow-duration', '1.5s')
        const img = document.createElement('img')
        const title = document.createElement('h3')

        img.src = element.strDrinkThumb;
        title.textContent = element.strDrink;

        card.append(img, title)
        output.append(card)
        card.addEventListener('click', () => {
            getById(element.idDrink)
            audio.play()

        })
    })

}

const getCocktailByName = async (name) => {
    const request = await fetch(GET_COCKTAILS_BY_NAME + name);
    const response = await request.json();
    renderCocktails(response.drinks)
}

input.addEventListener('keyup', (event) => {
    // console.log(event.target.value);
    // input.value = ''
    getCocktailByName(event.target.value);
})


select.addEventListener('change', (event) => {
    getFilter(event.target.value);
})

const getFilter = async (alco) => {
    if (alco == 'All') {
        getAllCocktails();
    } else {
        const request = await fetch(FILTER_COCKTAILS_BY_ALCO + alco);
        const response = await request.json();
        renderCocktails(response.drinks)
    }

}


    getAllCocktails();
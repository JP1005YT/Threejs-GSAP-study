function screenManager(query,child){
    if(!child){
        child = '#ui'
    }
    document.querySelectorAll(child + ' div.active').forEach(e => e.classList.remove('active'))
    document.querySelector(child + ' ' + query).classList.add('active')
}

function newGameEvent(){
    screenManager('.molecular-menu')
}

function Volta(){
    screenManager('.main-menu')
}

function configEvent(){
    screenManager('.config-menu')
}

function adminMode(){
    screenManager('.admin-panel')
}

// Funções do jogo

// Criador de moléculas


let btnAddProton = document.querySelector('#ptn')
let btnAddNeutron = document.querySelector('#ntn')
let btnAddElectron = document.querySelector('#etn')

let molecularSandbox = document.querySelector('#molecular-sandbox')
let msContent= {
    electrons: 0,
    protons: 0,
    neutrons: 0
}


btnAddElectron.addEventListener('click',() => {addMS(0)})
btnAddProton.addEventListener('click',() => {addMS(1)})
btnAddNeutron.addEventListener('click',() => {addMS(2)})

function addMS(type){
    function create(type) {
        let newElement = document.createElement('div');
        if (type == 0) {
            newElement.classList.add('electron');
            // Define uma órbita única para cada elétron
            let radius = Math.random() * 50 + 100; // Raio entre 100px e 150px
            let duration = Math.random() * 3 + 3; // Duração entre 3s e 6s
            let angle = Math.random() * 360; // Ângulo inicial aleatório
            newElement.style.animation = `orbit ${duration}s linear infinite`;
            newElement.style.transform = `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`;
        }
        if (type == 1) {
            newElement.classList.add('proton');
            // Posiciona os prótons aleatoriamente no núcleo
            let x = Math.random() * 40 - 20; // Posição aleatória no núcleo
            let y = Math.random() * 40 - 20;
            newElement.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (type == 2) {
            newElement.classList.add('neutron');
            // Posiciona os nêutrons aleatoriamente no núcleo
            let x = Math.random() * 40 - 20; // Posição aleatória no núcleo
            let y = Math.random() * 40 - 20;
            newElement.style.transform = `translate(${x}px, ${y}px)`;
        }
        return newElement;
    }
    switch (type) {
        case 0:
            // Adiciona um elétron
            molecularSandbox.appendChild(create(type))
            msContent.electrons++
            break
            case 1:
                // Adiciona um próton
            molecularSandbox.appendChild(create(type))
            msContent.protons++
            break
            case 2:
                // Adiciona um nêutron
            molecularSandbox.appendChild(create(type))
            msContent.neutrons++
            break
    }
}
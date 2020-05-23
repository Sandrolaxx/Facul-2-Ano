let form = document.querySelector('.form');

function receivesFormEvent(e) {
    e.preventDefault();

    const inputWeight = form.querySelector('.weight');
    const inputHeight = form.querySelector('.height');

    const weight = Number(inputWeight.value);
    const height = Number(inputHeight.value);

    if (!weight || weight > 300 || weight < 30) {
        setResultado('Resultado: Peso Inválido', false);
        return;
    }

    if (!height || height > 2 || height < 1.10) {
        setResultado('Resultado: Altura Inválida', false);
        return;
    }

    //Abstração
    const accountIMC = new Imc();
    const IMC = accountIMC.getImc(weight, height);

    //Herança
    const rangeOfIMC = new ImcRangeSon(); 
    const rangeImc = rangeOfIMC.getImcRange(IMC);  

    //Polimorfismo
    const msg = rangeOfIMC.printResult(IMC, rangeImc);

    setResultado(msg, true);

};

form.addEventListener('submit', receivesFormEvent);

function createP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, isValid) {
    const result = document.querySelector('.result');
    result.innerHTML = '';
    const p = createP();

    if (isValid) {
        p.classList.add('p-result');
    } else {
        p.classList.add('bad-result');
    }
    p.innerHTML = `${msg}`;
    result.appendChild(p);
};

//Abstração
class Imc {
    getImc(weight, height) {
        const imc = weight / height ** 2;
        return imc.toFixed(2);
    }

    printResult
};

//Herança
class ImcRangeFather { 
    getImcRange (IMC) {
        if (IMC < 18.5) return 'Abaixo do peso';
        if (IMC > 18.5 && IMC < 24.9) return 'Peso normal'
        if (IMC > 25 && IMC < 29.9) return 'Sobrepeso'
        if (IMC > 30 && IMC < 34.9) return 'Obesidade grau 1'
        if (IMC > 35 && IMC < 39.9) return 'Obesidade grau 2'
        if (IMC > 40 && IMC < 80) return 'Obesidade grau 3';
    }

    printResult (IMC, rangeImc) {
        return IMC, rangeImc;
    }
};   

//Polimorfismo---Sobrescrevendo método printResult
class ImcRangeSon extends ImcRangeFather {
    
    printResult (IMC, rangeImc) {
        const msg = `Resultado: Seu IMC: ${IMC} (${rangeImc}).`;
        return msg;
    };
};
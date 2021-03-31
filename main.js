// nadefinujeme globální proměnné
// ty jsou pak použitelné kdekoliv v programu
let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, minceX, minceY, minceSirka, minceVyska;
let score = 0;
let zvukMince;
let zvukFanfara;
let hudba;

	

// zjistím výšku a šířku okna

let sirkaOkna = window.innerWidth;
let vyskaOkna = window.innerHeight
console.log (sirkaOkna, vyskaOkna);

// tato funkce se spustí při načtení stránky
// tj. ve chvíli, kdy je načtené komplet HTML, CSS a všechny obrázky a zvuky


	// do globálních proměnných si uložíme odkaz na objekty panáčka a mince,
	// abychom je nemuseli při každém použití znovu na stránce hledat pomocí document.querySelector

	function priNacteniStranky() {

		panacek = document.querySelector("#panacek");
		mince = document.querySelector("#mince");
		document.querySelector('#score').innerHTML = ('Skóre: ' + score);
		zvukMince = document.querySelector('#zvukmince');
		zvukFanfara = document.querySelector('#zvukfanfara');
		hudba = document.querySelector('#hudba');
			
		

	// zjistíme šířku a výšku panáčka
		panacekSirka = panacek.width;
		panacekVyska = panacek.height;
		console.log(panacekSirka, panacekVyska);

	//let rozmerPanacka = panacek.getBoundingClientRect(); ... alternativní zjištění
	//console.log(rozmerPanacka);

	
	// a umístíme panáčka do středu 
	panacekX = Math.round(sirkaOkna / 2 - panacekSirka / 2);
	panacekY = Math.round(vyskaOkna / 2 - panacekVyska / 2);
	
	console.log(panacekX, panacekY);
	
	
	//panacek.style.left = '50%';
	//panacek.style.top = '50%'; ... alternativní umístění

	// umístíme panáčka na startovní pozici

	umistiPanacka()


	// zjistíme šířku a výšku mince

		minceSirka = mince.width;
		minceVyska = mince.height;
		console.log(minceSirka, minceVyska);

	//let rozmerMince = mince.getBoundingClientRect();
	//console.log(rozmerMince); ... alternativní zjištění


	// a vygenerujeme první minci na náhodné pozici

	novaMince()
	
}

priNacteniStranky()


// funkce, která umístí panáčka na jeho souřadnice
// tj. nastaví jeho style.left a style.top na hodnoty panacekX, panacekY
function umistiPanacka() {
	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';
	console.log(panacekX, panacekY);
}

umistiPanacka()

// funkce pro nahodné vygenerování nové pozice mince
// a umístění mince na tyto souřadnice
function novaMince() {
	minceX = Math.round(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.round(Math.random() * (window.innerHeight - minceVyska));
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';
	console.log(minceX, minceY);


// ALTERNATIVA: definování náhodné pozice top/left, generování náhodných čísel od 0 (min) do výšky/šířky okna (max)

// 	let nahodnaPoziceTop;
// 	let nahodnaPoziceLeft;

// 	nahodnaPoziceTop = getRandomNumber(0, vyskaOkna)
// 	nahodnaPoziceLeft = getRandomNumber(0, sirkaOkna)

// 	console.log(nahodnaPoziceTop, nahodnaPoziceLeft);
	

// 	//generování náhodné pozice
// 	mince.style.top = nahodnaPoziceTop + 'px'
// 	mince.style.left = nahodnaPoziceLeft + 'px'

// function getRandomNumber(min, max) {
// 	return Math.random() * (max - min) + min;


}


// tato funkce se zavolá při stisku klávesy
// do proměnné "udalost" se vloží objekt s parametry události¨
// kde lze najít např. i vlastnost "key",
// která obsahuje znak stisknuté klávesy
function priStiskuKlavesy(udalost) {

	
	// šipka vlevo
	if(udalost.key === 'ArrowLeft') {
		panacekX -= 10;
		if (panacekX < 0) {
			panacekX = 0;
		}

		panacek.src = 'obrazky/panacek-vlevo.png'
		console.log(udalost.key)
	}

	// šipka vpravo
	if(udalost.key === "ArrowRight") {
		panacekX += 10;
		if (panacekX + panacekSirka > window.innerWidth) {
			panacekX = window.innerWidth - panacekSirka;
		}

		panacek.src = 'obrazky/panacek-vpravo.png';
		console.log(udalost)
	}

	
	// šipka nahoru
	if(udalost.key === "ArrowUp") {
		panacekY -= 10;
		if (panacekY < 0) {
			panacekY = 0;
		}
		
		panacek.src = 'obrazky/panacek-nahoru.png';
		console.log(udalost)
	}


	// šipka dolů
	if(udalost.key === "ArrowDown") {
		panacekY += 10;
		if (panacekY + panacekVyska > window.innerHeight) {
			panacekY = window.innerHeight - panacekVyska;
		}

		panacek.src = 'obrazky/panacek.png';
		console.log(udalost)
	}



	// panáčka umistíme na nově vypočítanou pozici
	umistiPanacka()

	// otestujeme kolizi panáčka s mincí

	otestujKolizi()
	


// fuknce pro otestování kolize panáčka s mincí
function otestujKolizi() {
	if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		// panacek a mince se prekryvaji
		zvukMince.play();
		novaMince();
		score+=1;
		score.setText = 'skóre' + score;
		console.log('Skóre je: ' + score)

		if (score===5) {
			zvukFanfara.play();
			score.innerHTML = 'Vyhrál jsi!'
		}
		
	}
}






// podkresová hudba 
	hudba.play();

}

priStiskuKlavesy()




	
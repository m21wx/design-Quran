
	const apiUrl ='https://mp3quran.net/api/v3';
	const endPoint ='reciters';
	const language ='ar';
	
	async function getReciters(){
		let chooseReciter = document.querySelector('#chooseReciter');
	

		const res = await fetch(`${apiUrl}/reciters?language=${language}`);
		const data = await res.json();
		// اسماء القراء 
		chooseReciter.innerHTML =`<option> اختر قارئ </option>`;
	data.reciters.forEach(e => chooseReciter.innerHTML +=`<option value='${e.id}'>${e.name}</option> `);
	chooseReciter.addEventListener('change',e => getMoshaf(e.target.value))
		

	
	};
	getReciters()
	
	async	function getMoshaf(reciter){
		let chooseMoshaf= document.getElementById('chooseMoshaf');
		const res = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${reciter}`);
		const data = await res.json();
		const moshafs = data.reciters[0].moshaf;
		// الرواية 
		chooseMoshaf.innerHTML =`<option> اختر رواية </option>`;
		moshafs.forEach(e => {
		chooseMoshaf.innerHTML +=`
			<option
				value='${e.id}'
				data-server ="${e.server}"
				data-surahlist="${e.surah_list}">
				${e.name}</option> `;
		});
	chooseMoshaf.addEventListener('change', e => {
		const selectedMosfah =chooseMoshaf.options[chooseMoshaf.selectedIndex]
		const surahServer = selectedMosfah.dataset.server
		const surahList = selectedMosfah.dataset.surahlist
		
		getSurah( surahServer , surahList )
	});
}
	
	// الصور 
	async	function getSurah(server , surah ){
		const choosSurah = document.querySelector('#choosSurah');
		const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
		const data = await res.json();
		const surahNames = data.suwar;
		
		surah = surah.split(',')
		choosSurah.innerHTML =`<option>اختر السوره </option>`;
		surah.forEach(surah =>{
			const padSurah = surah.padStart(3,'0')
			surahNames.forEach(surahName =>{
				if(surahName.id == surah){

					choosSurah.innerHTML +=`<option value=' ${server}${padSurah}.mp3'>${ surahName.name} </option>`;
				};
				
			});
		});
		choosSurah.addEventListener('change', e => {
		const selectedSurah =choosSurah.options[choosSurah.selectedIndex]

			playSurah(selectedSurah.value);
			playSurah.play()
			
	})
	}
	
	
	// الصوت 
	 function playSurah(url){
		 	let audioPlayer = document.querySelector('#audioPlayer');
			audioPlayer.src = url
	 };
	

	// البث المباشر
	function playLive(channel){
		if(Hls.isSupported()) {
        var video = document.getElementById('video');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
	}
	
	
	
	
	
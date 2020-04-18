const Constants = {
	waktuSolatURL: locationCode =>
		`https://cors-anywhere.herokuapp.com/https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=${locationCode}`,
	waktuSolatURLYearly: locationCode =>
		`https://cors-anywhere.herokuapp.com/https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=year&zone=${locationCode}`,
	cors: "https://cors-anywhere.herokuapp.com/",
	waktuSolatURLDefault:
		"https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=WLY01",
	waktuSolatURLToday:
		"https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone={}",
	waktuSolatURLMonthly:
		"https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=month&zone={}",
	hijriDate: serverTime =>
		`https://cors-anywhere.herokuapp.com/https://www.e-solat.gov.my/index.php?r=esolatApi/tarikhtakwim&period=today&datetype=miladi&date=${serverTime}`,
	hijriDateArabic: serverTime =>
		`//api.aladhan.com/v1/gToH?date=${serverTime}`, //http://api.aladhan.com/v1/gToH?date=22-11-2019
	islamicMonth: {
		"01": "Muharram",
		"02": "Safar",
		"03": "Rabi'ulawal",
		"04": "Rabi'ulakhir",
		"05": "Jamadilawwal",
		"06": "Jamadilakhir",
		"07": "Rejab",
		"08": "Sha'ban",
		"09": "Ramadhan",
		"10": "Syawal",
		"11": "Zulqa'idah",
		"12": "Zullhijjah"
	},
	languages: {
		english: "english",
		bahasa: "bahasa",
		arabic: "arabic"
	},
	defaultSettings: {
		waktuSolatState: "Wilayah Persekutuan",
		waktuSolatStateCode: "WLY01"
	},
	userSettings: {
		darkMode: false,
		showModal: false,
		showLanguageModal: false,
		minimalMode: false,
		selectedLang: "english",
		enableNotification: false,
		showLoadingBar: false,
		isScrolling: false,
		hideSettings: false
		// changeLanguage: false
	},
	locationSettings: {
		isNested: false,
		showModal: false,
		selectedState: "Wilayah Persekutuan",
		selectedMunicipal: "Kuala Lumpur, Putrajaya",
		selectedStateCode: "WLY01"
	},
	prayerTimes: {
		nextPrayer: "",
		currentPrayerTime: "",
		timeToNextPrayer: "",
		silenced: [],
		list: {},
		serverTime: "",
		machineTime: "",
		hijriDate: {}
	},
	locations: {
		Johor: {
			JHR01: ["Pulau Aur dan Pulau Pemanggil"],
			JHR02: ["Johor Bharu, Kota Tinggi, Mersing"],
			JHR03: ["Kluang, Pontian"]
		},
		Kedah: {
			KDH01: ["Kota Setar, Kubang Pasu, Pokok Sena (Daerah Kecil)"],
			KDH02: ["Kuala Muda, Yan, Pendang"],
			KDH03: ["Padang Terap, Sik"],
			KDH04: ["Baling"],
			KDH05: ["Bandar Baharu, Kulim"],
			KDH06: ["Langkawi"],
			KDH07: ["Gunung Jerai"]
		},
		Kelantan: {
			KTN01: [
				"Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai, Mukim Chiku"
			],
			KTN03: ["Gua Musang (Daerah Galas Dan Bertam), Jeli"]
		},
		Melaka: {
			MLK01: ["SELURUH NEGERI MELAKA"]
		},
		"Negeri Sembilan": {
			NGS01: ["Tampin, Jempol"],
			NGS02: ["Jelebu, Kuala Pilah, Port Dickson, Rembau, Seremban"]
		},
		Pahang: {
			PHG01: ["Pulau Tioman"],
			PHG02: ["Kuantan, Pekan, Rompin, Muadzam Shah"],
			PHG03: ["Jerantut, Temerloh, Maran, Bera, Chenor, Jengka"],
			PHG04: ["Bentong, Lipis, Raub"],
			PHG05: ["Genting Sempah, Janda Baik, Bukit Tinggi"],
			PHG06: ["Cameron Highlands, Genting Higlands, Bukit Fraser"]
		},
		Perlis: {
			PLS01: ["Kangar, Padang Besar, Arau"]
		},
		"Pulau Pinang": {
			PNG01: ["Seluruh Negeri Pulau Pinang"]
		},
		Perak: {
			PRK01: ["Tapah, Slim River, Tanjung Malim"],
			PRK02: [
				"Kuala Kangsar, Sg. Siput (Daerah Kecil), Ipoh, Batu Gajah, Kampar"
			],
			PRK03: ["Lenggong, Pengkalan Hulu, Grik"],
			PRK04: ["Temengor, Belum"],
			PRK05: [
				"Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor"
			],
			PRK06: ["Selama, Taiping, Bagan Serai, Parit Buntar"],
			PRK07: ["Bukit Larut"]
		},
		Sabah: {
			SBH01: [
				"Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan"
			],
			SBH02: [
				"Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)"
			],
			SBH03: [
				"Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau (Timur)"
			],
			SBH04: [
				"Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)"
			],
			SBH05: ["Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat"],
			SBH06: ["Gunung Kinabalu"],
			SBH07: [
				"Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat"
			],
			SBH08: [
				"Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)"
			],
			SBH09: [
				"Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pa Sia, Membakut, Weston, Bahagian Pendalaman (Bawah)"
			]
		},
		Selangor: {
			SGR01: [
				"Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, Rawang, S.Alam"
			],
			SGR02: ["Kuala Selangor, Sabak Bernam"],
			SGR03: ["Klang, Kuala Langat"]
		},
		Sarawak: {
			SWK01: ["Limbang, Lawas, Sundar, Trusan"],
			SWK02: ["Miri, Niah, Bekenu, Sibuti, Marudi"],
			SWK03: ["Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu"],
			SWK04: [
				"Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit"
			],
			SWK05: ["Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai"],
			SWK06: [
				"Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok"
			],
			SWK07: ["Serian, Simunjan, Samarahan, Sebuyau, Meludam"],
			SWK08: ["Kuching, Bau, Lundu, Sematan"],
			SWK09: ["Zon Khas (Kampung Patarikan)"]
		},
		Terengganu: {
			TRG01: ["Kuala Terengganu, Marang, Kuala Nerus"],
			TRG02: ["Besut, Setiu"],
			TRG03: ["Hulu Terengganu"],
			TRG04: ["Dungun, Kemaman"]
		},
		"Wilayah Persekutuan": {
			WLY01: ["Kuala Lumpur, Putrajaya"],
			WLY02: ["Labuan"]
		}
	}
};

export default Constants;

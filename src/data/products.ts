export interface Product {
  name: string;
  type: string;
  description: string;
  ph: number;
  phLabel: string;
  application: string;
  frequency: string[];
  usage: string;
  dosage: string;
}

export const products: Product[] = [
  {
    name: 'Alkaliczny koncentrat do mycia podłóg Biopur F301',
    type: 'Koncentrat',
    description: 'Zasadowy środek niskopienny do codziennego mycia podłóg',
    ph: 11,
    phLabel: '11',
    application: 'Mycie podłóg',
    frequency: ['Codziennie', 'Okresowo'],
    usage:
      'Mycie bieżące: 1% (100 ml / 10 l roztworu); doczyszczanie powierzchni: 1–5% (100–500 ml / 10 l roztworu); trudne zabrudzenia: 10–50% (1–5 l środka / 10 l roztworu). Umyj powierzchnię przygotowanym roztworem, a następnie dokładnie spłucz czystą wodą. W przypadku silniejszych zabrudzeń zalecamy powtórzenie czynności.',
    dosage: '100–5000 ml / 10 l roztworu',
  },
  {
    name: 'Ekologiczny płyn do czyszczenia powierzchni szklanych Biopur E1',
    type: 'Gotowy do użycia',
    description: 'Alkoholowy płyn do codziennego mycia powierzchni szklanych na bazie naturalnych składników',
    ph: 7,
    phLabel: '7',
    application: 'Mycie szyb',
    frequency: ['Codziennie', 'Okresowo'],
    usage:
      'Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność. ',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Ekologiczny płyn do mycia powierzchni Biopur E2',
    type: 'Gotowy do użycia',
    description: 'Ekologiczny płyn do codziennego mycia i pielęgnacji powierzchni odpornych na działanie wody',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Spryskaj raz płynem czystą ścierkę. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Ekologiczny uniwersalny koncentrat do mycia podłóg manualnie Biopur E6',
    type: 'Koncentrat',
    description: 'Ekologiczny, neutralny koncentrat do codziennego mycia podłóg oparty na naturalnych składnikach',
    ph: 7,
    phLabel: '7',
    application: 'Mycie podłóg',
    frequency: ['Codziennie'],
    usage:
      'Lekkie zabrudzenia: 0,25% (25 ml koncentratu / 10 l roztworu), średnie zabrudzenia: 0,5% (50 ml koncentratu / 10 l roztworu), trudne zabrudzenia: 2% (200 ml koncentratu / 10 l roztworu). Nanieś roztwór, równomiernie pokrywając powierzchnię.',
    dosage: '25–200 ml / 10 l roztworu',
  },
  {
    name: 'Ekologiczny uniwersalny koncentrat do mycia podłóg maszynowo Biopur E9',
    type: 'Koncentrat',
    description: 'Ekologiczny, neutralny, zapachowy koncentrat do codziennego mycia podłóg za pomocą automatów lub szorowarek',
    ph: 7,
    phLabel: '7',
    application: 'Mycie podłóg',
    frequency: ['Codziennie'],
    usage:
      'Lekkie zabrudzenia: 0,25% (25 ml koncentratu / 10 l roztworu), średnie zabrudzenia: 0,5% (50 ml koncentratu / 10 l roztworu), trudne zabrudzenia: 2% (200 ml koncentratu / 10 l roztworu). Nanieś roztwór, równomiernie pokrywając powierzchnię.',
    dosage: '25–200 ml / 10 l roztworu',
  },
  {
    name: 'Ekologiczny uniwersalny koncentrat do mycia powierzchni Biopur E4',
    type: 'Koncentrat',
    description: 'Profesjonalny, ekologiczny koncentrat do codziennego mycia wodoodpornych powierzchni, oparty na naturalnych składnikach. Nadaje się do mycia manualnego, jak i maszynowego',
    ph: 7,
    phLabel: '7',
    application: 'Mycie podłóg',
    frequency: ['Codziennie'],
    usage:
      'Lekkie zabrudzenia: 0,25% (25 ml środka / 10 l roztworu), średnie zabrudzenia: 0,5% (50 ml środka / 10 l roztworu),trudne zabrudzenia: 1% (100 ml / 10 l roztworu). Nanieś roztwór na czyszczoną powierzchnię',
    dosage: '25–100 ml / 10 l roztworu',
  },
  {
    name: 'Ekologiczny uniwersalny koncentrat do mycia sanitariatów Biopur E5',
    type: 'Koncentrat',
    description: 'Profesjonalny, ekologiczny, kwasowy koncentrat do codziennego mycia wodoodpornych powierzchni odpornych na działanie kwasów, oparty na naturalnych składnikach',
    ph: 1,
    phLabel: '1',
    application: 'Sanitariaty',
    frequency: ['Codziennie'],
    usage:
      'Lekkie zabrudzenia: 0,25% (25 ml koncentratu / 10 l roztworu), średnie zabrudzenia: 0,5% (50 ml koncentratu / 10 l roztworu), trudne zabrudzenia: 1% (100 ml koncentratu / 10 l roztworu). Nanieś przygotowany roztwór na powierzchnię i wyczyść.',
    dosage: '25–100 ml / 10 l roztworu',
  },
  {
    name: 'Ekologiczny uniwersalny odtłuszczacz Biopur E11',
    type: 'Gotowy do użycia',
    description: 'Profesjonalny, zasadowy gotowy płyn do czyszczenia i usuwania tłustych, spieczonych zabrudzeń z powierzchni i przedmiotów odpornych na działanie alkaliów',
    ph: 14,
    phLabel: '14',
    application: 'Kuchnia',
    frequency: ['Codziennie'],
    usage:
      'Spryskaj raz czyszczoną powierzchnię z odległości około 10 cm. Pozostaw preparat na 2–5 minut, aby umożliwić rozpuszczenie tłustych i przypalonych zabrudzeń. Wyczyść powierzchnię. Dokładnie spłucz wodą i wytrzyj powierzchnię do sucha.',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Ekologiczny uniwersalny płyn do mycia sanitariatów Biopur E3',
    type: 'Gotowy do użycia',
    description: 'Profesjonalny, ekologiczny detergent w formie pianki do codziennego mycia powierzchni i urządzeń sanitarnych, oparty na naturalnych składnikach',
    ph: 2,
    phLabel: '2',
    application: 'Sanitariaty',
    frequency: ['Codziennie'],
    usage:
      'Spryskaj raz czyszczoną powierzchnię z odległości około 10 cm. Pozostaw preparat na kilkanaście sekund, a przy uporczywych zabrudzeniach na 2–3 minuty. Wyczyść powierzchnię, a następnie spłucz wodą lub wytrzyj wilgotną ściereczką.',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Ekologiczny uniwersalny żel do WC Biopur E10',
    type: 'Żel',
    description: 'Profesjonalny środek w formie żelu do codziennego czyszczenia toalet, pisuarów i armatury sanitarnej',
    ph: 2,
    phLabel: '2',
    application: 'Sanitariaty',
    frequency: ['Codziennie'],
    usage:
      'Przeczyść muszlę wodą, używając szczotki, aby zwiększyć skuteczność działania żelu. Odkręć korek tak, aby aplikator pozostał na miejscu. Rozprowadź żel pod obrzeżem muszli klozetowej lub pisuaru. Pozostaw do 15 minut w celu aktywnego działania. Ponownie użyj szczotki w celu pozbycia się rozpuszczonych zabrudzeń i spłucz muszlę wodą.',
    dosage: 'Bez rozcieńczania',
  },
  {
    name: 'Enzymatyczny koncentrat do mycia naczyń Biopur F731',
    type: 'Koncentrat',
    description: 'Enzymatyczny płyn do mycia naczyń oraz przedmiotów w zmywarkach gastronomicznych',
    ph: 8,
    phLabel: '8',
    application: 'Kuchnia',
    frequency: ['Codziennie'],
    usage:
      'Ustaw odpowiednie parametry dozowania (1–5 ml środka na 1 l wody, temperatura wody: 40–60°C). Umieść naczynia w zmywarce. Uruchom cykl mycia zgodnie z instrukcją producenta zmywarki.',
    dosage: '1–5 ml / 1 l wody',
  },
  {
    name: 'Enzymatyczny żel do mycia naczyń Biopur F732',
    type: 'Żel',
    description: 'Enzymatyczny żel do mycia naczyń oraz przedmiotów w zmywarkach gastronomicznych',
    ph: 8,
    phLabel: '8',
    application: 'Kuchnia',
    frequency: ['Codziennie'],
    usage:
      'Wlej żel do dozownika na detergent znajdującego się w zmywarce gastronomicznej (10–20 ml). Zamknij dozownik i uruchom odpowiedni cykl zmywania w temperaturze 40–60°C.',
    dosage: '10–20 ml / 1 l wody',
  },
  {
    name: 'Kwasowy koncentrat czyszczący Biopur F831',
    type: 'Koncentrat',
    description: 'Profesjonalny, kwasowy koncentrat do czyszczenia, odtłuszczania i usuwania zabrudzeń naturalnych i syntetycznych, w tym rdzy i wykwitów wapiennych',
    ph: 2,
    phLabel: '2',
    application: 'Teren zewnętrzny',
    frequency: ['Okresowo, W razie potrzeby'],
    usage:
      'Delikatne zabrudzenia: 1–2% (100–200 ml środka / 10 l roztworu), średnie zabrudzenia: 5% (500 ml środka / 10 l roztworu), silne zabrudzenia: 10% (1000 ml środka / 10 l roztworu). Rozprowadź środek po powierzchni. Pozostaw wytworzoną pianę na powierzchni do 15 minut, nie dopuszczając do wyschnięcia. Przeszoruj powierzchnię szczotką ryżową lub maszyną jednotarczową. Po zakończeniu procesu dokładnie spłucz zimną wodą.',
    dosage: '100–1000 ml / 10 l roztworu',
  },
  {
    name: 'Kwasowy koncentrat czyszczący Biopur F832',
    type: 'Koncentrat',
    description: 'Profesjonalny, kwasowy koncentrat do czyszczenia, odtłuszczania i usuwania zabrudzeń naturalnych i syntetycznych, w tym rdzy i wykwitów wapiennych',
    ph: 2,
    phLabel: '2',
    application: 'Teren zewnętrzny',
    frequency: ['Okresowo, W razie potrzeby'],
    usage:
      'Delikatne zabrudzenia: 1–2% (100–200 ml środka / 10 l roztworu), średnie zabrudzenia: 5% (500 ml środka / 10 l roztworu), silne zabrudzenia: 10% (1000 ml środka / 10 l roztworu). Nanieś rozcieńczony preparat na powierzchnię elewacji lub dachu. Pozostaw pianę na powierzchni do 15 minut, nie dopuszczając do wyschnięcia mytej powierzchni. Spłucz dokładnie strumieniem wody.',
    dosage: '100–1000 ml / 10 l roztworu',
  },
  {
    name: 'Kwasowy koncentrat do czyszczenia sanitariatów Biopur F521',
    type: 'Koncentrat',
    description: 'Profesjonalny środek do codziennego mycia pomieszczeń sanitarnych, urządzeń sanitarnych oraz armatury łazienkowej, kabin prysznicowych i wanien kąpielowych',
    ph: 2,
    phLabel: '2',
    application: 'Sanitariaty',
    frequency: ['Codziennie'],
    usage:
      'Mycie bieżące: 0,25% (25 ml środka / 10 l roztworu), średnie zabrudzenia: 0,5% (50 ml środka / 10 l roztworu), trudne zabrudzenia: 10% (1 l środka / 10 l roztworu), silnie zakamienione powierzchnie: 50% (0,5 l środka w 1 l wody + spryskiwacz). Umyj powierzchnię przygotowanym roztworem. Dokładnie spłucz zimną wodą.',
    dosage: '25–1000 ml / 10 l roztworu',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Alkaliczny środek myjący',
    description: 'Alkaliczny środek myjący do podłóg i powierzchni płaskich',
    ph: 11,
    phLabel: '11',
    application: 'Powierzchnie płaskie',
    frequency: ['Codziennie'],
    usage:
      'Przygotuj roztwór: 1–5% (100–500 ml na 10 l wody). Umyj powierzchnię przygotowanym roztworem. Następnie spłucz czystą wodą.',
    dosage: '100–500 ml / 10 L wody',
  },
  {
    name: 'do wypełnienia',
    type: 'Ekologiczny płyn do czyszczenia powierzchni szklanych',
    description: 'Ekologiczny płyn do czyszczenia powierzchni szklanych, 1 l',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie szklane',
    frequency: ['Codziennie'],
    usage:
      'Produkt nie wymaga rozcieńczania. Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
    {
    name: 'do wypełnienia',
    type: 'Ekologiczny płyn do czyszczenia powierzchni szklanych',
    description: 'Ekologiczny płyn do czyszczenia powierzchni szklanych, 1 l',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie szklane',
    frequency: ['Codziennie'],
    usage:
      'Produkt nie wymaga rozcieńczania. Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
    {
    name: 'do wypełnienia',
    type: 'Ekologiczny płyn do czyszczenia powierzchni szklanych',
    description: 'Ekologiczny płyn do czyszczenia powierzchni szklanych, 1 l',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie szklane',
    frequency: ['Codziennie'],
    usage:
      'Produkt nie wymaga rozcieńczania. Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
    {
    name: 'do wypełnienia',
    type: 'Ekologiczny płyn do czyszczenia powierzchni szklanych',
    description: 'Ekologiczny płyn do czyszczenia powierzchni szklanych, 1 l',
    ph: 7,
    phLabel: '7',
    application: 'Powierzchnie szklane',
    frequency: ['Codziennie'],
    usage:
      'Produkt nie wymaga rozcieńczania. Spryskaj czystą ścierkę płynem. Wyczyść powierzchnię i wytrzyj ją do sucha. W przypadku silniejszych zabrudzeń powtórz czynność.',
    dosage: 'Bez rozcieńczania',
  },
];

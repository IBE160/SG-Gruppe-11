# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon

**Gruppenavn:** Things+

**Gruppemedlemmer:**
- [Navn 1] - 115
- [Navn 2] - 131
- [Navn 3] - 138
- [Navn 4] - 28

**Dato:** 04.12.2025

---

## 2. Utviklingsprosessen

### 2.1 Oversikt over prosjektet
Vi har utviklet en to-do task manager app kalt "Things+". Hovedmålet med applikasjonen er å hjelpe studenter, spesielt de som kombinerer studier med fulltidsjobb, med å strømlinjeforme og samle alle oppgaver på ett sted.

**Bakgrunn:** Studenter ved bachelorprogrammet i logistikk ved Høgskolen i Molde, som ofte kombinerer studier med fulltidsjobb, sliter med å integrere daglige oppgaver med skolekrav. Mange har utfordringer med å holde oversikt over frister og oppgaver på tvers av ulike plattformer.

**Formål:** Appen henter data fra primært Canvas for å strømlinjeforme frister og andre oppgaver med brukerens foretrukne kalender. Den vil foreslå en tidslinje og tildele tidsluker i kalenderen basert på data fra Canvas og brukerens egne kalenderinnspill. I stedet for å måtte sjekke flere apper/nettsteder, vil Things+ strømlinjeforme og samle alle oppgaver på ett sted.

**Målgruppe:** Studenter med fulltidsjobb i tillegg til studiene, men også alle som bruker Canvas og en integrert kalender på telefonen eller laptopen for planleggingsformål.

### 2.2 Arbeidsmetodikk

- Istede for å fordele oppgavene så jobbet vi sammen med hyppige teams møter og diskusjoner på hvordan vi ville at denne applikasjonen skulle fungere. Vi føler at denne måten å jobbe på har fungert veldig fint slik at vi alle får en felles forståelse om hvordan programering fungerer.

- Vi har aktivt brukt KI-verktøy som Gemini CLI integrert i VS Code for å assistere med kodeforståelse, feilsøking, generering av kodeeksempler, og utforming av dokumentasjon. KI har fungert som en interaktiv partner for å akselerere utviklingsprosessen og forbedre kodekvaliteten.

### 2.3 Teknologi og verktøy
- Frontend: Next.js, React, TypeScript, Tailwind CSS, HTML/CSS
- Backend: Next.js API Routes
- Database: Prisma (ORM), PostgreSQL
- KI-verktøy: Gemini CLI, Google Gemini (Gemini 2.0 Flash), OpenRouter
- Andre verktøy: VS Code, BMAD, Git

### 2.4 Utviklingsfaser
Prosjektet ble delt inn i to hovedfaser: en planleggings- og designfase, etterfulgt av en utviklings- og implementeringsfase.

**Fase 1: Planlegging og Design**
- **Hva gjorde dere i denne fasen?**
  I denne fasen la vi grunnlaget for hele prosjektet. Arbeidet startet med idémyldring (`brainstorming.md`) og utforming av et prosjektforslag (`proposal.md`). Deretter definerte vi produktkravene i et Product Requirements Document (`docs/PRD.md`) og brøt ned arbeidet i større enheter (`docs/epics.md`) og konkrete brukerhistorier (`docs/stories/`). Vi planla også de første sprintene (`docs/sprint-1-plan.md`), designet systemarkitekturen (`docs/architecture.md`), og spesifiserte brukeropplevelsen (`docs/ux-design-specification.md`). Hele prosessen ble styrt ved hjelp av BMAD-rammeverket.

- **Hvordan brukte dere KI her?**
  KI var en sentral partner i planleggingsfasen. Vi brukte KI til å generere og strukturere ideer, utforme dokumentmaler og som en sparringspartner for å spisse kravene. Et typisk eksempel var å bruke KI til å bryte ned en Epic til håndterbare User Stories.

  **Eksempel på prompt:**
  ```
  "Basert på følgende Epic for vår 'Things+' applikasjon, generer 5-7 detaljerte User Stories som dekker kjernefunksjonaliteten. Inkluder akseptansekriterier for hver story.

  **Epic:** Som en travel student, vil jeg kunne synkronisere oppgavene mine fra Canvas til 'Things+' appen, slik at jeg har alle frister og gjøremål samlet på ett sted."
  ```

**Fase 2: Utvikling og Implementering**
- **Hva gjorde dere i denne fasen?**
  Dette var den tekniske gjennomføringsfasen. Vi bygget en fullstack-applikasjon med Next.js, der vi utviklet frontend-komponenter i React/TypeScript (`pages/`), satte opp API-endepunkter for backend-logikk (`pages/api/`), og integrerte en PostgreSQL-database ved hjelp av Prisma (`prisma/schema.prisma`). Vi la også opp en CI/CD-pipeline med GitHub Actions (`.github/workflows/main.yml`) for å automatisere testing og deployment. Arbeidet ble organisert i sprinter, og resultatene ble dokumentert i `sprint-artifacts/`.

- **Hvordan brukte dere KI her?**
  Under utviklingen fungerte Gemini CLI som en "pair programmer". Vi brukte KI til å generere kodeskjeletter for React-komponenter, skrive logikk for API-ruter, feilsøke kode, implementere funksjonalitet som kryptering (`lib/crypto.ts`), og skrive enhetstester (`__tests__/simple.test.js`).

  **Eksempel på prompt:**
  ```
  "Jeg trenger en React-komponent for innlogging i Next.js med TypeScript og Tailwind CSS. Lag en 'login.tsx'-fil som inneholder:
  1. Et skjema med e-post- og passordfelt.
  2. State-håndtering for input-feltene.
  3. En 'handleLogin'-funksjon som kaller et API-endepunkt '/api/auth/login'.
  4. Enkel feilhåndtering som viser en melding ved mislykket pålogging.
  5. Styling med Tailwind CSS for et rent og moderne utseende."
  ```

---

## 3. Utfordringer og løsninger

### 3.1 Tekniske utfordringer
Vi støtte på flere tekniske hindringer i løpet av prosjektet. Under beskrives to av de mest sentrale utfordringene og hvordan vi løste dem, ofte med bistand fra KI.

**Utfordring 1: Sikker API-integrasjon med Canvas**
- **Problem:** Den største tekniske bøygen var å koble applikasjonen til Canvas sitt API på en sikker og robust måte. Vi var usikre på den korrekte implementeringen av OAuth 2.0-autentiseringsflyten, hvordan vi skulle lagre API-tokens på en sikker måte etter at brukeren hadde logget inn, og hvordan vi skulle håndtere paginerte svar fra API-et for å sikre at vi hentet alle oppgavene til brukeren.
- **Løsning:** Løsningen ble å bygge et eget API-endepunkt i Next.js (`/pages/api/canvas/`) som fungerte som en mellomvare (backend-for-frontend). Dette endepunktet håndterte all kommunikasjon med Canvas-API-et. Brukerens `access_token` ble kryptert ved hjelp av `crypto.ts` og lagret i en `httpOnly`-cookie, noe som forhindret tilgang via JavaScript i nettleseren. Vi implementerte også en løkke som fulgte `Link`-headeren i API-svarene for å hente alle sider med data.
- **KI sin rolle:** KI var avgjørende for å løse dette. Vi brukte Gemini CLI til å få en detaljert, steg-for-steg guide for å implementere OAuth 2.0 i Next.js. KI ga oss kodeskjeletter for API-ruten, foreslo `httpOnly`-cookies som en sikker lagringsmetode, og genererte en funksjon for å håndtere paginering basert på en beskrivelse av Canvas sitt API.

**Utfordring 2: Global State Management for asynkrone data**
- **Problem:** Applikasjonen henter data fra flere kilder (Canvas, brukerens kalender) asynkront. I starten sendte vi data nedover komponenttreet via props ("prop drilling"), noe som raskt ble uoversiktlig og førte til synkroniseringsfeil. For eksempel kunne kalenderen og oppgavelisten vise ulik status fordi de ikke delte samme datakilde.
- **Løsning:** Vi innså at vi trengte en global tilstandshåndtering (state management). Etter å ha vurdert ulike biblioteker, valgte vi å bruke Reacts innebygde `Context API` sammen med `useReducer`-hooken. Vi opprettet en `AppContext` som holdt en global tilstand for oppgaver, kalenderhendelser, og brukerinformasjon. Dette ga oss en "single source of truth" som alle komponenter kunne lese fra og oppdatere via dispatch-funksjoner.
- **KI sin rolle:** Vi konsulterte KI for å få en oversikt over fordeler og ulemper med ulike state management-løsninger (Redux, Zustand, Context API). Da vi valgte Context API, ba vi KI om et komplett eksempel på hvordan man setter opp en `Provider` med en `reducer` for å håndtere asynkrone handlinger som `FETCH_START`, `FETCH_SUCCESS` og `FETCH_ERROR`. Dette ga oss en solid mal vi kunne bygge videre på.

### 3.2 Samarbeidsutfordringer
Selv om vi valgte en tett samarbeidsmodell som fungerte godt, hadde også denne arbeidsformen sine utfordringer knyttet til synkronisering og effektivitet.

- **Utfordring 1: Håndtering av felles kodebase i sanntid.**
  Siden vi jobbet mye sammen på den samme koden, oppstod det hyppige `merge`-konflikter i Git. Det var tidkrevende å sikre at alle hadde identiske versjoner av prosjektet lokalt før vi startet en felles kodeøkt, og det hendte at endringer ble overskrevet.

- **Løsning:** Vi innførte en mer strukturert Git-arbeidsflyt. Vi bestemte oss for å bruke en "Driver/Navigator"-modell under fellesøktene, der kun én person ("Driver") skrev kode og delte skjermen sin. All koding ble gjort på en dedikert `feature`-branch for den aktuelle økten. Etter økten ble branchen pushet, og vi gjennomgikk endringene i en Pull Request sammen. Dette reduserte antall merge-konflikter drastisk og ga oss en felles arena for kodegjennomgang.

- **Utfordring 2: Ustrukturerte og lange diskusjoner.**
  Våre hyppige Teams-møter var essensielle for felles forståelse, men de kunne noen ganger bli uproduktive. Diskusjoner om tekniske valg eller design kunne dra ut i tid uten at vi landet på en konkret beslutning, noe som stjal verdifull utviklingstid.

- **Løsning:** Vi implementerte en fastere møtestruktur. Hver økt startet med en klar agenda og et definert mål. For tekniske diskusjoner benyttet vi oss av "timeboxing". Hvis en diskusjon varte lenger enn 15 minutter uten enighet, pauset vi den. Én person fikk ansvaret for å undersøke alternativene og presentere en anbefaling i neste møte. Dette tvang oss til å bli mer beslutningsdyktige og fokuserte.

### 3.3 KI-spesifikke utfordringer
Bruken av KI var i stor grad en positiv opplevelse, men den kom ikke uten egne, unike utfordringer. Vi måtte lære oss å jobbe *med* KI-en, ikke bare be den om å gjøre ting.

- **Utfordring 1: "Hallusinasjoner" og utdatert kode.**
  Et gjennomgående problem var at KI-en kunne generere kode som så overbevisende ut, men som var feil eller utdatert. For eksempel foreslo den i ett tilfelle å bruke en funksjon fra en eldre versjon av Next.js, noe som førte til feilmeldinger som var vanskelige å diagnostisere. Vi kastet bort tid på feilsøking av kode som aldri kunne ha fungert, et klassisk eksempel på en KI-"hallusinasjon".

- **Håndtering:** Vi utviklet en sunn skepsis til KI-generert kode. Vi innførte en regel om at all kode fra KI-en skulle behandles som et utkast, ikke en ferdig løsning. Før koden ble tatt i bruk, måtte den kryss-sjekkes mot den offisielle dokumentasjonen for det aktuelle biblioteket (f.eks. Next.js, Prisma). Dette krevde mer disiplin, men sparte oss for mye feilsøking i det lange løp.

- **Utfordring 2: Mangel på prosjektspesifikk kontekst.**
  KI-en har ingen iboende kunnskap om vår prosjektstruktur, arkitektur eller kodestil. Når vi ba om hjelp til å utvide en funksjon, var forslagene ofte generiske og passet ikke inn med vår etablerte `AppContext` eller navnekonvensjoner. Den kunne for eksempel foreslå en helt ny state management-løsning i en komponent, i stedet for å bruke den globale contexten vi allerede hadde.

- **Håndtering:** Løsningen ble å bli mye flinkere til å gi KI-en kontekst i promptene våre. I stedet for å spørre "Hvordan sletter jeg en oppgave?", lærte vi oss å spørre: "Gitt følgende `AppContext`-provider og `taskReducer`, skriv en `DELETE_TASK` case for reduceren som fjerner en oppgave basert på ID fra `state.tasks`-arrayet". Ved å inkludere relevante kodebiter i prompten, fikk vi forslag som var skreddersydd for vårt prosjekt og mye mer nyttige.

---

## 4. Kritisk vurdering av KI sin påvirkning

### 4.1 Fordeler med KI-assistanse
KI-assistanse var en integrert og uvurderlig del av vår utviklingsprosess. Verktøy som Gemini CLI fungerte ikke bare som kodebibliotek, men som en aktiv samarbeidspartner som forbedret både hastighet, læring og den endelige kvaliteten på prosjektet.

**Effektivitet og produktivitet:**
- **Hvordan påvirket KI arbeidshastigheten?**
  KI økte arbeidshastigheten vår dramatisk. I stedet for å bruke timer på å søke i dokumentasjon eller forum for å løse komplekse problemer som OAuth 2.0-integrasjon, kunne vi få en strukturert, steg-for-steg guide på minutter. Dette reduserte "down-time" og holdt utviklingsflyten i gang.
- **Eksempler på oppgaver som gikk raskere:**
  - **Generering av "boilerplate"-kode:** Oppretting av nye React-komponenter, API-ruter i Next.js, eller konfigurasjonsfiler ble akselerert ved at KI genererte komplette kodeskjeletter. Vår `login.tsx`-komponent ble for eksempel skissert ut på et par minutter, inkludert state-håndtering og grunnleggende styling.
  - **Feilsøking:** Når vi møtte kryptiske feilmeldinger, kunne vi lime inn feilen og den relevante koden i KI-verktøyet og få en umiddelbar forklaring og forslag til løsning. Dette var spesielt nyttig for å løse synkroniseringsfeil knyttet til asynkrone operasjoner.
  - **Dokumentasjon:** KI hjalp oss med å formulere klare og konsise beskrivelser for funksjoner, komponenter og i `README`-filer, en oppgave som ofte er tidkrevende.

**Læring og forståelse:**
- **Hva lærte dere ved å bruke KI?**
  Vi lærte ikke bare *hvordan* vi skulle implementere en løsning, men også *hvorfor* den fungerte. KI fungerte som en tålmodig mentor som kunne forklare komplekse konsepter på en enkel måte. Da vi implementerte global state management, fikk vi ikke bare koden, men også en forklaring på `useReducer`-hooken og hvorfor den var et godt valg for vårt bruksområde.
- **Bidro KI til bedre forståelse av konsepter?**
  Absolutt. For eksempel var sikkerhetsaspektene ved API-integrasjon (som `httpOnly`-cookies for å forhindre XSS-angrep) et område der KI ga oss dypere innsikt. KI forklarte risikoene og begrunnet hvorfor den foreslåtte løsningen var sikrere, noe som hevet vår generelle kompetanse innen web-sikkerhet.

**Kvalitet på koden:**
- **Hvordan påvirket KI kodekvaliteten?**
  KI fungerte som en konstant kodegjennomgangspartner. Den hjalp oss med å identifisere "code smells", foreslå refaktoreringer og oppmuntret oss til å følge beste praksis.
- **Eksempler på forbedringer KI foreslo:**
  - **Refaktorering for gjenbruk:** I starten hadde vi duplisert logikk for datakall i flere komponenter. KI foreslo å refaktorere dette til en gjenbrukbar "custom hook", noe som gjorde koden vår tørrere ("Don't Repeat Yourself") og enklere å vedlikeholde.
  - **Optimalisering:** KI foreslo å bruke `React.memo` for å forhindre unødvendige re-rendringer av komponenter, noe som forbedret ytelsen i applikasjonen.
  - **Samsvar med standarder:** Verktøyet hjalp oss med å skrive mer idiomatisk TypeScript-kode ved å påpeke bedre måter å definere typer og interfaces på, noe som gjorde koden mer robust og forutsigbar.

### 4.2 Begrensninger og ulemper
Selv om KI var en enorm ressurs, var det ikke uten ulemper. Vi måtte lære oss å bruke verktøyet kritisk og være bevisste på dets begrensninger for å unngå fallgruver som kunne ha redusert kvaliteten på prosjektet.

**Kvalitet og pålitelighet:**
- **Eksempler på feil eller dårlige løsninger fra KI:**
  - **Utdaterte avhengigheter:** I ett tilfelle foreslo KI å bruke et bibliotek for datovisning som var utdatert og ikke lenger aktivt vedlikeholdt. En rask sjekk på npm avslørte dette, og vi valgte et mer moderne alternativ.
  - **Overkompliserte løsninger:** Da vi ba om en funksjon for å sortere oppgaver, genererte KI en kompleks algoritme som var unødvendig for vårt enkle datastruktur. En standard `Array.sort()` med en sammenligningsfunksjon var en mye enklere og mer lesbar løsning.
- **Hvordan oppdaget og håndterte dere disse?**
  Vi oppdaget feilene ved å alltid behandle KI-generert kode som et forslag, ikke en fasit. All kode ble kritisk gjennomgått og testet. Vi sjekket alltid dokumentasjonen for foreslåtte biblioteker og stilte oss selv spørsmålet: "Finnes det en enklere måte å gjøre dette på?". Dette kritiske blikket var avgjørende for å sile ut dårlige forslag.

**Avhengighet og forståelse:**
- **Ble dere for avhengige av KI?**
  I starten var det en tendens til å "spørre KI først" før vi tenkte selv. Vi merket at dette kunne føre til en overfladisk forståelse av koden vi implementerte.
- **Var det tilfeller hvor KI hindret læring?**
  Ja, spesielt med konfigurasjonsfiler (f.eks. `tailwind.config.js` eller `tsconfig.json`). Det var fristende å bare akseptere den ferdige konfigurasjonen KI ga oss uten å fullt ut forstå hva hver enkelt innstilling gjorde. Vi motvirket dette ved å be KI om å forklare hver linje i konfigurasjonen, noe som tvang oss til å engasjere oss i materien og bygge en dypere forståelse.

**Kreativitet og problemløsning:**
- **Påvirket KI deres egen kreativitet?**
  KI er trent på eksisterende mønstre, og løsningene den foreslår er ofte konvensjonelle. Dette kan i noen tilfeller begrense "utenfor boksen"-tenkning. Da vi designet brukergrensesnittet for ukeplanleggeren (`weekly-planner.tsx`), ga KI oss et veldig standard rutenett-layout.
- **Eksempler på situasjoner hvor KI begrenset kreativ tenkning:**
  Vi følte at KI-ens forslag til UI-design var funksjonelt, men manglet innovasjon. For å bryte ut av dette, brukte vi KI som en "idé-generator" i stedet for en "løsnings-generator". Vi ba om fem radikalt forskjellige måter å visualisere en ukeplan på. Dette ga oss et bredere spekter av ideer (f.eks. en sirkulær klokke-visning, en tidslinje-visning) som vi kunne bruke som inspirasjon for å designe vår egen, unike løsning. Ved å endre måten vi stilte spørsmål på, snudde vi begrensningen til en fordel.

### 4.3 Sammenligning: Med og uten KI
Refleksjon over prosjektforløpet med og uten KI-assistanse avdekker fundamentale forskjeller i både prosess og sluttprodukt.

- **Hva ville vært annerledes?**
  Uten KI ville utviklingsprosessen vært betydelig lengre og mer utfordrende. Komplekse integrasjoner, som OAuth 2.0 mot Canvas API, ville krevd omfattende manuelt research og "trial-and-error"-programmering. Tiden brukt på feilsøking ville vært mangedoblet, og generering av grunnleggende kode og test-skeletter ville stjålet verdifull tid fra kjernefunksjonalitet.

- **Hvilke deler av prosjektet ville vært vanskeligere/lettere?**
  - **Vanskeligere:** Alt som involverte ny teknologi eller komplekse algoritmer, som sikker autentisering, state management-mønstre, og optimering av datakall. Dokumentasjon og testing ville også vært mer tidkrevende og potensielt mindre grundig.
  - **Lettere:** Kanskje ville den initielle idéfasen og kreative designprosessen, spesielt for UI/UX, hatt mer rom for ren menneskelig kreativitet uten at KI presenterte "standardløsninger" for tidlig. Imidlertid ville implementasjonen av selv disse kreative ideene vært vanskeligere uten KI.

- **Ville sluttresultatet vært bedre eller dårligere?**
  Sluttresultatet ville mest sannsynlig vært dårligere, eller prosjektet ville ikke ha nådd samme modenhetsgrad innen tidsfristen. KI-assistanse tillot oss å implementere mer robust funksjonalitet, utforske sikrere løsninger, og opprettholde en høyere kodekvalitet enn det som ville vært mulig uten. Den kontinuerlige læringen fasilitert av KI bidro også til et mer gjennomtenkt og optimalisert produkt. Prosjektet ville nok ha endt opp med færre funksjoner, flere bugs og en mindre polert brukeropplevelse.

### 4.4 Samlet vurdering
[Konklusjon: Hvordan påvirket KI sluttresultatet totalt sett?]
- **Var KI en netto positiv eller negativ faktor?**
  KI var en utvetydig netto positiv faktor for prosjektet. Fordelene i form av økt produktivitet, akselerert læring og forbedret kodekvalitet veide langt tyngre enn ulempene. Begrensningene, som risikoen for dårlig kode eller avhengighet, ble effektivt håndtert gjennom en kritisk og bevisst arbeidsmetodikk. Uten KI ville prosjektets omfang og kvalitet vært betydelig redusert.

- **Hva var den viktigste lærdommen om å bruke KI i utviklingsprosessen?**
  Den viktigste lærdommen er at KI er et verktøy, ikke en erstatning for en utvikler. Den er på sitt mektigste når den brukes som en interaktiv "pair programmer" og mentor, ikke som en "black box" som leverer ferdige løsninger. For å maksimere verdien av KI må man stille de riktige spørsmålene, kritisk vurdere svarene, og aldri slutte å lære om den underliggende teknologien. Evnen til å føre en intelligent "dialog" med KI er en ny og essensiell ferdighet for den moderne utvikleren.

---

## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap
- **Hvem er ansvarlig for koden når KI har bidratt?**
  Vår konklusjon er at ansvaret for koden utelukkende ligger hos utvikleren. Vi ser på KI-assistenten som et avansert verktøy, ikke som en kollega. På samme måte som man er ansvarlig for å velge riktig bibliotek eller rammeverk, er man ansvarlig for koden man velger å akseptere fra en KI. Hvis koden introduserer en feil, en sikkerhetssårbarhet eller ytelsesproblemer, er det vi som utviklere som må stå til ansvar for dette. Denne tankegangen tvang oss til å sette oss inn i all kode som ble generert, i stedet for å blindt stole på den.

- **Hvordan sikrer man kvalitet når KI genererer kode?**
  Kvalitetssikringen må være like streng, om ikke strengere, for KI-generert kode som for menneskeskrevet kode. Vår metode var en tretrinns-prosess: 1) **Kritisk gjennomgang:** All kode ble lest og forstått av minst ett teammedlem før den ble vurdert. 2) **Verifisering mot kilder:** Vi dobbeltsjekket logikk og syntaks mot offisiell dokumentasjon for å unngå utdaterte mønstre. 3) **Manuell testing:** All funksjonalitet ble testet manuelt for å bekrefte at den løste det faktiske problemet uten å introdusere bivirkninger.

- **Diskuter spørsmål om opphavsrett og intellektuell eiendom**
  Dette er et komplekst og uavklart juridisk felt. KI-modeller trenes på massive datasett, inkludert offentlig tilgjengelig kode med ulike lisenser. Det er derfor en risiko for at KI-generert kode kan inneholde elementer fra lisensiert kode (f.eks. GPL), noe som kan skape lisenskonflikter i et kommersielt produkt. For vårt akademiske prosjekt var dette en mindre risiko, men vi var bevisste på problemstillingen. Vår holdning er at man i en profesjonell setting må være ekstremt nøye med å vurdere vilkårene til KI-tjenesten og ha interne retningslinjer for bruk av KI-generert kode for å unngå juridiske fallgruver. Inntil videre anser vi den endelige, modifiserte koden som vårt eget intellektuelle produkt, men vi er åpne om at verktøy har blitt brukt i prosessen.

### 5.2 Transparens
- **Bør det være transparent at KI er brukt?**
  Ja, vi mener åpenhet om KI-bruk er essensielt, både i akademia og i næringslivet. I en læringskontekst er det nødvendig for å kunne vurdere studentens reelle kompetanse og læringsutbytte. I en profesjonell setting handler det om intellektuell ærlighet overfor arbeidsgivere og kolleger. Å være åpen om hvilke verktøy man bruker, gir teamet en bedre mulighet til å vurdere potensielle risikoer knyttet til vedlikehold, sikkerhet og kvalitet i koden som produseres.

- **Hvordan dokumenterer man KI sin bidrag?**
  For dette prosjektet er denne rapporten den primære formen for dokumentasjon. Vi har her beskrevet hvor og hvordan KI ble brukt. I et større prosjekt kunne man implementert mer granulære metoder. For eksempel kunne man brukt en egen etikett i commit-meldinger (f.eks. `[AI-assisted]`) for å markere kode som er vesentlig påvirket av KI. En annen tilnærming er å lagre sentrale prompter i prosjektets dokumentasjon, slik vi har gjort med eksemplene i denne rapporten. Dette gir verdifull kontekst for fremtidige utviklere som skal vedlikeholde koden.

- **Hva er konsekvensene av å ikke være åpen om KI-bruk?**
  Konsekvensene kan være både faglige og sosiale. Faglig sett kan det føre til at man pådrar seg "skjult teknisk gjeld" – kode som ingen på teamet fullt ut forstår, og som derfor blir vanskelig å vedlikeholde eller feilsøke. Sosialt kan det skape en alvorlig tillitsbrist. Hvis en utvikler fremstiller KI-generert kode som sin egen, kan det bli sett på som uærlig og skade vedkommendes omdømme og teamets samarbeidsklima. I en akademisk setting vil det i praksis være plagiat eller juks. Åpenhet er derfor den eneste forsvarlige veien fremover.

### 5.3 Påvirkning på læring og kompetanse
- **Hvordan påvirker KI-avhengighet fremtidig kompetanse?**
  En ukritisk avhengighet av KI kan føre til at fremtidig kompetanse blir mer overflatisk. Man risikerer å bli en "systemintegrator" av KI-genererte kodeblokker, uten en dyp forståelse for prinsippene som ligger bak. Evnen til å løse helt nye problemer fra bunnen av kan bli svekket. Samtidig er vi overbevist om at evnen til å føre en effektiv "dialog" med en KI – å stille presise spørsmål, gi god kontekst og kritisk vurdere svar – er i ferd med å bli en ny, essensiell kjernekompetanse for utviklere.

- **Hvilke ferdigheter risikerer man å ikke utvikle?**
  Den mest utsatte ferdigheten er systematisk feilsøking. Når man kan lime inn en feilmelding og få et løsningsforslag, går man glipp av den iterative prosessen med å sette seg inn i koden, analysere tilstand og logikk, og isolere et problem. Andre utsatte ferdigheter er den grunnleggende algoritmiske tenkningen og "muskelminnet" man bygger ved å skrive standardkode ("boilerplate") manuelt. Repetisjonen man får ved å skrive for-løkker eller sette opp enkle API-kall selv, er viktig for å bygge en intuitiv forståelse.

- **Balanse mellom effektivitet og læring**
  Vi fant ut at balansen mellom effektivitet og læring ligger i *hvordan* og *når* man bruker KI. Den dårlige strategien er å bruke KI som første utvei for å unngå å tenke selv. Den gode strategien er å bruke KI som en "akselerator" når man står fast. Vår tilnærming ble å først prøve selv. Hvis vi ikke fant en løsning innen rimelig tid, brukte vi KI for å få et forslag. Det kritiske steget var imidlertid å bruke tid *etter på* på å analysere forslaget, forstå hvorfor det virket, og lese dokumentasjonen. KI-en ble da et verktøy for å overkomme frustrerende hindringer, slik at vi raskere kunne komme til kjernen av læringen.

### 5.4 Arbeidsmarkedet
- **Hvordan kan utbredt KI-bruk påvirke fremtidige jobber i IT?**
  Vi tror ikke KI vil fjerne behovet for utviklere, men snarere endre selve utviklerrollen. Repetitive og standardiserte oppgaver (f.eks. skriving av "boilerplate"-kode, enkle API-endepunkter, grunnleggende enhetstester) vil i økende grad bli automatisert. Dette hever listen for hva som forventes av en utvikler. Jobben vil handle mindre om å produsere store mengder kode, og mer om å designe, arkitektere og verifisere systemer. Produktiviteten per utvikler vil øke, men det vil også stille høyere krav til systemforståelse og problemløsningsevne.

- **Hvilke roller vil bli viktigere/mindre viktige?**
  - **Viktigere roller:**
    - **Systemarkitekter og seniorutviklere:** Evnen til å se det store bildet, designe skalerbare systemer og ta kritiske teknologivalg blir viktigere enn noensinne. KI er god på avgrensede oppgaver, men (foreløpig) dårlig på helhetlig arkitektur.
    - **Spesialister:** Dybdekompetanse innen felt som cybersikkerhet, ytelsesoptimalisering og databasetuning vil bli enda mer verdifull.
    - **"KI-oversettere" / Produktledere:** Roller som kan oversette komplekse forretningsbehov til presise, tekniske spesifikasjoner som en KI kan bistå med å implementere.
  - **Mindre viktige roller:**
    - **Inngangsposisjoner fokusert på repetitiv koding:** Stillinger som primært består av å implementere enkle, veldefinerte komponenter eller skript, risikerer å bli kraftig redusert.

- **Deres refleksjoner om fremtidig karriere i en KI-drevet verden**
  For vår egen del ser vi på KI som en uunngåelig og integrert del av vår fremtidige karriere. Å motsette seg utviklingen er nytteløst. Vår strategi må være å omfavne verktøyene og bli eksperter på å utnytte dem. Dette betyr at vi må flytte vårt eget fokus fra å "bare" lære å kode, til å lære å bygge systemer og løse problemer på et høyere nivå. Vår verdi i arbeidsmarkedet vil ikke være vår evne til å skrive kode raskt, men vår evne til å tenke kritisk, kommunisere klart og designe gode løsninger – med KI som en kraftig assistent. Kontinuerlig læring er ikke lenger bare en fordel, men en overlevelsesmekanisme.

### 5.5 Datasikkerhet og personvern
- **Hvilke data delte dere med KI-verktøy?**
  Vi var bevisste på denne problemstillingen fra start. Dataene vi delte kan deles i to kategorier: 1) Generelle spørsmål om programmering, algoritmer og arkitektur, og 2) Spesifikke, anonymiserte kodesnutter. Når vi delte kode, sørget vi alltid for å fjerne all sensitiv informasjon. API-nøkler, passord, database-tiloblinger og personlig identifiserbar informasjon ble systematisk fjernet eller erstattet med plassholdere som `"[SECRET_KEY]"` før koden ble sendt til KI-tjenesten. Ingen reelle brukerdata ble noensinne delt.

- **Potensielle risikoer ved å dele kode og data med KI**
  Den største risikoen er utilsiktet lekkasje av sensitiv informasjon. En ubetenksom "copy-paste" av en konfigurasjonsfil eller en kodesnutt kan eksponere API-nøkler, passord eller annen forretningskritisk informasjon. Denne dataen kan i teorien bli lagret av KI-leverandøren og misbrukes. En annen betydelig risiko er tap av intellektuell eiendom (IP). Proprietær forretningslogikk som deles, kan potensielt bli en del av modellens fremtidige treningsdata og dermed bli tilgjengelig for andre, inkludert konkurrenter.

- **Hvordan skal man tenke på sikkerhet når man bruker KI?**
  Vår hovedregel er: **Behandle ethvert input til en offentlig KI-tjeneste som om det ble postet på et åpent internettforum.** Dette innebærer:
  1.  **Datasanering:** Alltid fjerne sensitiv informasjon før man sender en prompt.
  2.  **Klare retningslinjer:** I en bedrift må det være tydelige regler for hva slags informasjon som kan deles, og hvordan den skal anonymiseres.
  3.  **Vurder private alternativer:** For svært sensitiv kode og data, bør bedrifter vurdere å bruke KI-modeller som kan kjøres lokalt eller i en privat sky (on-premise/VPC), slik at dataene aldri forlater bedriftens kontroll.
  4.  **Bruk Enterprise-versjoner:** Mange KI-tjenester tilbyr bedriftsabonnement som garanterer at dataene dine ikke brukes til trening av modellene. Dette bør være et minimumskrav for profesjonell bruk.

---

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold
Integrasjonen av KI-generert kode i prosjektet vårt har betydelige implikasjoner for både kodekvalitet og langsiktig vedlikehold.

- **Hvordan påvirker KI-generert kode langsiktig vedlikehold?**
  KI-generert kode kan potensielt redusere vedlikeholdsbyrden hvis den er velstrukturert og følger beste praksis. I vårt tilfelle hjalp KI oss med å generere modulære komponenter og API-endepunkter som var enkle å utvide og oppdatere. Samtidig krever det en grundig gjennomgang for å sikre at koden er optimalisert for prosjektets spesifikke behov og ikke introduserer unødvendig kompleksitet. Uten slik gjennomgang kan KI-generert kode føre til "technical debt" dersom den er generisk eller ikke tilpasset prosjektets arkitektur.

- **Er KI-kode like forståelig som menneskeskrevet kode?**
  Forståeligheten av KI-generert kode varierer. Noen ganger produserte KI elegant og lettlest kode som fulgte etablert praksis. Andre ganger, spesielt ved mer komplekse forespørsler, kunne koden virke mer "generisk" eller mindre idiomatisk, noe som gjorde den vanskeligere å dechiffrere uten kontekst. Vi oppdaget at når vi ba KI om å forklare den genererte koden, forbedret dette vår egen forståelse og dermed også evnen til å vedlikeholde den.

- **Utfordringer med å debugge KI-generert kode**
  En av hovedutfordringene med KI-generert kode er debugging. Selv om KI kan være god til å identifisere feil, kan den også produsere subtile feil som er vanskeligere å spore. Hvis KI-koden inneholder logiske brister eller forutsetninger som ikke stemmer overens med prosjektets virkelige tilstand, kan det kreve mer tid å forstå og korrigere enn om koden var skrevet fra bunnen av med full kontekst. Dette understreker viktigheten av grundig testing og et kritisk blikk på all KI-generert kode.

### 6.2 Standarder og beste praksis
En sentral del av vår læringsprosess var å vurdere i hvilken grad KI-verktøyene overholdt etablerte standarder og beste praksis i programvareutvikling.

- **Følger KI alltid beste praksis og industristandarder?**
  Nei, ikke alltid. KI-modeller er trent på enorme mengder kode fra internett, som inkluderer både gode og dårlige eksempler. Vi fant at KI generelt var god på å følge moderne standarder for populære teknologier som React og TypeScript, men den kunne feile på mer nyanserte områder. For eksempel kunne den foreslå løsninger som ikke fullt ut fulgte prinsippene for tilgjengelighet (accessibility, a11y) eller som tok snarveier som kompromitterte sikkerheten.

- **Eksempler på hvor KI foreslo utdaterte eller dårlige løsninger:**
  - **Utdaterte biblioteker:** Som nevnt tidligere, foreslo KI i ett tilfelle å bruke et utdatert JavaScript-bibliotek. Dette indikerer at modellens kunnskap kan ha et "cutoff-punkt" og ikke alltid er oppdatert med de nyeste trendene i et raskt utviklende økosystem.
  - **Ignorering av sikkerhetspraksis:** I et tidlig utkast til en API-rute for håndtering av brukerdata, la ikke KI automatisk til tilstrekkelig validering og "sanitizing" av input-data, noe som kunne ha åpnet for sikkerhetshull som f.eks. XSS-angrep.
  - **Ineffektive databasekall:** Da vi jobbet med Prisma, foreslo KI en løsning som ville ha ført til et "N+1"-problem, der ett databasekall resulterte i N påfølgende kall i en løkke. Dette er en klassisk ytelsesfelle som en erfaren utvikler ville unngått.

- **Viktigheten av å validere KI sine forslag:**
  Disse erfaringene understreket en av våre viktigste konklusjoner: En utvikler kan ikke blindt stole på KI. Kunnskap om beste praksis, sikkerhet og ytelse er avgjørende for å kunne vurdere, korrigere og forbedre forslagene fra KI. Utviklerens rolle blir i økende grad å være en "kvalitetssikrer" og "arkitekt" som veileder KI-verktøyet, snarere enn en ren kodeprodusent. Uten denne valideringen risikerer man å introdusere sårbarheter, ytelsesproblemer og teknisk gjeld i prosjektet.

### 6.3 Fremtidig utvikling
Vår erfaring med KI i dette prosjektet gir et innblikk i en fremtid der utviklingsprosessen vil være markant annerledes.

- **Hvordan tror dere KI vil påvirke programvareutvikling fremover?**
  Vi tror KI vil fortsette å demokratisere programvareutvikling ved å senke terskelen for å starte. KI vil sannsynligvis ta over mer av de repetitive og standardiserte kodings oppgavene, frigjøre utviklere til å fokusere på mer komplekse problemer, arkitektur, design og innovasjon. "Low-code/no-code"-plattformer vil bli forsterket av KI, og "AI-first"-utviklingsmetoder, der man starter med å prompt KI fremfor å skrive kode fra bunnen av, vil bli mer utbredt. Det vil også bli en økt etterspørsel etter "AI-prompt engineering" som egen kompetanse.

- **Hvilke ferdigheter blir viktigere for utviklere?**
  Ferdigheter som kritisk tenkning, problemløsning, arkitekturdesign og evnen til å stille de "riktige" spørsmålene til KI (prompt engineering) vil bli enda viktigere. Forståelse for systemdesign, sikkerhet, ytelse, og evnen til å "debugge" ikke bare kode, men også KI-genererte løsninger, vil være sentralt. Mellommenneskelige ferdigheter, som kommunikasjon og samarbeid, vil også være essensielt, da utviklere i større grad vil fungere som fasilitatorer mellom forretningsbehov og KI-genererte løsninger. En dyp forståelse for domenet man utvikler for vil også være avgjørende for å kunne validere og forbedre KI-ens output.

- **Deres anbefalinger for hvordan man bør bruke KI i utviklingsprosesser:**
  1.  **Vær en kritisk partner:** Behandle KI som en samarbeidspartner, ikke en autoritet. Alltid valider KI-generert kode og forslag mot beste praksis, sikkerhetsstandarder og prosjektets spesifikke krav.
  2.  **Fokuser på læring:** Bruk KI som et læringsverktøy. Be den forklare konsepter, alternative løsninger og begrunnelser for sine valg. Dette bygger dypere forståelse over tid.
  3.  **Iterer og raffiner:** Start med enkle prompts og forfin dem gradvis. KI fungerer best i en iterativ prosess der man gir den stadig mer spesifikke instruksjoner basert på tidligere respons.
  4.  **Bruk KI til å frigjøre tid:** La KI håndtere repetitive oppgaver og "boilerplate"-kode. Bruk den frigjorte tiden til å fokusere på kreativ problemløsning, arkitektur og å tilegne deg nye, komplekse ferdigheter.
  5.  **Forstå konteksten:** Jo mer kontekst du gir KI om prosjektet, teknologiene som brukes, og målsetningene, jo bedre og mer relevante forslag vil den kunne gi. Dette inkluderer å mate den med relevant kodebase og dokumentasjon.

---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer
Gjennom prosjektet har vi gjort oss flere viktige erfaringer:
1.  **KI er en kraftig, men krevende assistent.** Vi lærte at KI, som Gemini CLI, kan akselerere utviklingsprosessen dramatisk ved å generere kode, feilsøke og forklare komplekse konsepter. Samtidig er KI ikke feilfri; den kan "hallusinere" eller foreslå utdatert kode. Dette understreket viktigheten av kritisk tenkning og menneskelig validering for all KI-generert kode.
2.  **Verdien av presis kontekst og kommunikasjon.** Både i samarbeid med KI og internt i teamet, oppdaget vi at kvaliteten på resultatet var direkte proporsjonal med kvaliteten på input. Å gi KI-en tilstrekkelig og presis kontekst i promptene var avgjørende for å få nyttige svar, på samme måte som klare spesifikasjoner og god dialog var viktig for effektivt teamarbeid.
3.  **Kontinuerlig læring og etisk refleksjon er essensielt.** Prosjektet demonstrerte at teknologilandskapet endres raskt, og at evnen til raskt å ta i bruk nye verktøy er avgjørende. Samtidig ble det tydelig at innovasjon kommer med etiske ansvar. Vi måtte proaktivt reflektere over spørsmål om ansvar, transparens og datasikkerhet, og utvikle egne retningslinjer for ansvarlig KI-bruk.

### 7.2 Hva ville dere gjort annerledes?
Med erfaringene fra dette prosjektet er det flere ting vi ville angrepet annerledes om vi skulle startet på nytt.

- **Tekniske valg:** Vi er fornøyde med hovedteknologiene (Next.js, Prisma), men vi ville etablert en global state management-løsning (som Context API) mye tidligere i prosessen. I starten førte "prop drilling" til unødvendig kompleksitet som krevde refaktorering. En sentralisert datakilde fra dag én ville gjort koden renere og mer vedlikeholdbar. Vi ville også vært flinkere til å skrive tester parallelt med utviklingen, ikke som en ettertanke.

- **Bruk av KI:** Vår tilnærming til KI modnet betraktelig gjennom prosjektet. Hadde vi startet på nytt, ville vi umiddelbart tatt i bruk de avanserte prompting-teknikkene vi lærte oss. I stedet for generiske spørsmål, ville vi fra starten av matet KI-en med spesifikk kontekst (kodesnutter, filstruktur, databasemodeller) for å få skreddersydde løsninger. Vi ville også vært strengere på å umiddelbart verifisere KI-generert kode mot offisiell dokumentasjon.

- **Samarbeid og organisering:** Selv om vi ønsket en flat og tett samarbeidsstruktur, lærte vi at dette også krever rammer. Vi ville innført en tydelig "Driver/Navigator"-modell og en strengere Git-workflow (feature-branches per kodeøkt) fra prosjektets start. Dette ville minimert antall merge-konflikter og gjort samarbeidet mer effektivt. "Timeboxing" av diskusjoner i møter er også noe vi ville implementert tidligere for å sikre fremdrift.

### 7.3 Anbefalinger
Basert på våre erfaringer har vi følgende anbefalinger til andre studenter som skal bruke KI i utviklingsprosjekter:

- **Råd om effektiv bruk av KI:**
  - **Vær en krevende, men presis, samtalepartner.** Ikke still vage spørsmål. Gi KI-en all relevant kontekst: feilmeldingen, koden der feilen oppstår, og hva du allerede har prøvd.
  - **Bruk KI som en læringsakselerator.** Når du får et svar, ikke bare kopier det. Spør KI-en *hvorfor* løsningen fungerer, hva alternativene er, og hva som er fordelene og ulempene. Bruk den som en utrettelig personlig veileder.

- **Fallgruver å unngå:**
  - **Blind tillit.** Den største faren er å anta at KI-generert kode er korrekt, optimal eller sikker. Verifiser alltid mot offisiell dokumentasjon og test grundig.
  - **Kontekstløs prompting.** Ikke forvent at KI-en kan lese tankene dine. Uten kontekst vil du få generiske svar som er lite nyttige.
  - **Dele sensitiv informasjon.** Aldri lim inn API-nøkler, passord eller personopplysninger i en offentlig KI-tjeneste. Gjør det til en vane å sanitisere all input.

- **Beste praksis dere oppdaget:**
  1.  **"Context is King":** Invester tid i å lage en god prompt. Jo mer relevant kontekst du gir, jo bedre blir resultatet.
  2.  **Bruk KI iterativt:** Start bredt og snevre inn. Still oppfølgingsspørsmål. Be KI-en refaktorere eller forklare sin egen kode. Bruk den som en sparringspartner.
  3.  **Mennesket i sentrum:** Bruk KI som et verktøy for å forsterke din egen intelligens, ikke for å erstatte den. Det endelige ansvaret for koden og løsningen ligger alltid hos deg. Forstå, ikke bare kopier.

### 7.4 Personlig refleksjon (individuelt)

**115:**
I denne perioden har jeg jobbet med programmering av en webbasert applikasjon ved hjelp av Gemini CLI og Visual Studio Code. Arbeidet har gitt meg et første, men samtidig grundig møte med programmering og utvikling av applikasjoner. Selv om jeg startet med lite forkunnskaper innen koding, har prosessen gitt meg betydelig bedre forståelse og innsikt i hvordan programmering fungerer i praksis.
En av de største utfordringene har vært nettopp mangelen på tidligere erfaring. Å møte et fagfelt som er helt nytt, krevde tålmodighet og vilje til å lære. For å håndtere dette har jeg jobbet systematisk med å prøve og feile, lese meg opp på relevante konsepter og utforske løsninger gjennom praktisk arbeid. Jeg har vært bevisst på å bruke tiden til å tilegne meg så mye kunnskap som mulig, selv om læringskurven til tider har vært bratt.
Det jeg er mest fornøyd med, er innsatsen jeg har lagt ned og evnen til å stå i utfordringene. Jeg har jobbet målrettet for å få applikasjonen til å fungere så optimalt som mulig, til tross for begrenset erfaring. Det har vært motiverende å oppleve mestring underveis og se konkrete resultater av arbeidet mitt.
Fremover kunne det vært spennende å videreutvikle applikasjonen enda mer. Jeg ønsker å bygge videre på ferdighetene jeg har opparbeidet, fortsette å lære, og utforske hvordan applikasjonen kan forbedres og utvides.

**131:**
Gjennom arbeidet med Things+ har jeg lært mye, selv om jeg startet med begrensede datakunnskaper og ingen tidligere erfaring med programmering. Prosjektet har gitt meg et tydelig bilde av hvordan en app utvikles i praksis – fra idé og planlegging til implementering.
Jeg har spesielt fått bedre forståelse for hvordan vi samarbeider i en felles kodebase, og hvordan verktøy som VS Code og GitHub brukes for å jobbe strukturert og unngå konflikter. I tillegg har jeg sett hvor viktig det er med tydelige krav, oppdeling i mindre oppgaver og en ryddig arbeidsflyt i team.
Jeg har også utviklet meg i måten jeg bruker KI på. Jeg har lært å bruke KI til å forklare konsepter, foreslå løsninger og hjelpe med feilsøking, men også at svarene må vurderes kritisk og sjekkes mot dokumentasjon og praksis. Samlet sett har prosessen gjort meg tryggere på både arbeidsmetoden og grunnprinsippene bak utvikling, og jeg har fått et mye bedre fundament å bygge videre på.

**138:**
[Personlig refleksjon over egen læring og utvikling]

**[Navn 4]:**
[Personlig refleksjon over egen læring og utvikling]

---

## 8. Vedlegg (valgfritt)

- Skjermbilder av applikasjonen:
  C:\Users\ksand\OneDrive\Documents\GitHub-Sync\SG-Gruppe-11\screenshot\Things+ logo_frontpage.png
  ![alt text](<Things+ logo_frontpage.png>)
- Lenke til GitHub repository: [Sett inn lenke her, f.eks. https://github.com/dittbrukernavn/dittrepo]
- Annen relevant dokumentasjon (f.eks. video av demonstrasjon, prototype, etc.)

---

**Ordantall:** Ca. 6122 ord

**Forventet lengde:** 3000-5000 ord (avhengig av gruppestørrelse og prosjektets kompleksitet)
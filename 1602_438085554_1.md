# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon

**Gruppenavn:** Things+

**Gruppemedlemmer:**
- [Navn 1] - 115
- [Navn 2] - 131
- [Navn 3] - 138
- [Navn 4] - 28

**Dato:** 05.12.2025

---

## 2. Utviklingsprosessen

### 2.1 Oversikt over prosjektet
Vi har utviklet en to-do task manager app kalt "Things+". Hovedmålet med applikasjonen er å hjelpe studenter, spesielt de som kombinerer studier med fulltidsjobb, med å strømlinjeforme og samle alle oppgaver på ett sted.

**Bakgrunn:** Studenter ved bachelorprogrammet i logistikk ved Høgskolen i Molde, som ofte kombinerer studier med fulltidsjobb, sliter med å integrere daglige oppgaver med skolekrav. Mange har utfordringer med å holde oversikt over frister og oppgaver på tvers av ulike plattformer.

**Formål:** Appen henter data fra primært Canvas for å strømlinjeforme frister og andre oppgaver med brukerens foretrukne kalender. Den vil foreslå en tidslinje og tildele tidsluker i kalenderen basert på data fra Canvas og brukerens egne kalenderinnspill. I stedet for å måtte sjekke flere apper/nettsteder, vil Things+ strømlinjeforme og samle alle oppgaver på ett sted.

**Målgruppe:** Studenter med fulltidsjobb i tillegg til studiene, men også alle som bruker Canvas og en integrert kalender på telefonen eller laptopen for planleggingsformål.

### 2.2 Arbeidsmetodikk
Istedet for å fordele oppgavene så jobbet vi sammen med hyppige teams møter og diskusjoner på hvordan vi ville at denne applikasjonen skulle fungere. Vi føler at denne måten å jobbe på har fungert veldig fint slik at vi alle får en felles forståelse om hvordan programering fungerer. Vi har aktivt brukt KI-verktøy som Gemini CLI integrert i VS Code for å assistere med kodeforståelse, feilsøking, generering av kodeeksempler, og utforming av dokumentasjon. KI har fungert som en interaktiv partner for å akselerere utviklingsprosessen og forbedre kodekvaliteten.

### 2.3 Teknologi og verktøy
- Frontend: Next.js, React, TypeScript, Tailwind CSS, HTML/CSS
- Backend: Next.js API Routes
- Database: Prisma (ORM), PostgreSQL
- KI-verktøy: Gemini CLI, Google Gemini (Gemini 2.0 Flash), OpenRouter
- Andre verktøy: VS Code, BMAD, Git

### 2.4 Utviklingsfaser

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

**Utfordring 1: Sikker API-integrasjon med Canvas**
- **Problem:** Den største tekniske bøygen var å koble applikasjonen til Canvas sitt API på en sikker og robust måte. Vi var usikre på den korrekte implementeringen av OAuth 2.0-autentiseringsflyten, hvordan vi skulle lagre API-tokens på en sikker måte etter at brukeren hadde logget inn, og hvordan vi skulle håndtere paginerte svar fra API-et for å sikre at vi hentet alle oppgavene til brukeren.
- **Løsning:** Løsningen ble å bygge et eget API-endepunkt i Next.js (`/pages/api/canvas/`) som fungerte som en mellomvare (backend-for-frontend). Dette endepunktet håndterte all kommunikasjon med Canvas-API-et. Brukerens `access_token` ble kryptert ved hjelp av `crypto.ts` og lagret i en `httpOnly`-cookie, noe som forhindret tilgang via JavaScript i nettleseren. Vi implementerte også en løkke som fulgte `Link`-headeren i API-svarene for å hente alle sider med data.
- **KI sin rolle:** KI var avgjørende for å løse dette. Vi brukte Gemini CLI til å få en detaljert, steg-for-steg guide for å implementere OAuth 2.0 i Next.js. KI ga oss kodeskjeletter for API-ruten, foreslo `httpOnly`-cookies som en sikker lagringsmetode, og genererte en funksjon for å håndtere paginering basert på en beskrivelse av Canvas sitt API.

**Utfordring 2: Global State Management for asynkrone data**
- **Problem:** Applikasjonen henter data fra flere kilder (Canvas, brukerens kalender) asynkront. I starten sendte vi data nedover komponenttreet via props ("prop drilling"), noe som raskt ble uoversiktlig og førte til synkroniseringsfeil. For eksempel kunne kalenderen og oppgavelisten vise ulik status fordi de ikke delte samme datakilde.
- **Løsning:** Vi innså at vi trengte en global tilstandshåndtering (state management). Etter å ha vurdert ulike biblioteker, valgte vi å bruke Reacts innebygde `Context API` sammen med `useReducer`-hooken. Vi opprettet en `AppContext` som holdt en global tilstand for oppgaver, kalenderhendelser, og brukerinformasjon. Dette ga oss en "single source of truth" som alle komponenter kunne lese fra og oppdatere via dispatch-funksjoner.
- **KI sin rolle:** Vi konsulterte KI for å få en oversikt over fordeler og ulemper med ulike state management-løsninger (Redux, Zustand, Context API). Da vi valgte Context API, ba vi KI om et komplett eksempel på hvordan man setter opp en `Provider` med en `reducer` for å håndtere asynkrone handlinger som `FETCH_START`, `FETCH_SUCCESS` og `FETCH_ERROR`. Dette ga oss en solid mal vi kunne bygge videre på.

### 3.2 Samarbeidsutfordringer

- **Utfordring 1: Håndtering av felles kodebase i sanntid.**
  Siden vi jobbet mye sammen på den samme koden, oppstod det hyppige `merge`-konflikter i Git. Det var tidkrevende å sikre at alle hadde identiske versjoner av prosjektet lokalt før vi startet en felles kodeøkt.

- **Løsning:** Vi innførte en mer strukturert Git-arbeidsflyt. Vi bestemte oss for å bruke en "Driver/Navigator"-modell under fellesøktene, der kun én person ("Driver") skrev kode og delte skjermen sin. All koding ble gjort på en dedikert `feature`-branch for den aktuelle økten. Etter økten ble branchen pushet, og vi gjennomgikk endringene i en Pull Request sammen. 

- **Utfordring 2: Ustrukturerte og lange diskusjoner.**
  Våre hyppige Teams-møter var essensielle for felles forståelse, men de kunne noen ganger bli uproduktive. Diskusjoner om tekniske valg eller design kunne dra ut i tid uten at vi landet på en konkret beslutning.

- **Løsning:** Vi implementerte en fastere møtestruktur. Hver økt startet med en klar agenda og et definert mål. 

### 3.3 KI-spesifikke utfordringer
Bruken av KI var utfordrende. Vi måtte lære oss å jobbe *med* KI-en, ikke bare be den om å gjøre ting.

- **Utfordring 1: "Hallusinasjoner" og utdatert kode.**
  Et gjennomgående problem var at KI-en kunne generere kode som så overbevisende ut, men som var feil eller utdatert. For eksempel foreslo den i ett tilfelle å bruke en funksjon fra en eldre versjon av Next.js, noe som førte til feilmeldinger som var vanskelige å diagnostisere. Vi kastet bort tid på feilsøking av kode som aldri kunne ha fungert, et klassisk eksempel på en KI-"hallusinasjon".

- **Håndtering:** Vi utviklet en sunn skepsis til KI-generert kode. Vi innførte en regel om at all kode fra KI-en skulle behandles som et utkast, ikke en ferdig løsning. Dette krevde mer disiplin, men sparte oss for mye feilsøking senere.

- **Utfordring 2: Mangel på prosjektspesifikk kontekst.**
  KI-en har ingen iboende kunnskap om vår prosjektstruktur, arkitektur eller kodestil. Når vi ba om hjelp til å utvide en funksjon, var forslagene ofte generiske og passet ikke inn med vår etablerte `AppContext` eller navnekonvensjoner. Den kunne for eksempel foreslå en helt ny state management-løsning i en komponent, i stedet for å bruke den globale contexten vi allerede hadde.

- **Håndtering:** Løsningen ble å bli mye flinkere til å gi KI-en kontekst i promptene våre. I stedet for å spørre "Hvordan sletter jeg en oppgave?", lærte vi oss å spørre: "Gitt følgende `AppContext`-provider og `taskReducer`, skriv en `DELETE_TASK` case for reduceren som fjerner en oppgave basert på ID fra `state.tasks`-arrayet". Ved å inkludere relevante kodebiter i prompten, fikk vi forslag som var skreddersydd for vårt prosjekt og mye mer nyttige.

---

## 4. Kritisk vurdering av KI sin påvirkning

### 4.1 Fordeler med KI-assistanse

**Effektivitet og produktivitet:**
- **Hvordan påvirket KI arbeidshastigheten?**
  KI økte arbeidshastigheten vår dramatisk. I stedet for å bruke timer på å søke i dokumentasjon eller forum for å løse komplekse problemer som OAuth 2.0-integrasjon, kunne vi få en strukturert, steg-for-steg guide på minutter. 
- **Eksempler på oppgaver som gikk raskere:**
  - **Generering av "boilerplate"-kode:** Oppretting av nye React-komponenter, API-ruter i Next.js, eller konfigurasjonsfiler ble akselerert ved at KI genererte komplette kodeskjeletter. Vår `login.tsx`-komponent ble for eksempel skissert ut på et par minutter, inkludert state-håndtering og grunnleggende styling.
  - **Feilsøking:** Når vi møtte kryptiske feilmeldinger, kunne vi lime inn feilen og den relevante koden i KI-verktøyet og få en umiddelbar forklaring og forslag til løsning.
  - **Dokumentasjon:** KI hjalp oss med å formulere klare og konsise beskrivelser for funksjoner, komponenter og i `README`-filer, en oppgave som ofte er tidkrevende.

**Læring og forståelse:**
- **Hva lærte dere ved å bruke KI?**
  Vi lærte ikke bare *hvordan* vi skulle implementere en løsning, men også *hvorfor* den fungerte. KI fungerte som en tålmodig mentor som kunne forklare komplekse konsepter på en enkel måte. 
- **Bidro KI til bedre forståelse av konsepter?**
  Absolutt. For eksempel var sikkerhetsaspektene ved API-integrasjon - KI forklarte risikoene og begrunnet hvorfor den foreslåtte løsningen var sikrere, noe som hevet vår generelle kompetanse innen web-sikkerhet.

**Kvalitet på koden:**
- **Hvordan påvirket KI kodekvaliteten?**
  KI fungerte som en konstant kodegjennomgangspartner. Den hjalp oss med å identifisere "code smells" og oppmuntret oss til å refaktorere.
- **Eksempler på forbedringer KI foreslo:**
  - **Refaktorering for gjenbruk:** I starten hadde vi duplisert logikk for datakall i flere komponenter. KI foreslo å refaktorere dette til en gjenbrukbar "custom hook".
  - **Optimalisering:** KI foreslo å bruke `React.memo` for å forhindre unødvendige re-rendringer av komponenter.
  - **Samsvar med standarder:** Verktøyet hjalp oss med å skrive bedre TypeScript-kode ved å påpeke bedre måter å definere typer og interfaces på, noe som gjorde koden mer robust og forutsigbar.

### 4.2 Begrensninger og ulemper

**Kvalitet og pålitelighet:**
- **Eksempler på feil eller dårlige løsninger fra KI:**
  - **Utdaterte avhengigheter:** I ett tilfelle foreslo KI å bruke et bibliotek for datovisning som var utdatert og ikke lenger aktivt vedlikeholdt. En rask sjekk på npm avslørte dette, og vi valgte et mer moderne alternativ.
  - **Overkompliserte løsninger:** Da vi ba om en funksjon for å sortere oppgaver, genererte KI en for kompleks algoritme. En standard `Array.sort()` med en sammenligningsfunksjon var mer egnet.
- **Hvordan oppdaget og håndterte dere disse?**
  Vi oppdaget feilene ved å alltid behandle KI-generert kode som et forslag, ikke en fasit. All kode ble kritisk gjennomgått og testet. 

**Avhengighet og forståelse:**
- **Ble dere for avhengige av KI?**
  I starten var det en tendens til å "spørre KI først" før vi tenkte selv. Vi merket at dette kunne føre til en overfladisk forståelse av koden vi implementerte.
- **Var det tilfeller hvor KI hindret læring?**
  Ja, spesielt med konfigurasjonsfiler (f.eks. `tailwind.config.js` eller `tsconfig.json`). Det var fristende å bare akseptere den ferdige konfigurasjonen KI ga oss uten å fullt ut forstå hva hver enkelt innstilling gjorde.

**Kreativitet og problemløsning:**
- **Påvirket KI deres egen kreativitet?**
  KI er trent på eksisterende mønstre, og løsningene den foreslår er ofte konvensjonelle. Da vi designet brukergrensesnittet for ukeplanleggeren (`weekly-planner.tsx`), ga KI oss et veldig standard rutenett-layout.
- **Eksempler på situasjoner hvor KI begrenset kreativ tenkning:**
  For å bryte ut av dette, brukte vi KI som en "idé-generator" i stedet for en "løsnings-generator". Vi ba om fem radikalt forskjellige måter å visualisere en ukeplan på. Dette ga oss et bredere spekter av ideer, og snudde begrensningen til en fordel.

### 4.3 Sammenligning: Med og uten KI

- **Hva ville vært annerledes?** 
  Uten KI ville utviklingsprosessen vært betydelig lengre og mer utfordrende. Komplekse integrasjoner, som OAuth 2.0 mot Canvas API, ville krevd omfattende manuelt research og "trial-and-error"-programmering. Tiden brukt på feilsøking ville vært mangedoblet.

- **Hvilke deler av prosjektet ville vært vanskeligere/lettere?**
  - **Vanskeligere:** Alt av ny teknologi og komplekse algoritmer, som sikker autentisering, state management-mønstre, og optimering av datakall. Dokumentasjon og testing ville også vært mer tidkrevende og potensielt mindre grundig.
  - **Lettere:** Kanskje ville den initielle idéfasen og kreative designprosessen, spesielt for UI/UX, hatt mer rom for ren menneskelig kreativitet uten at KI presenterte "standardløsninger" for tidlig. Vi kunne også sluppet å krangle med gemini.
- **Ville sluttresultatet vært bedre eller dårligere?**
  Sluttresultatet ville mest sannsynlig vært dårligere, eller ikke-eksisterende.

### 4.4 Samlet vurdering

- **Var KI en netto positiv eller negativ faktor?**
  KI var en utvetydig positiv faktor for prosjektet. Fordelene i form av økt produktivitet, læring og forbedret kodekvalitet veide langt tyngre enn ulempene.

- **Hva var den viktigste lærdommen om å bruke KI i utviklingsprosessen?**
  Den viktigste lærdommen er at KI er et verktøy, ikke en erstatning for en utvikler. Den er best når den brukes interaktivt, ikke som en "black box" som leverer ferdige løsninger. For å maksimere verdien av KI må man stille de riktige spørsmålene og kritisk vurdere svarene.

---

## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap
- **Hvem er ansvarlig for koden når KI har bidratt?**
  Vår konklusjon er at ansvaret for koden utelukkende ligger hos utvikleren. Hvis koden er feil, en sikkerhetssårbarhet eller har ytelsesproblemer, er det vi som utviklere som må stå til ansvar for dette. 

- **Hvordan sikrer man kvalitet når KI genererer kode?**
  Kvalitetssikringen må være like streng som for menneskeskrevet kode. Vi kvalitetssikret det vi fikk presentert, og testet resultatene.

- **Diskuter spørsmål om opphavsrett og intellektuell eiendom**
  Det er en risiko for at KI-generert kode kan inneholde elementer fra lisensiert kode (f.eks. GPL). For vårt prosjekt var dette en mindre risiko. Inntil videre anser vi denne koden som vårt produkt, men vi er åpne om at KI-verktøy har blitt brukt i prosessen.

### 5.2 Transparens
- **Bør det være transparent at KI er brukt?**
  Ja, vi mener åpenhet om KI-bruk er essensielt både i undervisning og industri. I en læringskontekst er det viktig for rettferdig vurdering av kompetanse. Profesjonelt er det viktig å være åpen med kollegaer og klienter. Åpenhet gir sikkerhet på sikt. 

- **Hvordan dokumenterer man KI sin bidrag?**
  Vi bruker denne rapporten for å dokumentere KIs bidrag. I stlrre prosjekter kunne man hatt merker ved kode som var helt eller delvis KI-generert. Man kan også lagre alle prompter et sted. 

- **Hva er konsekvensene av å ikke være åpen om KI-bruk?**
  Man kan ende opp med kode man selv ikke forstår, og som blir vanskelig å vedlikeholde. Å fremstille KI-generert kode som sin egen kan føre til tillitsbrist og skade forfatterens omdømme. I en akademisk setting kan det bli sett som plagiat eller juks.

### 5.3 Påvirkning på læring og kompetanse
- **Hvordan påvirker KI-avhengighet fremtidig kompetanse?**
  I fremtiden kan vi miste evnen til å gjøre ting frae bunnen av, og man kan få en mer overfladig form for programmering. Smtidig er evnen til å kommunisere godt med KI noe som kommer til å bli viktigere og viktigere for programmerere. 

- **Hvilke ferdigheter risikerer man å ikke utvikle?**
  Feilssøking er kjedelig å sitte med selv, når man kan be KI fikse det på en brøkdel av tiden man ville brukt selv. Drillingen ved basiskoding forsvinner også, og man får det kanskje ikke like mye 'i fingrene' som man ville gjort uten KI.

- **Balanse mellom effektivitet og læring**
  Man bør tenke litt selv før man begynner å bruke KI, og så bruke KI når man står fast. I vårt prosjekt har vi først tenkt ut hva vil ha, og så spurt KI, for å ikke ende opp med å produsere noe blindt på KIens premisser. Det er viktig å følge med på hva KIen gjør for å lære av den. 

### 5.4 Arbeidsmarkedet
- **Hvordan kan utbredt KI-bruk påvirke fremtidige jobber i IT?**
  Behovet for utviklere vil ikke bli mindre, men endret. Mange oppgaver som eksisterer i dag vil bli automatisert. En utvikler i fremtiden vil være mer produktiv enn i dag. 

- **Hvilke roller vil bli viktigere/mindre viktige?**
  - **Viktigere roller:**
    - **Systemarkitekter og seniorutviklere:** Evnen til å se det store bildet, designe skalerbare systemer og ta kritiske teknologivalg blir viktigere enn noensinne. 
    - **Spesialister:** Dybdekompetanse innen felt som cybersikkerhet, ytelsesoptimalisering og databasetuning vil bli enda mer verdifull.
    - **"KI-oversettere" / Produktledere:** Roller som kan oversette komplekse forretningsbehov til presise, tekniske spesifikasjoner som en KI kan bistå med å implementere.
  - **Mindre viktige roller:**
    - **Inngangsposisjoner fokusert på repetitiv koding:** Stillinger som primært består av å implementere enkle, veldefinerte komponenter eller skript, risikerer å bli kraftig redusert.

- **Deres refleksjoner om fremtidig karriere i en KI-drevet verden**
  For vår egen del ser vi på KI helt uunngåelig om man skal ha en karriere i IT. Vår verdi i arbeidsmarkedet vil ikke være vår evne til å skrive kode raskt, men vår evne til å tenke kritisk, kommunisere klart og designe gode løsninger.

### 5.5 Datasikkerhet og personvern
- **Hvilke data delte dere med KI-verktøy?**
 Vi delte ikke personlig informasjon, men utover det var vi ikke veldig bevisste på dette, da vi ikke limte inn kode til KIen noen gang. 

- **Potensielle risikoer ved å dele kode og data med KI**
 En rask "copy-paste" kan eksponere API-nøkler, passord osv. Denne dataen kan i teorien bli lagret av KI-leverandøren og misbrukes. Ikke bare risikerer man å miste sensitiv informasjon, men også åndsverksrettigheter er vanskelig å beskytte. En KI kan bruke det du gir den til å trenes opp, og senere bruke dine produkter i egen kode

- **Hvordan skal man tenke på sikkerhet når man bruker KI?**
  Vår hovedregel er: Behandle ethvert input til en offentlig KI-tjeneste som om det ble postet på et åpent internettforum.

---

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold

- **Hvordan påvirker KI-generert kode langsiktig vedlikehold?**
  Om koden er godt strukturert kan det lette vedlikehold. Unødvendig kompleksitet kan ha motsatt virkning.

- **Er KI-kode like forståelig som menneskeskrevet kode?**
  Forståeligheten av KI-generert kode varierer. Stort sett hjalp det å spørre KIen om å forklare hva den hadde gjort. Det er lurt å holde KIen i nakkeskinnet, spesielt ved komplekse forsepørsler. 

- **Utfordringer med å debugge KI-generert kode**
  Det er såklart vanskeligere å fjerne bugs fra en generert kode enn fra en hjemmelaget kode. Spesielt når det kommer til funksjonalitet, kan KIen slite med å forstå selv hva som er feil. 

### 6.2 Standarder og beste praksis

- **Følger KI alltid beste praksis og industristandarder?**
  Nei, ikke alltid. KI-modeller er trent på enorme mengder kode fra internett, som inkluderer både gode og dårlige eksempler. 
- **Eksempler på hvor KI foreslo utdaterte eller dårlige løsninger:**
  - **Utdaterte biblioteker:** Gemini ville ved ett tilfelle bruke et utdatert JavaScript-bibliotek. KIen er ikke alltid oppdatert.
  - **Ignorering av sikkerhetspraksis:** I et tidlig utkast til en API-rute for håndtering av brukerdata, la ikke KI automatisk til tilstrekkelig validering og "sanitizing" av input-data, noe som kunne ha åpnet for sikkerhetshull.

- **Viktigheten av å validere KI sine forslag:**
En utvikler kan ikke blindt stole på KI. Utviklerens rolle blir i økende grad å være en kvalitetssikrer som veileder KI-verktøyet. Uten denne valideringen risikerer man å få feil, sikkerhetshull og problemer med vedlikehold.

### 6.3 Fremtidig utvikling

- **Hvordan tror dere KI vil påvirke programvareutvikling fremover?**
 KI vil fortsette å gjøre det enklere å bli kjent med programmering. KI vil samtidig ta over det som før var inngangsjobbene til nye uttviklere - automatisbare, repetitive oppgaver. Utviklere vil få krav til prompt engineering-kompetanse.

- **Hvilke ferdigheter blir viktigere for utviklere?**
 Kritisk tenkning, problemløsning, arkitekturdesign og prompt engineering. God forståelse for grunnleggende programmering vil fortsatt være til god hjelp. Sosiale evner vil kanskje bli viktigere, da utvikleren vil bli et slags mellomledd mellom den som ønsker et produkt og KIen - utvikleren må da være i stand til å forstå godt hva 'sjefen' ønsker seeg. Dette er jo allerede tilfelle, men det vil nok bli mer synlig når mye av tiden til de store repetitive oppgavene lir frigjort. 

- **Deres anbefalinger for hvordan man bør bruke KI i utviklingsprosesser:**
  1.  **Vær en kritisk partner:** Behandle KI som en samarbeidspartner, ikke en autoritet. 
  2.  **Fokuser på læring:** Bruk KI som et læringsverktøy. 
  3.  **Iterer og raffiner:** Start med enkle prompts og forfin dem gradvis. 
  4.  **Bruk KI til å frigjøre tid:** La KI håndtere repetitive oppgaver og "boilerplate"-kode. 
  5.  **Forstå konteksten:** Jo mer kontekst du gir KI om prosjektet, teknologiene som brukes, og målsetningene, jo bedre og mer relevante forslag vil den kunne gi. 

---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer

1.  **KI er en kraftig, men krevende assistent.** Vi lærte at KI, som Gemini CLI, kan være uvurdelig når det kommer til å generere kode, feilsøke og forklare komplekse konsepter. Samtidig kan den "hallusinere" og være utdatert. Man må være kritisk.
2.  **Verdien av presis kontekst og kommunikasjon.** Som i virkligheten er kvaliteten på svaret direkte relatert til kvaliteten på spørsmålet. Både mellom oss i gruppa og til KI-en, var det viktig å stille konkrete spørsmål og gi riktig kontekst.
3.  **Kontinuerlig læring og etisk refleksjon er essensielt.** Vi så hvor fort ting kan endre seg, og spesielt sikkerhet er et hensyn som må vurderes kontinuerlig. 

### 7.2 Hva ville dere gjort annerledes?

- **Tekniske valg:** Vi er fornøyde med hovedteknologiene, men vi ville etablert en global state management-løsning (som Context API) mye tidligere i prosessen. I starten førte "prop drilling" til unødvendig kompleksitet som krevde refaktorering. En sentralisert datakilde fra dag én ville gjort koden renere og mer vedlikeholdbar. 

- **Bruk av KI:** Hadde vi startet på nytt, ville vi umiddelbart vært bedre til å stille riktige spørsmål til KI. I stedet for generiske spørsmål, ville vi fra starten av matet KI-en med spesifikk kontekst for å få skreddersydde løsninger. 

- **Samarbeid og organisering:** Selv om vi ønsket en flat og tett samarbeidsstruktur, lærte vi at dette også krever rammer. Vi ville innført en tydelig "Driver/Navigator"-modell og en strengere Git-workflow (feature-branches per kodeøkt) fra prosjektets start. Dette ville minimert antall merge-konflikter og gjort samarbeidet mer effektivt. 

### 7.3 Anbefalinger

- **Råd om effektiv bruk av KI:**
  - **Vær en krevende, men presis, samtalepartner.** Ikke still vage spørsmål. Gi KI-en all relevant kontekst: feilmeldingen, koden der feilen oppstår, og hva du allerede har prøvd.
  - **Bruk KI som en læringsakselerator.** Spør KIen om det du lurer på, vær nysgjerrig!

- **Fallgruver å unngå:**
  - **Blind tillit.** Den største faren er å anta at KI-generert kode er korrekt, optimal eller sikker. Verifiser mot andre kilder.
  - **Kontekstløs prompting.** Ikke forvent at KI-en kan lese tankene dine. Uten kontekst vil du få generiske svar som er lite nyttige.
  - **Dele sensitiv informasjon.** Aldri lim inn API-nøkler, passord eller personopplysninger i en offentlig KI-tjeneste.

- **Beste praksis dere oppdaget:**
  1.  **"Context is King":** Invester tid i å lage en god prompt. Jo mer relevant kontekst du gir, jo bedre blir resultatet.
  2.  **Bruk KI iterativt:** Start bredt og snevre inn. Still oppfølgingsspørsmål. Be KI-en refaktorere eller forklare sin egen kode. Snakk med den.
  3.  **Mennesket i sentrum:** Bruk KI som et verktøy for å forsterke din egen intelligens, ikke for å erstatte den. Forstå!

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

**138**: Jeg må innrømme at jeg ennå ikke er helt komfortabel med å programmere meg KI. Hovedsakelig tror jeg dette skyldes et dårlig programmeringsteknisk grunnlag. Gjennom prosjektet har jeg blitt mer komfortabel med å bruke verktøyene GitHub, VS Code, Gemini og Terminal. Problemet tror jeg består i at jeg ikke har kompetansen til å forstå alt som gjøres eller etterprøve det. Samtidig har jeg gjennom faget forstått betraktelig mer enn jeg gjorde før, og jeg ville nok blitt komfortabel om jeg hadde et halvt år til å bruke til å sette meg inn i dette. Det største læringsmomentet dette halvåret har vært å forstå hvor kraftig KI er som verktøy i programmering, og hvor effektivt man kan arbeide om man forstår programmering godt fra før. Jeg har lært mye om hvordan KI fungerer, og hva man må tenke på når man snakker med den - såkalt prompt engineering. Det verktøyet kommer jeg nok til å bruke ganske mye. Selv kunne jeg nok aldri arbeidet med programmering, men jeg er glad for erfaringen.

**28:**
Jeg må innrømme at jeg var ganske negativ til faget i starten. Jeg tenkte at det var unødvendig komplisert og for teknisk. Hvordan skal dette faget hjelpe meg å bli en bedre logistiker?
Gruppa vår har samarbeidet i fler fag underveis i studiet, dette har vært en styrke når det kom til gruppearbeidet med programmeringen, som i utgangpunktet ingen av oss har noe nevneverdig erfaring med. Det var mye å sette seg inn i før vi faktisk kunne starte med selve oppgaven, og det var utfordrende å se sammenhengen mellom teorigrunnlaget (som manglet) og forelesningene. Det var mye frustrasjon rundt mangel på strømlinjeformet leksjonsoppsett, forelesninger som hopper frem og tilbake i prosessen og diverse avsporinger som vi anså som ikke relevante for produktet («Beer game»).
Første læringspunkt for meg var at policyer i Windows PowerShell sperret meg fra å gjøre en del av installasjonene i starten. Her hadde jeg løpende dialog med ChatGPT, og det var fascinerende og se hvor godt kodespråk fra PowerShell ble tolket av AI
Det løsnet først når alle gruppemedlemmene hadde fått installert nødvendige programvarer og ikke minst BMAD oppsettet i VSCode, «Ah, struktur!» Endelig. Her er det en prosess det går an å følge. Stegvist oppsett med fremdriftssporing underveis. Jeg likte at vi kunne bruke project-plan.md og workflow-status.md til å følge med på egen progresjon. 
Neste læringspunkt: KI gjør jobben, vi er prosjektledere. Vi blir stadig utfordret med oppdukkende problemer i kodeeditoren, her jobbet vi sammen om å løse problemene og brukte andre KI-applikasjoner til å hjelpe oss å prompte rette kommandoer til Gemini.
Siste læringspunktet jeg vil trekke frem er fagets relevans. Som nevnt innledningsvis var jeg ganske negativ i starten, men når vi kom skikkelig i gang med oppgaven skjønte jeg at man trenger ikke å være programmerer for å kunne bruke KI til programmering, og det å ha kjennskap til hvordan utviklingsmiljøer fungerer er relevant, ikke bare i samfunnet generelt, men spesielt innen å forstå hvilken påvirkningskraft disse verktøyene har på alle industrier. Det gir meg kontekst som logistiker i møte med et økt fokus på integrasjon mellom manuelle prosesser og tekniske løsninger.
Progresjonen i faget gjør at det ikke blir noe tid til videreutvikling av applikasjonen, som ville vært motiverende, men vi har lært oss det mest grunnleggende, og har verktøyene til å utvikle programvaren dersom vi ønsker.
Avslutningsvis er jeg glad for at vi har hatt et stort fag å forholde oss til fremfor mange små. Det gjør at det er lettere å fokusere, og komme i modus med skolearbeid. Faget er omfattende når man ikke har noe erfaring med programmering, men så fort man er over terskelen med installasjon av programvarer vil jeg si at det er relativt overkommelig for de fleste. 

---

## 8. Vedlegg (valgfritt)

- Skjermbilder av applikasjonen:
  C:\Users\ksand\OneDrive\Documents\GitHub-Sync\SG-Gruppe-11\screenshot\Things+ logo_frontpage.png
  ![alt text](<Things+ logo_frontpage.png>)
- Lenke til GitHub repository: [Sett inn lenke her, f.eks. https://github.com/dittbrukernavn/dittrepo]
- Annen relevant dokumentasjon (f.eks. video av demonstrasjon, prototype, etc.)

---

**Ordantall:** Ca. 5000 ord

**Forventet lengde:** 3000-5000 ord (avhengig av gruppestørrelse og prosjektets kompleksitet)
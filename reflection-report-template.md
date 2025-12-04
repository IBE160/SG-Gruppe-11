# Refleksjonsrapport - Programmering med KI

## 1. Gruppeinformasjon

**Gruppenavn:** Things+

**Gruppemedlemmer:**
- [Navn 1] - 115
- [Navn 2] - 131
- [Navn 3] - 138

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
[Reflekter over de positive aspektene]

**Effektivitet og produktivitet:**
- [Hvordan påvirket KI arbeidshastigheten?]
- [Eksempler på oppgaver som gikk raskere]

**Læring og forståelse:**
- [Hva lærte dere ved å bruke KI?]
- [Bidro KI til bedre forståelse av konsepter?]

**Kvalitet på koden:**
- [Hvordan påvirket KI kodekvaliteten?]
- [Eksempler på forbedringer KI foreslo]

### 4.2 Begrensninger og ulemper
[Reflekter over de negative aspektene]

**Kvalitet og pålitelighet:**
- [Eksempler på feil eller dårlige løsninger fra KI]
- [Hvordan oppdaget og håndterte dere disse?]

**Avhengighet og forståelse:**
- [Ble dere for avhengige av KI?]
- [Var det tilfeller hvor KI hindret læring?]

**Kreativitet og problemløsning:**
- [Påvirket KI deres egen kreativitet?]
- [Eksempler på situasjoner hvor KI begrenset kreativ tenkning]

### 4.3 Sammenligning: Med og uten KI
[Reflekter over hvordan prosjektet ville vært uten KI]
- Hva ville vært annerledes?
- Hvilke deler av prosjektet ville vært vanskeligere/lettere?
- Ville sluttresultatet vært bedre eller dårligere?

### 4.4 Samlet vurdering
[Konklusjon: Hvordan påvirket KI sluttresultatet totalt sett?]
- Var KI en netto positiv eller negativ faktor?
- Hva var den viktigste lærdommen om å bruke KI i utviklingsprosessen?

---

## 5. Etiske implikasjoner

### 5.1 Ansvar og eierskap
- Hvem er ansvarlig for koden når KI har bidratt?
- Hvordan sikrer man kvalitet når KI genererer kode?
- Diskuter spørsmål om opphavsrett og intellektuell eiendom

### 5.2 Transparens
- Bør det være transparent at KI er brukt?
- Hvordan dokumenterer man KI sin bidrag?
- Hva er konsekvensene av å ikke være åpen om KI-bruk?

### 5.3 Påvirkning på læring og kompetanse
- Hvordan påvirker KI-avhengighet fremtidig kompetanse?
- Hvilke ferdigheter risikerer man å ikke utvikle?
- Balanse mellom effektivitet og læring

### 5.4 Arbeidsmarkedet
- Hvordan kan utbredt KI-bruk påvirke fremtidige jobber i IT?
- Hvilke roller vil bli viktigere/mindre viktige?
- Deres refleksjoner om fremtidig karriere i en KI-drevet verden

### 5.5 Datasikkerhet og personvern
- Hvilke data delte dere med KI-verktøy?
- Potensielle risikoer ved å dele kode og data med KI
- Hvordan skal man tenke på sikkerhet når man bruker KI?

---

## 6. Teknologiske implikasjoner

### 6.1 Kodekvalitet og vedlikehold
- Hvordan påvirker KI-generert kode langsiktig vedlikehold?
- Er KI-kode like forståelig som menneskeskrevet kode?
- Utfordringer med å debugge KI-generert kode

### 6.2 Standarder og beste praksis
- Følger KI alltid beste praksis og industristandarder?
- Eksempler på hvor KI foreslo utdaterte eller dårlige løsninger
- Viktigheten av å validere KI sine forslag

### 6.3 Fremtidig utvikling
- Hvordan tror dere KI vil påvirke programvareutvikling fremover?
- Hvilke ferdigheter blir viktigere for utviklere?
- Deres anbefalinger for hvordan man bør bruke KI i utviklingsprosesser

---

## 7. Konklusjon og læring

### 7.1 Viktigste lærdommer
[Liste de 3-5 viktigste tingene dere lærte gjennom prosjektet]
1. [Lærdom 1]
2. [Lærdom 2]
3. [Lærdom 3]

### 7.2 Hva ville dere gjort annerledes?
[Reflekter over hva dere ville endret hvis dere skulle startet på nytt]
- [Tekniske valg]
- [Bruk av KI]
- [Samarbeid og organisering]

### 7.3 Anbefalinger
[Deres anbefalinger til andre studenter som skal bruke KI i utvikling]
- [Råd om effektiv bruk av KI]
- [Fallgruver å unngå]
- [Beste praksis dere oppdaget]

### 7.4 Personlig refleksjon (individuelt)

**[Navn på gruppemedlem 1]:**
[Personlig refleksjon over egen læring og utvikling]

**[Navn på gruppemedlem 2]:**
[Personlig refleksjon over egen læring og utvikling]

**[Navn på gruppemedlem 3]:**
[Personlig refleksjon over egen læring og utvikling]

---

## 8. Vedlegg (valgfritt)

- Skjermbilder av applikasjonen
- Lenke til GitHub repository
- Annen relevant dokumentasjon

---

**Ordantall:** [Ca. antall ord]

**Forventet lengde:** 3000-5000 ord (avhengig av gruppestørrelse og prosjektets kompleksitet)
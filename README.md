<img src="https://img.shields.io/badge/license-ATR-yellow">

## Description
This tool allows one to view the voting record of Sheffield University's Students' Union's Council for the year.

It is a single page static app that is mobile responsive.

As a proof of concept, it shows what opportunities for data visualisation and interaction is possible when voting data is made public.

But hopefully it's a tool that will allow one to easily understand the state of council, what was voted on, and other features.

It is in line with the active SU policy, [Transparency And Voting](https://docs.google.com/document/d/1KrbLNFIf5dPhOnjdFkb0cNOqID-g8Okiz5aS2p9mfXE/edit?tab=t.0) whose stated goals are to:

1. Maintain the SUC Voting Record as a publicly available and easily accessible resource.
2. Display individual officer and councillor voting history underneath their profile on the SU website (updated after each Council).
3. Create a dedicated space on the SU website for candidates to expand on their manifestoes and experience, with voting records clearly displayed (if applicable).

## Requirements
As a static page it does not require much backend besides a webserver to serve the page.

The current solution requires the optional use of [Google Firestore](https://firebase.google.com/docs/firestore) to hold personal data to be retrieve by the tool.
you'll also need a bucket to store and pull profile images from whose urls you
can store in firestore.

If no valid firestore details are given it will not pull anything.

### Libraries used
1. [qrcodejs](https://github.com/davidshimjs/qrcodejs)
2. [fusejs](https://www.fusejs.io/)
3. [html2canvas](https://html2canvas.hertzen.com/) used to create images of the hexagon
4. [font-awesome 6.7.2] (https://fontawesome.com/)
5. [Google Fonts](https://fonts.google.com/) and [Icons](https://fonts.google.com/icons)

## Setup
1. Clone this repository with `git clone` to your webserver
2. In `index.html`, update these meta tags with the url which you'll be serving the page to
   1. `<meta property="og:url" content="">`
   2. `<meta property="twitter:url" content="">`

It should be ready to view.

### Optional Firestore
1. Set up cloud firestore and create the collection to pull from
2. Set the following rules
    ```js
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read: if true;
        }
      }
    }
    ```
3. in `js/firestore.js` update `firebaseConfig` with the required details you get when you setup the [firestore database](https://console.firebase.google.com/). The format for data is contained in the readme.

## Known issues
1. Does not display councillors who used a proxy
2. Unsure what the difference between no vote given, blank and absent.
3. Abstain Votes and its effect on the passing threshold is broken due to the way it was amended. See: [Make Abstentions Make Sense Again](https://docs.google.com/document/d/1R1ARuz-AjBCocGNOla1V0274Vrlu8WQtIFvYzqch9-E/edit?tab=t.0#heading=h.2dqxjgoqdozu)
4. Wasn't able to figure out how to copy image to clipboard for mobile, so download was done instead
5. Ideally it would be good to move away from google services like firestore for the time being.

## Known bugs:
1. Mobile image copying is in the wrong resolution
2. HTML2Canvas does not capture css shadows on elements

## Format
### Overview of json format used
```json
{
  "state": "ongoing | complete",
  "period": "YYYY/YYYY",
  "people": ["#Person"],
  "councillors": [],
  "sessions": [],
  "records": {},
  "groups": [],
}
```

#### Person
```json
{
  "id": 1,
  "name": "Stevonnie",
  "pronouns": "they/them",
  "course": "Gemology",
  "year": "1st | 2nd | 3rd | 4th",
  "manifesto": "",
  "history": [],
  "email": "suniverse2@sheffield.ac.uk",
  "socials":
  {
    "mastodon": "",
    "pixelfed": "",
    "bluesky": ""
  }
}
```

##### Person > History
```json
{
    "id": "#",
    "position": "?title",
    "year": "YYYY/YYYY"
}
```

#### Councillor
```json
{
  "title": "Councillor title",
  "type": "Academic | Specialised | Representative | SU | PTO | FTO",
  "faculty": "Apprentices | AMRC | SU | Arts & Humanities | Enginnering | Health | Science | Social Science",
  "initial": "[A-Za-z]{1:6}",
  "coords": { "q": 0, "r": 0 },
  "isCurrentlyFilled": "true | false",
  "vacantFor": [ "#sessionNum" ],
  "proxiedFor": [ "#sessionNum" ],
  "person" : [ "#personID" ]
}
```

#### Session
```json
{
    "name": "Meeting #",
    "date": "YYYY-MM-DD",
    "agenda": "$url",
    "minutes": "$url",
    "slides": "$url",
    "logs": "$url"
}
```
#### Record
```json
{
  "styles":
  {
    "standard": [ "For", "Against", "Abstain", "No Vote" ],
    "<customStyle>": [ "custom_option 1", "custom_option 2", "...", "Abstain", "No Vote" ],
    "..." : [ "<option>" ]
  },
  "policies": []
}
```

#### Record > policies
```json
{
  "name": "$PolicyTitle",
  "type": "$recordType",
  "session": "$sessionID",
  "url": "$url",
  "result": "Passed | Failed | <Custom Result>",
  "style":"standard | alphabetical | numerical | $customStyle"
  "votes": [ "$option" ]
}
```

### Overview of firestore format used for personal data
```json
{
  "id": "",
  "period": "YYYY/YYYY",

  "picture": "url",
  "name": "$name",
  "pronouns": "[A-z]+/[A-z]+",
  "degree": "$degreeName",
  "year": "1st | 2nd | 3rd | 4th",

  "email": "email",
  "socials": { "$socialName": "url" },
  "manifesto": "$text",
}
```


## User stories
*AS A* student who is interested in the SU Council,\
*I WANT* to learn what my councillor voted for\
*AND* why they voted the way they did\
*SO THAT* I can stay informed.\

*AS A* student who is interested in the SU Council,\
*I WANT* to be notified when something council related happens\
*SO THAT* I can get involved with council\

*AS A* student who doesn't care about council,\
*I WANT* to understand how council is relevant to me.\
*SO THAT* I can decide if it matters to me.\

*AS A* student,\
*I WANT* to know who my councillor is\
*SO THAT* I can contact them about an issue I am passionate about\

*AS A* student,\
*I WANT* to submit a policy\
*SO THAT* I can help change the uni for the better.\

*AS A* Student who does not have a lot of time\
*I WANT* to be told which policies are relevant to me\
*So THAT* I don't waste what little time I have\

*AS A* student who does not believe the SU has a lot of power\
*I WANT* to be shown how policies have changed things in the uni for the better\
*SO THAT* I can be proven wrong\

*As A* student who knows nothing about council,\
*I WANT* to learn how council works\
*SO THAT* I can understand what is going on AND get involved\

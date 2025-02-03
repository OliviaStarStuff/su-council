<img src="https://img.shields.io/badge/license-ATR-yellow">

## Description

This tool allows you to view the voting record of Sheffield University's Students' Union's Council for the year.

This tool is a proof of concept to show what opportunities for data visualisation and interaction is possible.

## Info

1. Does not display vote by proxy
2. Does not display vote type (STV, etc)

## Known bugs:

1. Doesn't handle councillors who vacate or fill a set half way very well.
2. Unsure what the difference between no vote given, blank and absent.

## Format

### Overview of json format used
```json
{
  "state": "ongoing | completed",
  "period": "YYYY/YYYY",
  "people": [],
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
  "history": [],
  "email": "suniverse2@sheffield.ac.uk",
  "socials": { "mastodon": "", "pixelfed": "", "bluesky": "" }
}
```

##### Person > History
```json
{
    "id": "#CllrNum",
    "title": "#CllrTitle",
    "period": "YYYY/YYYY",
    "manifesto": "text? url?"
}
```

#### Councillor
```json
{
  "title": "Councillor title",
  "type": "Academic | Specialised | Representative | SU | PTO | FTO",
  "faculty": "Apprentices | AMRC | SU | Arts & Humanities | Enginnering | Health | Science | Social Science",
  "initial": "@@@@@",
  "coords": { "q": 0, "r": 0 },
  "isCurrentlyFilled": "true | false",
  "vacantFor": [ "#sessionNum" ],
  "voteDelegatedIn": [ "#sessionNum" ]
  "person" : [ "#personID" ]
}
```

#### Session
```json
{
    "name": "Meeting #",
    "date": "YYYY-MM-DD",
    "agenda": "url",
    "logs": "url"
}
```
#### Record
```json
{
  "styles":
  {
    "standard": [ "For", "Against", "Abstain", "No Vote" ],
    "numerical":
    [
      "Option 1", "Option 2", "Option 3", "Option 4",
      "Recommend Against", "Abstain", "No Vote"
    ],
    "alphabetical":
    [
      "Option A", "Option B", "Option C", "Option D",
      "Blank", "Abstain", "No Vote"
    ],
  },
  "policies": []
}
```

#### Record > policies
```json
{
  "name": "Policy/vote title",
  "session": "#sessionID",
  "url": "url",
  "result": "Passed | Failed | <Custom Result>",
  "style":"standard | alphabetical | numerical | <Custom #Style>"
  "votes": [ "option" ]
}
```
## User stories

*AS A* student who is interested in the SU Council,
*I WANT* to learn what my councillor voted for
*AND* why they voted the way they did
*SO THAT* I can stay informed.

*AS A* student who is interested in the SU Council,
*I WANT* to be notified when something council related happens
*SO THAT* I can get involved with council

*AS A* student who doesn't care about council,
*I WANT* to understand how council is relevant to me.
*SO THAT* I can decide if it matters to me.

*AS A* student,
*I WANT* to know who my councillor is
*SO THAT* I can contact them about an issue I am passionate about

*AS A* student,
*I WANT* to submit a policy
*SO THAT* I can help change the uni for the better.

*AS A* Student who does not have a lot of time
*I WANT* to be told which policies are relevant to me
*So THAT* I don't waste what little time I have

*AS A* student who does not believe the SU h*as a* lot of power
*I WANT* to be shown how policies have changed things in the uni for the better
*SO THAT* I can be proven wrong

*As A* student who knows nothing about council,
*I WANT* to learn how council works
*SO THAT* I can understand what is going on AND get involved
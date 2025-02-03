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

### Overview
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

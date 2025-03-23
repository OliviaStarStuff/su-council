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
4. [font-awesome 6.7.2](https://fontawesome.com/)
5. [Google Fonts](https://fonts.google.com/) and [Icons](https://fonts.google.com/icons)

## Setup
1. Clone this repository with `git clone` to your webserver
2. In `index.html`, update these meta tags with the url which you'll be serving the page to
   1. `<meta property="og:url" content="">`
   2. `<meta property="twitter:url" content="">`

It should be ready to view.

### Optional Firestore setup
1. Create the bucket to store image files
2. Set up Cloud Firestore and create the collection to pull from
3. Set the following rules for Cloud Firestore in the rules tab
    ```js
    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow read: if true;
        }
      }
    }
    ```
4. fill the collection with the required data. The format for data is contained in the readme.
5. in `js/firestore.js` update `firebaseConfig` with the required details you get when you setup the [firestore database](https://console.firebase.google.com/).

## Known issues
1. Unsure what the difference between no vote given, blank and absent.
2. Wasn't able to figure out how to copy image to clipboard for mobile, so download was done instead
3. Ideally it would be good to move away from google services like firestore for the time being.

## Known bugs:
2. HTML2Canvas does not capture css shadows on elements (workaround implemented for some shadows)

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

## Analysis of use cases

### Stakeholders
1. Students
   1. Council Members
      1. Councillors
      2. Student Officers
         1. FTOs
         2. PTOs/Academic Facilitators
   2. Students
      1. Interested Student
      2. Uninterested Student
      3. Busy Student
      4. Disenfranchised Student
2. SU Staff
   1. Rep and Org

The stakeholders for this project can be delineated between Staff to
support SU Council and students who are either involved in SU council
or are either interested or could be interested in council.

### Council Members

There are effectively 2 different kinds of council members,
councillors and student officers/facilitators

#### Councillors
Councillors are elected to represent their student constituents at council votes
and discussion. They can also represent their personal interests.
Councillors are concerned with how to connect with their constitutents
and want to explain the means at which they vote. Some councillors have set up
means to communicate with their constitutents but such setup is not even across
students.

One of the councillors will be elected as **Chairperson** for Council imbued
with the mandate to maintain order at council.

#### Student Officers (FTOs and PTOs/Academic facilitators)
Student Officers are paid, elected officers who represent all students in the SU.
They have specific areas of responsibilities in the SU, are usually overworked
and are very self-motivated individuals. They are often tasked with dealing with
big picture issues at the university level and have accountability requirements
where they share what they've done at council sessions throughout the academic
year for which they are elected for.

#### User stories
*AS A* Council Member,\
*I WANT* the students I represent to know what I voted for\
*SO THAT* I can stay accountable to them.

*AS A* Council Member,\
*I WANT* to be able to explain why I voted for each policy\
*SO THAT* the students I represent understand my rationale.

*AS A* Council Member,\
*I WANT* to be able to collect opinions from the students I represent on council matters\
*SO THAT* I can represent them effectively at council sessions.

*AS A* Student Officer who is interested in democracy,\
*I WANT* a way to recognise any issues with the way council is run\
*SO THAT* I am able to fix those issues and make council better for everyone.

### Students
Students represent a broad group of students some roughly 30,000 strong
(give or take 2100 students). The 4 types of students we consider stakeholders
are...
#### Interested Students
who are usually unaware of what happens at council but want to learn what occurs
#### Uninterested Students
Who does not believe council does anything relevant to them.
#### Busy Students
Who do not often have a lot of time to learn abotu council.
#### Disenfranchised Students
Who don't believe council has any power to effect real change in the university
and in their lives.

The potential solution to these different type of students is to
improve information about council, so that they can understand
1. What is happening at council
2. Why what's decided at council is relevant to them
3. How council is able to effect real change in the university and their lives
4. all this in a manner that is easy for them to learn at a glance and respects
   their time.

#### User stories
*AS A* student who is interested in the SU Council,\
*I WANT* to learn what my councillor voted for\
*AND* why they voted the way they did\
*SO THAT* I can stay informed.

*AS A* student who is interested in the SU Council,\
*I WANT* to be notified when something council related happens\
*SO THAT* I can get involved with council

*AS A* student who doesn't care about council,\
*I WANT* to understand how council is relevant to me.\
*SO THAT* I can decide if it matters to me.

*AS A* student who is interested in the SU Council,\
*I WANT* to know who my councillor is\
*SO THAT* I can contact them about an issue I am passionate about

*AS A* student who is interested in the SU Council,\
*I WANT* to submit a policy\
*SO THAT* I can help change the uni for the better.

*AS A* Student who does not have a lot of time,\
*I WANT* to be told which policies are relevant to me\
*So THAT* I don't waste what little time I have

*AS A* student who does not believe the SU has a lot of power,\
*I WANT* to be shown how policies have changed things in the uni for the better\
*SO THAT* I can be proven wrong

*As A* student who knows nothing about council,\
*I WANT* to learn how council works\
*SO THAT* I can understand what is going on AND get involved

### Rep and Org
Rep and Org is engaged with supporting council. I do not have the full picture
of all tasks involved with supporting council, but it involved
1. Preparing council Agenda
2. Preparing council Minutes
3. Scheduling council sessions and venues
4. Moderating the su-council chat
5. updating the voting records spreadsheet
6. fix errors in records
7. Update bye-laws as voted on in council
8. Updating training material for councillors
9. Maintain the share su council folder

Rep and Org handles many other tasks outside of council including
the academic reps. For this reason as well as the
financial situation in 2024/2025 for the university and the SU,
they find themselves overworked and doing the job that ought to be done by
more than one person.

*AS AN* SU Staff Member who manages SU Council,\
*I WANT* to have a way to reduce my workload with council\
*SO THAT* I can complete my other tasks.

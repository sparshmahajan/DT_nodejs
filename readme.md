# REST API server for the project

## ENV Vars

```env
MONGO_URL=Your_Mongo_Database_URL
PORT=Your_Port_Number
BASE_URL=Your_Base_URL
```

## Dependencies
``` 
Base_URL is the base url of every request url.
```

## API DOCS

### Events Routes
---

| Description            |                 URL              | Method |         Body         |   Status    |
| ---------------------- | -------------------------------- | ------ | -------------------- | ----------- |
|     Add EVENT          |        /events                   | POST   | Event Object         | CREATED     |
|   Get List of events   |        /events                   | GET    |          \_\_        | OK          |
|   Get List of events   |        /events?id=:eventId       | GET    |          \_\_        | OK          |
|       with its id      |
|   Get List of events   |          /events?type=latest&    | GET    |          \_\_        | OK          |
|   with pagination      |           limit=5&page=1         |
|    Update event        |        /events/:id               | PUT    |  Event Object        | CREATED     |
|   Remove event         |        /events/:id               | DELETE |          \_\_        | OK          |

---
Event Object

```json
{
    "title": "Event Title",
    "description": "Event Description",
    "type": "Event Type",
    "schedule": "Event Scheduled At",
    "moderator": "Event Moderator",
    "category": "Event Category",
    "sub_category": "Event Sub Category",
    "tagline": "Event Tagline",
    "rigor_rank": "Event Rigor Rank",
    "image": "Event Image",
    "attendees": "array of Event Attendees",
}
```
---

### Nudge Routes
| Description            |                 URL              | Method |         Body         |   Status    |
| ---------------------- | -------------------------------- | ------ | -------------------- | ----------- |
|     Add nudge          |        /nudges                   | POST   | Nudge Object         | CREATED     |
|   Get List of nudges   |        /nudges                   | GET    |          \_\_        | OK          |
|   Get List of events   |        /nudges?id=:eventId       | GET    |          \_\_        | OK          |
|       with its id      |
|   Update Nudge         |        /nudges/:id               | PUT    |  Nudge Object        | CREATED     |
|   Remove Nudge         |        /nudges/:id               | DELETE |          \_\_        | OK          |

---

Nudge Object

```json
{
    "title": "Nudge Title",
    "description": "Nudge Description",
    "eventId": "tagged Event Id",
    "schedule": "Nudge Scheduled At",
    "tagline": "Nudge Tagline",
    "image": "Nudge Image"
}
```

const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors())

const SCHEDULES = {
    "schedules": [
        {
            "id": 0,
            "appt": [
                {
                    "name": "Sterling Archer",
                    "time": 1668326400000,
                    "kind": "New Patient"
                },
                {
                    "name": "Cyril Figis",
                    "time": 1668328200000,
                    "kind": "Follow-up"
                },
                {
                    "name": "Ray Gilette",
                    "time": 1668330000000,
                    "kind": "Follow-up"
                },
                {
                    "name": "Lana Kane",
                    "time": 1668331800000,
                    "kind": "New Patient"
                },
                {
                    "name": "Pam Poovey",
                    "time": 1668333600000,
                    "kind": "New Patient"
                }
            ]
        },
        {
            "id": 1,
            "appt": [
                {
                    "name": "John Doe",
                    "time": 1668326400000,
                    "kind": "New Patient"
                },
                {
                    "name": "Cyril Figis",
                    "time": 1668328200000,
                    "kind": "Follow-up"
                },
                {
                    "name": "Ray Gilette",
                    "time": 1668330000000,
                    "kind": "Follow-up"
                },
                {
                    "name": "Lana Kane",
                    "time": 1668331800000,
                    "kind": "New Patient"
                },
                {
                    "name": "Pam Poovey",
                    "time": 1668333600000,
                    "kind": "New Patient"
                }
            ]
        },
        {
            "id": 2,
            "appt": [
                {
                    "name": "Sue Doe",
                    "time": 1668326400000,
                    "kind": "New Patient"
                },
                {
                    "name": "Cyril Figis",
                    "time": 1668328200000,
                    "kind": "Follow-up"
                },
                {
                    "name": "Ray Gilette",
                    "time": 1668330000000,
                    "kind": "Follow-up"
                },
                {
                    "name": "Lana Kane",
                    "time": 1668331800000,
                    "kind": "New Patient"
                },
                {
                    "name": "Pam Poovey",
                    "time": 1668333600000,
                    "kind": "New Patient"
                }
            ]
        }
    ]
}

const PHYSICIANS = {
    "physicians": [
        {
            "name": "Hibbert, Julius",
            "first": "Julius",
            "last": "Hibbert",
            "id": 0,
            "email": "hibbert@notablehealth.com"
        },
        {
            "name": "Krieger, Algernop",
            "first": "Algernop",
            "last": "Krieger",
            "id": 1,
            "email": "krieger@notablehealth.com"
        },
        {
            "name": "Riviera, Nick",
            "first": "Nick",
            "last": "Riviera",
            "id": 2,
            "email": "riviera@notablehealth.com"
        }
    ]
}

app.get('/physicians', (req, res) => {
    res.status(200).send(PHYSICIANS);
    res.end();
})

app.get('/schedule/:id', (req, res) => {
    const id = Number(req.params.id);
    if(isNaN(id)) {
        res.status(401).send({"err": "id is not a number"});
        res.end();
    }
    const physSchedule = SCHEDULES.schedules.find(schedule => {
        return schedule.id === parseInt(id);
    });
    res.status(200).send(physSchedule)
    res.end()
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
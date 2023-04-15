import path from "path"
import fs from "fs";

function buildPath() {
    path.join(process.cwd, 'data', 'data.json')
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath)
    const data = JSON.parse(jsonData)
    return data
}

export default function handler (req, res) {
    const {method} = req;

    // Access our data
    // extract our Data (AllEvents)
            // res 404 if there are no AllEvents
        // AllEvents - loop through them and identify the EventID
        // add the email into emails_registered - write on our data
            // only if that email doesn't exist
            // check the format of the email is Ok
    
    const filePath = buildPath();
    const {events_categories, allEvents} = extractData(filePath)
    if(!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found'
        })
    }

    if(method === "POST") {
        const {email, eventId} = req.body;

        const newAllEvents = allEvents.map(ev => {
            if(ev.id === eventId) {
                if(ev.email_registered.includes(email)){
                    res.status(201).json({message: 'This email has already been registered'})
                }
                return {
                    ...ev, email_registered:[...ev.email_registered, email]
                }
            }
            return ev;
        });


        fs.writeFileSync(filePath, JSON.stringify({events_categories, allEvents:  newAllEvents}))
        
        res.status(200).json({
            message: `You have been registered succesully with the email: ${email} ${eventId}`
        })
    }
}
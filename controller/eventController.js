const events = require('../modal/eventModel');


//add events
exports.addEventController = async (req, res) => {
    console.log("Inside addEventController Backend server!!!!");
    const userId = req.payload;

    if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    console.log("UserId from JWT:", userId);

    try {
        const { title, description, date, time, location } = req.body;
        const existingEvent = await events.findOne({ title });
        
        if (existingEvent) {
            return res.status(406).json("Event with the given title already exists");
        }

        const newEvent = new events({ title, description, date, time, location, userId });
        await newEvent.save();
        res.status(200).json(newEvent);
    } catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({ error: `Event creation failed: ${error.message}` });
    }
};

    //update events
    exports.editEventController = async(req,res)=>{
        const {id} = req.params
        const userId = req.payload
        const {title,description,date,time,location} = req.body
        try {
            const existingEvent = await events.findByIdAndUpdate({ _id: id }, {
                title, description, date, time, location, userId
            })
            await existingEvent.save()
            res.status(200).json(existingEvent)
    
        } catch (error) {
            res.status(401).json(error)
        }
    
    }

// to get user created events
exports.userEventController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);
    try{
       const userevents = await events.find({userId})
        if (userevents) {
            res.status(200).json(userevents)
        } else {
            res.status(406).json('No Events Created Yet')
        }
    }catch(error) {
       res.status(401).json(error)
   }
}

//delete
exports.deleteEventController = async(req,res)=>{
    console.log('inside delete function');
     const {id}= req.params
     console.log(id);
     try{
        //deleteOne - returns true or false
        //findByAndDelete - returns an object
           const itemevent = await events.findByIdAndDelete({_id:id})
           res.status(200).json(itemevent)
        }catch(error) {
            res.status(401).json(itemevent)
        }
}


//to get all Events
exports.getAllEventsController = async(req,res)=>{
    //to get searched data
    const searchkey = req.query.search
    console.log(searchkey);
    try{
        //to get searched data
        const query = {
        //to remove case sensitivity => $options:'i'
        location:{$regex:searchkey,$options:'i'}
        }
        //to get all events
        const allevents = await events.find(query)
        if (allevents) {
            res.status(200).json(allevents)
        } else {
            res.status(406).json('No Events')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

    
    
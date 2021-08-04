async function CarBooking(req,res,next){
    //To book a car for certain durations. 
    res.json({message:'CarBooking'})   
}
async function FetchAllBookings(req,res,next){
    //return a list of users who have booked the car along with their durations.
    res.json({message:'FetchAllBookings'})
}

module.exports={
    CarBooking,
    FetchAllBookings
}
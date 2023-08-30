import MeetUpDetail from "@/components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const MeetUpDetails = (props) => {

    return (
        <>
        <Head>
        <title>{props.meetupData.title}</title>
        <meta
        name="description"
        content={props.meetupData.description}
        ></meta>
        </Head>
        <MeetUpDetail
            image = {props.meetupData.image}
            title ={props.meetupData.title}
            address ={props.meetupData.address} 
            description ={props.meetupData.description}
     />
  </>
       
    )
}

export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://abinetanamo26:1234@cluster0.g7xjfie.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id:1}).toArray();
    
    client.close();
    
    return {
        fallback:false,
        paths:meetups.map((meetup)=>({
            params:{meetupId:meetup._id.toString()}
        })),
       
    }

}
export async function getStaticProps(context){
    //fetch data for single meetup 
    const meetupId = context.params.meetupId; 

    const client = await MongoClient.connect('mongodb+srv://abinetanamo26:1234@cluster0.g7xjfie.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id:new ObjectId(meetupId),
    });    
    client.close();

    return {
        props:{
            meetupData:{
                id:selectedMeetup._id.toString(),
                title:selectedMeetup.data.title,
                address:selectedMeetup.data.address,
                image:selectedMeetup.data.image,
                description:selectedMeetup.data.description,
            },

        }
    }
}

export default MeetUpDetails;
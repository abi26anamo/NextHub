import MeetupList from "../components/meetups/meetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const Home = (props)=>{
  
  return (
  <>
    <Head>
      <title>NextHub</title>
      <meta
      name="description"
      content="Browse a huge list of highly active NextHub meetups"
      ></meta>
    </Head>
    <MeetupList meetups ={props.meetups}/>
  </>
  )
}

// export async function getServerSideProps (contex){

//   const req = contex.req;
//   const res = contex.res;
//   //fetch data from an API
//   return {
//     props:{
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps(){
  //fetch data from an API
  const client = await MongoClient.connect('mongodb+srv://abinetanamo26:1234@cluster0.g7xjfie.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props:{
      meetups:meetups.map((meetup)=>({
        title:meetup.data.title,
        address:meetup.data.address,
        image:meetup.data.image,
        id:meetup._id.toString()
      })),
    },
    revalidate:1
  }
}


export default Home;
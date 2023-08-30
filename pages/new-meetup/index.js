import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/newmeetupForm";
import Head from "next/head";

const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {

        const res = await fetch('/api/new-meetup',{
            method:'POST',
            body:JSON.stringify(enteredMeetupData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data = await res.json();
        console.log(data);
        router.push('/');
        
      
    }
    return (
    <>
        <Head>
        <title>Add a new Meetup</title>
        <meta
        name="description"
        content="Add your own meetups create amazing networking opportunities"
        ></meta>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  </>
    
   )

}

export default NewMeetupPage;
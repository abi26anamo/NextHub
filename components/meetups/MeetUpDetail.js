import styles from './MeetupDetail.module.css';

const MeetUpDetail = (props) => {
    return (
        <section className={styles.detail}>
        <img              
             src={props.image} 
             alt={props.title}
        />
        <h1>{props.title}</h1> 
        <address>{props.address} </address>
        <p>{props.description}</p>
    </section>
    )
}

export default MeetUpDetail;
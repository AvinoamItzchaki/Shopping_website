import {useAuth} from "./AuthContext";
import "./css/About.css"

function About(){
    const {username} = useAuth();
    return (
        <div className="about">
            <h1 className="title">שלום וברכה למשתמש {username}!</h1>
            
            <br/><br/><br/><br/><br/><br/><br/>

            <h1 className="end">בילוי נעים באתר!</h1>
            <br/><br/><br/><br/><br/><br/>

        </div>
    )
}
export default About;

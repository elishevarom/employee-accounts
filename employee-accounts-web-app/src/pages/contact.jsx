import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export function Contact() {
    return(
        <>
            <h1 style={{marginTop: 3 + 'em'}}>Contact Us</h1>
            <Tabs
                defaultActiveKey="profile"
                id="contact-tabs"
                className="mt-5"
                fill
                >
                <Tab eventKey="email" title="Email" className="mt-5">
                    employees@accounts.net
                </Tab>
                <Tab eventKey="phone" title="Phone" className="mt-5">
                    1-800-123-4567
                </Tab>
                <Tab eventKey="address" title="Address" className="mt-5">
                    111 Employee Dr <br></br>
                    Baltimore, MD 21209 <br></br>
                    USA
                </Tab>

             </Tabs> 
        </>
    )
}
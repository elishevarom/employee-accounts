import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function About() {
    return(
        <>

<Container >
                <div class="title">
                    <Row className="mx-2">
                        <Col>          
                            <Card body>
                                <h4>About Employee Accounts</h4>
                            </Card>
                        </Col>
                    </Row>
                </div>


                <Row className="mt-5">
                    <Col className="mx-3">            
                        <Card style={{ width: '18rem', color:"blue" }}>
                            <Card.Body>
                                <Card.Title style={{color:"black"}}>What We Provide</Card.Title>
                                    <Card.Text>
                                        Employee Accounts is a website for storing information about employees. Ideal for companies or institutions for keeping track of their employees and staff members.
                                    </Card.Text>
                            </Card.Body>
                        </Card>
        </Col>
    
        <Col className="mx-3">
        <Card style={{ width: '18rem', color:"blue" }}>
      <Card.Body>
        <Card.Title style={{color:"black"}}>Features</Card.Title>
        <Card.Text>
        Features include adding a new employee account, viewing an existing employee account, updating an existing account, and deleting an existing account.
        </Card.Text>
      </Card.Body>
    </Card>
        </Col>

        <Col className="mt-5, px-3">
        <Card style={{ width: '18rem', color:"blue"}}>
      <Card.Body>
        <Card.Title style={{color:"black"}}>About the Creators</Card.Title>
        <Card.Text>
          The creators of the Employee Accounts website are senior computer science students at WITS College. This website was their creation for their capstone project.
        </Card.Text>
      </Card.Body>
    </Card>
        </Col>
      </Row>

      
    </Container>


  


            
        </>
    )
}
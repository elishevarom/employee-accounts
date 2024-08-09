import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function About() {
  return (
    <>
      <div className='about-background-image'>
        <Container className="d-flex align-items-center justify-content-center min-vh-100">

          <Col className='text-center'>
            <Row className='text-center'>
              <h1 className="fs-xl fw-bolder text-light text-uppercase mb-5">About Employee Accounts</h1>
            </Row>

            <Row className='justify-content-center mt-5'>
              <Col md={4} className="mb-4">
                <Card className="card border-2 border-secondary mb-5">
                  <Card.Body className='bg-primary'>
                    <Card.Title className='fs-3 fw-semibold text-secondary'>What we Provide</Card.Title>
                    <Card.Text className='fs-5 text-light text-lowercase'>
                      Employee Accounts is a website for storing information about employees. Ideal for companies or institutions for keeping track of their employees and staff members.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-4">
                <Card className="card border-2 border-secondary mb-5">
                <Card.Body className='bg-primary'>
                    <Card.Title className='fs-3 fw-semibold text-secondary'>Features</Card.Title>
                    <Card.Text className='fs-5 text-light text-lowercase'>
                      Features include adding a new employee account, viewing an existing employee account, updating an existing account, and deleting an existing account.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4} className="mb-4">
              <Card className="card border-2 border-secondary mb-5">
                <Card.Body className='bg-primary'>
                    <Card.Title className='fs-3 fw-semibold text-secondary'>About the Creators</Card.Title>
                    <Card.Text className='fs-5 text-light text-lowercase'>
                      The creators of the Employee Accounts website are senior computer science students at WITS College. This website was their creation for their capstone project.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Col>

        </Container>

      </div>




    </>
  )
}
import React, { UseState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = UseState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='menu-title'>Kantin 1</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className="container-menu">

                <div className="menu">                                     
                    <div className="image-menu"></div>
                    <div className="name-menu">
                        <p className="food-name">Ayam kudu-kudu</p>
                        <p className="price">Rp.15.000</p>
                        <div className="food-count">  
                            <div className="min">-</div>
                            <div className="count">9</div>
                            <div className="plus">+</div>   
                        </div>
                    </div>
                </div>

                <div className="menu">                                     
                    <div className="image-menu"></div>
                    <div className="name-menu">
                        <p className="food-name">Ayam kudu-kudu</p>
                        <p className="price">Rp.15.000</p>
                        <div className="food-count">  
                            <div className="min">-</div>
                            <div className="count">1</div>
                            <div className="plus">+</div>                       
                        </div>
                    </div>
                </div>

                <div className="menu">                                     
                    <div className="image-menu"></div>
                    <div className="name-menu">
                        <p className="food-name">Ayam kudu-kudu</p>
                        <p className="price">Rp.15.000</p>
                        <div className="food-count"> 
                            <div className="min">-</div>
                            <div className="count">1</div>
                            <div className="plus">+</div> 
                        </div>
                    </div>
                </div>
            </div>
            

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Example() {
  return (
    <>
      {['bottom'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

export default OffCanvasExample;
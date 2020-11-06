import React, {useState, useEffect} from 'react';
import {Container,Col,Row,Card} from 'react-bootstrap';
import {FaCaretDown} from "react-icons/fa";
import Graph from './graph';
import {useSelector,useDispatch} from 'react-redux';
import {storeData,storeMarketData} from './action';
import SingleCard from './singlecard';
function Home() {
    const [isLoaded,setLoaded] = useState(false);
    const time = useSelector(state=>state.time);
    const dispatch = useDispatch();

    useEffect(()=>{
        fetch("http://127.0.0.1:4000/shares")
        .then(res=>res.json())
        .then(
            (result)=>{
                setLoaded(true);
                var mv=0,etf=0;
                for(var i=0;i<result.length;i++){
                    if(i<4){
                        mv+=result[i].portfolio_value;
                    }
                    if(i>=4){
                        etf+=result[i].portfolio_value;
                    }
                }
                etf = Math.round(etf*100)/100;
                dispatch(storeMarketData({mv,etf}));
                dispatch(storeData(result)); 
            })
    });

  return (
      <div>
        <Container fluid>
            <Row>
                <Col sm={9}>
                    <Row className="mt-5">
                        <Col sm="12">
                        {(isLoaded)?
                                time.map((item,index)=>{
                                return <SingleCard key={item.id} share={item} />
                                }):null
                            }
                        </Col>
                    </Row>
                </Col>
                <Col sm={3}>
                <Card className="mt-5" style={{boxShadow:'rgb(216, 216, 216) 1px 3px 15px 0px',border:0}}>
                    <Card.Body className="p-0">
                        <div className="p-2 mb-0" style={{display:"flex", flexDirection:"row",justifyContent:'space-between'}}>
                            <p className="mb-0 align-self-end">{"Portfolio"}</p>
                            <p className="mb-0 align-self-end" style={{fontSize:13}}>Asset-wise <FaCaretDown/></p>
                        </div>
                        <Graph/>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
      </div>
  );
}

export default Home;

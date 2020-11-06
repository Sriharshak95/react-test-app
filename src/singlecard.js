import React from 'react';
import {Col,Row,Image,Card, Button, Table, ProgressBar} from 'react-bootstrap';
import { FiMenu } from "react-icons/fi";
import { FaAt, FaRegMoneyBillAlt,FaCaretDown,FaCaretUp} from "react-icons/fa";
import {RiDatabase2Line} from "react-icons/ri";
import SpShares from './spshares.png';

const computeRound = (num) =>{
    return Math.round(num * 100) / 100
}

const computeMarketValue = (num1,num2) =>{
    return num1*num2;
}

const computePL = (num1,num2) =>{
    return computeRound(num1-num2);
}

const computeReturnPercentage = (price,quant,inv) =>{
    const marketValue = computeMarketValue(price,quant);
    const PL = computePL(marketValue,inv);
    return computeRound((PL*100)/inv);
}

const PLDecision = (num) =>{
    if(num<0){
        return <FaCaretDown style={{color:'red'}} />;
    }
    else if(num>0){
        return <FaCaretUp style={{color:'green'}} />;
    }
    else{
        return null;
    }
}

const BiDirectionProgress = (result) =>{
    if(result<0){
        return(<Row noGutters={true}>
            <Col sm={6}><ProgressBar variant="danger" style={{transform:'rotate(180deg)'}} now={Math.round(Math.abs(result))} /></Col><Col sm={6}><ProgressBar variant="success" now={0} /></Col></Row>);
    }
    else if(result>0){
        return(<Row noGutters={true}>
            <Col sm={6}><ProgressBar variant="danger" style={{transform:'rotate(180deg)'}} now={0} /></Col><Col sm={6}><ProgressBar variant="success" now={Math.round(result)} /></Col></Row>);
    }
    else{
        return(<Row noGutters={true}>
            <Col sm={6}><ProgressBar variant="danger" style={{transform:'rotate(180deg)'}} now={0} /></Col><Col sm={6}><ProgressBar variant="success" now={0} /></Col></Row>);
    }
}

function SingleCard({share}){
    return(
        <Card className="card-border p-2 mb-2" style={{boxShadow:'#d8d8d8 1px 3px 15px 0px',border:0}}>
        <Row noGutters={true}>
            <Col>
                <Card.Body className="p-1 h-100">
                    <Table borderless className="mb-0 h-100" style={{backgroundColor:'#f9f9f9', boxShadow:'1px 3px 5px 1px #dedede'}}>
                        <tbody>
                            <tr>
                            <td className="align-middle p-2"><FiMenu /></td>
                                <td width="80" className="p-0" style={{textAlign:"center",verticalAlign:"middle"}}>
                    <div style={{fontSize:13,color:'#8c8c8c'}}>{share.scrip}</div>
                    <div style={{fontSize:16}}><span style={{color:'#828282'}}>$</span> <span style={{color:'#4295a0',fontWeight:700}}>{share.price}</span></div></td>
                                <td className="p-1 align-middle"><Image src={SpShares} fluid />
                                <div style={{fontSize:10}}>S&P 500 Index US Equity</div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Col>
            <Col style={{fontSize:14}}>
                <Card.Body className="p-1 h-100">
                    <Table borderless className="mb-0 h-100" style={{backgroundColor:'#f9f9f9', boxShadow:'1px 3px 5px 1px #dedede'}}>
                        <tbody>
                            <tr>
                                <td className="p-1 align-middle"><RiDatabase2Line /> Quantity</td>
                                <td className="p-1 align-middle" style={{fontWeight:600}}>{share.quantity}</td>
                            </tr>
                            <tr>
                                <td sm="6" className="p-1 align-middle"><FaAt /> Avg cost.</td>
                                <td sm="6" className="p-1 align-middle" style={{fontWeight:600}}>{'$ '+computeRound(share.inv_amt/share.quantity)}</td>
                            </tr>
                            <tr>
                                <td sm="6" className="p-1 align-middle"><FaRegMoneyBillAlt /> Invested Amt.</td>
                                <td sm="6" className="p-1 align-middle" style={{fontWeight:600}}>{'$ '+share.inv_amt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Col>
            <Col style={{fontSize:14}}>
                <Card.Body className="p-1 h-100">
                    <Table borderless className="mb-0 h-100" style={{backgroundColor:'#f9f9f9', boxShadow:'1px 3px 5px 1px #dedede'}}>
                        <tbody>
                            <tr>
                                <td className="p-1 align-middle">Market Value</td>
                                <td className="p-0 align-middle" style={{fontWeight:600}}>{'$ '+computeMarketValue(share.price,share.quantity)}</td>
                            </tr>
                            <tr>
                                <td className="p-1 align-middle" style={{color:'#8c8c8c'}}>% of portfolio value</td>
                                <td className="p-0 align-middle" style={{fontWeight:600}}>{share.portfolio_value+'%'}</td>
                            </tr>
                            <tr>
                                <td className="p-1 align-middle" colSpan="2">
                                <ProgressBar variant="success" now={Math.round(share.portfolio_value)} />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Col>
            <Col style={{fontSize:14}}>
                <Card.Body className="p-1 h-100">
                <Table borderless className="mb-0 h-100" style={{backgroundColor:'#f9f9f9', boxShadow:'1px 3px 5px 1px #dedede'}}>
                    <tbody>
                        <tr>
                            <td className="p-1 align-middle">Unrealized P/L</td>
                            <td className="p-0 align-middle" style={{fontWeight:600}}>{'$ '+Math.abs(computePL(computeMarketValue(share.price,share.quantity),share.inv_amt))}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-middle" style={{color:'#8c8c8c'}}>% Return</td>
    <td className="p-0 align-middle" style={{fontWeight:600}}>{PLDecision(computeReturnPercentage(share.price,share.quantity,share.inv_amt))}{Math.abs(computeReturnPercentage(share.price,share.quantity,share.inv_amt))+'%'}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-middle" colSpan="2">
                                {BiDirectionProgress(computeReturnPercentage(share.price,share.quantity,share.inv_amt))}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </Card.Body>
            </Col>
            <Col sm={1} className="align-self-center">
                <Card.Body className="p-1">
                    <Button className="w-100" variant="outline-primary" style={{fontSize:14}}>Buy</Button>
                    <Button variant="outline-primary" className="mt-1 w-100" style={{fontSize:14}}>Sell</Button>
                </Card.Body>
            </Col>
        </Row>
    </Card>        
    );
}

export default SingleCard;
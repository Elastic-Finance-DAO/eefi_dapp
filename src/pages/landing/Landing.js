import React from "react";
import { Row,
         Col,
         Table,
         InputGroup,
         InputGroupAddon
       } from "reactstrap";

import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Label, Input, FormGroup } from "reactstrap";
import Widget from "../../components/Widget";
import { loginUser, receiveToken } from "../../actions/user";
import jwt from "jsonwebtoken";
import s from './Landing.module.scss';
import signinImg from "../../images/signinImg.svg";
import config from "../../config";
import img1 from "../../images/Vector-1.svg";
import img2 from "../../images/Vector-2.svg";
import img3 from "../../images/Vector-3.svg";
import img4 from "../../images/Vector-4.svg";

import { Container } from "reactstrap";
import errorImg from "../../images/error-page-img.svg";

//tokens
import p1 from "../../images/tokens/Site_logo_blue.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
import p3 from "../../images/tokens/connected_white.png";
import p4 from "../../images/tokens/governance_white.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";
import p6 from "../../images/tokens/system_white.png";



class Landing extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    return date < data.exp;
  }

  constructor(props) {
    super(props);

  
  }

  

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");
    if (token) {
      this.props.dispatch(receiveToken(token));
    }
  }


  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    }; // eslint-disable-line

 
    return (
       <div className={s.root}>
       <Container fluid>
        <Row>

            <Col md={12} sm={12} xs={12}>
              <Widget>
                <div>

                <Table className="table-hover" responsive>
                  <tr >
                    <td key={0}  width="30%" scope="col" className={"pl-0 text-info white-space: nowrap"}>
                     <p className={"d-flex  align-items-center"} >&nbsp;
                     <h1 className="display-4">
                        Unleash the power of your elastic assets
                     </h1>
                     </p>
                     <p className={"d-flex  align-items-center"} responsive>&nbsp;

                     <h4>
                      Earn token rewards, hedge against negative rebase and more
                     </h4>
                     </p>
                         <p className={"d-flex align-items-center "} responsive>

                    <Link to="/app/home/vault-summary"><Button color="info" size="lg" className="mb-md mr-sm" responsive>Launch App</Button>
                    </Link>
                    </p>

                   </td>  

                 <td key={1}  width="70%" scope="col" className={"pl-0 text-info white-space : normal" }>
                     
               <img height="180" src={p1} alt="" className={"mr-3 mt-2"} />

              
                   </td>       

                  </tr>
           </Table>

                  
                    
                </div>
            </Widget>

            </Col>

          

     <Col sm={12}>
            <Widget>
                <Table width="50%" className=" table-bordered" responsive>
                <thead>
                  <tr >
                    <th key={0} width="33%"  scope="col" className={"pl-0"}>
                      <img height="240" src={p6} alt="" className={"mr-3"} />
                      <h3>A growing ecosystem</h3>
                      <p>Use your elastic assets to tap into a growing number of yield generation strategies, 
                        made possible by the rebase. 
                      </p>
                    </th>
                    <th key={1} width="33%" scope="col" className={"pl-0"}>
                      <img height="240" src={p4} alt="" className={"mr-3"} />
                      <h3>Powered by the community</h3>
                      <p>Vault strategies are approved by holders of the kMPL governance token in exchange for token rewards.
                      </p> 
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      <img height="240" src={p3} alt="" className={"mr-3"} />
                      <h3>Connected to DeFi</h3>
                      <p>Vault strategies are optimized to connect elastic asset holders to the broader DeFi landscape.
                      </p>
                    </th>                  
                  </tr>
                </thead>
              </Table>
            </Widget>
          </Col>

        </Row>
      
        <Row>


        <Col md={12} sm={12} xs={12}>
              <Widget>
                <div>
                <Table className="table-hover" responsive>
                  <tr >
                    <td key={0}  width="30%" scope="col" className={"pl-0 text-info white-space : normal"}>
                     <p className={"d-flex  align-items-center"} >&nbsp;
                     <h1 className="display-4">
                        An AmpleSense DAO Project
                     </h1>
                     </p>

                      <p  className={"d-flex  align-items-center text-info white-space : normal" } style={{ width:'500px'}}>&nbsp;
                       <h5 className={"text-info white-space : normal" } > 
                        The DAO is an independant community powered organization focused on accelerating the global elastic finance ecosystem.
                       </h5>
                     </p>
                        <p className={"d-flex  align-items-center"}>&nbsp;
                       <h5 className={"text-info white-space : normal" } > 
                            Learn about the DAO <a target="_blank" href="https://en.wikipedia.org/wiki/Decentralized_autonomous_organization">>></a>
                         </h5>
                        </p>  
                   </td>  
                  </tr>
                 </Table>                    
               </div>
            </Widget>
            </Col>
          </Row>
          </Container >
         </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default Landing;

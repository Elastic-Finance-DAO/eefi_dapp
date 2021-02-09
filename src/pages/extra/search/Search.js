/* eslint-disable jsx-a11y/href-no-hash */

import React from "react";
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationLink,
  PaginationItem,
  Badge,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import Widget from '../../../components/Widget'

import s from "./Search.module.scss";
import i1 from "../../../images/search/1.jpg";
import i2 from "../../../images/search/5.jpg";
import i3 from "../../../images/search/3.jpg";
import i4 from "../../../images/search/13.jpg";

class Search extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <Row className="mt-3 d-block">
          <Col xl={3} sm={12} className="float-xl-right">
            <Widget title={<p className={"fw-bold"}>Results Filtering</p>}>
              <p className="text-muted fs-mini">
                Listed content is categorized by the following groups:
              </p>
              <Nav
                className={`nav-pills flex-column nav-stacked ${s.searchResultCategories} mt`}
              >
                <NavItem>
                  <NavLink href="#">
                    Hot Ideas
                    <Badge color="danger" pill className="float-right">
                      34
                    </Badge>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    Latest Pictures
                    <Badge color="success" pill className="float-right">
                      9
                    </Badge>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Labels of Day</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Recent Movies</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">
                    Globals
                    <Badge color="info" pill className="float-right">
                      18
                    </Badge>
                  </NavLink>
                </NavItem>
              </Nav>
            </Widget>
          </Col>

          <Col xl={9} sm={12}>
            <section className={`${s.searchResultItem}`}>
              <button className={`btn-link ${s.imageLink}`}>
                <img className={s.image} src={i1} alt="" />
              </button>
              <div className={s.searchResultItemBody}>
                <Row>
                  <Col md={9}>
                    <h4 className={s.searchResultItemHeading}>
                      <button className="btn-link">
                        Next generation admin template
                      </button>
                    </h4>
                    <p className={s.info}>New York, NY 20188</p>
                    <p className={s.description}>
                      Not just usual Metro. But something bigger. Not just usual
                      widgets, but real widgets. Not just yet another admin
                      template, but next generation admin template.
                    </p>
                  </Col>
                  <Col md={3} xs={12} className="text-center">
                    <p className="value3 mt-sm">$9, 700</p>
                    <p className="fs-mini text-muted">PER WEEK</p>
                    <Button color="info" size="sm">
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </div>
            </section>
            <section className={s.searchResultItem}>
              <button className={`btn-link ${s.imageLink}`}>
                <img className={s.image} src={i2} alt="" />
              </button>
              <div className={s.searchResultItemBody}>
                <Row>
                  <Col md={9}>
                    <h4 className={s.searchResultItemHeading}>
                      <button className="btn-link">
                        Try. Posted by Okendoken
                      </button>
                      <small>
                        <span className="badge badge-pill badge-danger float-right">
                          <span className="fw-normal"> Best Deal!</span>
                        </span>
                      </small>
                    </h4>
                    <p className={s.info}>Los Angeles, NY 20188</p>
                    <p className={s.description}>
                      You will never know exactly how something will go until
                      you try it. You can think three hundred times and still
                      have no precise result.
                    </p>
                  </Col>
                  <Col md={3} xs={12} className="text-center">
                    <p className="value3 mt-sm">$10, 300</p>
                    <p className="fs-mini text-muted">PER WEEK</p>
                    <Button color="info" size="sm">
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </div>
            </section>
            <section className={s.searchResultItem}>
              <button className={`btn-link ${s.imageLink}`}>
                <img className={s.image} src={i3} alt="" />
              </button>
              <div className={s.searchResultItemBody}>
                <Row>
                  <Col md={9}>
                    <h4 className={s.searchResultItemHeading}>
                      <button className="btn-link">Vitaut the Great</button>
                    </h4>
                    <p className={s.info}>New York, NY 20188</p>
                    <p className={s.description}>
                      The Great Prince of the Grand Duchy of Lithuania he had
                      stopped the invasion to Europe of Timur (Tamerlan) from
                      Asia heading a big Army of Belarusians, Lithuanians.
                    </p>
                  </Col>
                  <Col md={3} xs={12} className="text-center">
                    <p className="value3 mt-sm">$3, 200</p>
                    <p className="fs-mini text-muted">PER WEEK</p>
                    <Button color="info" size="sm">
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </div>
            </section>
            <section className={s.searchResultItem}>
              <button className={`btn-link ${s.imageLink}`}>
                <img className={s.image} src={i4} alt="" />
              </button>
              <div className={s.searchResultItemBody}>
                <Row>
                  <Col md={9}>
                    <h4 className={s.searchResultItemHeading}>
                      <button className="btn-link">
                        Can I use CSS3 Radial-Gradient?
                      </button>
                    </h4>
                    <p className={s.info}>Minsk, NY 20188</p>
                    <p className={s.description}>
                      Yes you can! Further more, you should! It let&#39;s you
                      create really beautiful images either for elements or for
                      the entire background.
                    </p>
                  </Col>
                  <Col md={3} xs={12} className="text-center">
                    <p className="value3 mt-sm">$2, 400</p>
                    <p className="fs-mini text-muted">PER MONTH</p>
                    <Button color="info" size="sm">
                      Learn More
                    </Button>
                  </Col>
                </Row>
              </div>
            </section>
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <PaginationItem disabled>
                  <PaginationLink previous href="#">
                    Prev
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#">
                    Next
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;

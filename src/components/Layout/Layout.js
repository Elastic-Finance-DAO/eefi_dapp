import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Dashboard from "../../pages/dashboard";
import VaultSummary from "../../pages/vault-summary";
import VaultDetail from "../../pages/vault-detail";
import BlockchainUpdater from '../Blockchain/Updater';
import VaultGenPage from "../../pages/vault-gen-page";
import VaultEefiPage from "../../pages/vault-eefi";
import VaultNFTs from "../../pages/vault-nfts";

import { SidebarTypes } from "../../reducers/layout";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
import { DashboardThemes } from "../../reducers/layout";
import Helper from "../Helper";

// pages
import Typography from "../../pages/core/typography";
import Colors from "../../pages/core/colors";
import Grid from "../../pages/core/grid";
import Maps from "../../pages/maps";
import Notifications from "../../pages/notifications/Notifications";
import StaticTables from "../../pages/tables/static";
import DynamicTables from "../../pages/tables/dynamic";
import Alerts from "../../pages/ui-elements/alerts";
import Badge from "../../pages/ui-elements/badge";
import Card from "../../pages/ui-elements/card";
import Buttons from "../../pages/ui-elements/buttons";
import VectorMap from "../../pages/maps/vector";
import Carousel from "../../pages/ui-elements/carousel";
import Jumbotron from "../../pages/ui-elements/jumbotron";
import ListGroups from "../../pages/ui-elements/list-groups";
import Nav from "../../pages/ui-elements/nav";
import Navbar from "../../pages/ui-elements/navbar";
import Popovers from "../../pages/ui-elements/popovers";
import Progress from "../../pages/ui-elements/progress";
import Tabs from "../../pages/ui-elements/tabs-accordion";
import FormValidation from "../../pages/forms/validation";
import FormElements from "../../pages/forms/elements";
import FormWizard from "../../pages/forms/wizard";
import ChartsOverview from "../../pages/charts";
import GridSeparate from "../../pages/grid";
import Modal from '../../pages/ui-elements/modal'
import Products from "../../pages/products";
import Product from "../../pages/product";
import SPackage from "../../pages/package";
import Email from '../../pages/email'

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dashboardTheme: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    dashboardTheme: DashboardThemes.DARK,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth < 768) {
      this.props.dispatch(toggleSidebar());
    } else if (window.innerWidth >= 768) {
      this.props.dispatch(openSidebar());
    }
  }

  handleCloseSidebar(e) {
    if (e.target.closest("#sidebar-drawer") == null && this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "flatlogic-one",
          `dashboard-${this.props.sidebarType === SidebarTypes.TRANSPARENT ? "light" : this.props.sidebarColor}`,
          `dashboard-${
            this.props.dashboardTheme !== "light" &&
            this.props.dashboardTheme !== "dark"
              ? this.props.dashboardTheme
              : "" 
          }`,

        ].join(" ")}
        onClick={e => this.handleCloseSidebar(e)}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />
          <Helper />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/app/home"
                      exact
                      render={() => <Redirect to="/app/home/dashboard" />}
                    />
                    <Route
                      path="/app/home/dashboard"
                      exact
                      component={Dashboard}
                    />
                    <Route
                      path="/app/home/vault-summary"
                      exact
                      component={VaultSummary}
                    />
                     <Route
                      path="/app/home/vault-detail/:id"
                      component={VaultDetail}
                      exact
                    />
                   <Route
                      path="/app/home/vault-gen-page"
                      exact
                      component={VaultGenPage}
                    />
                     <Route
                      path="/app/home/vault-eefi"
                      exact
                      component={VaultEefiPage}
                    /> 
                   <Route
                      path="/app/home/vault-nfts"
                      exact
                      component={VaultNFTs}
                    />
             
                    <Route
                      path={"/app/core/typography"}
                      component={Typography}
                    />
                    <Route path={"/app/core/colors"} component={Colors} />
                    <Route path={"/app/core/grid"} component={Grid} />
                    <Route
                      path={"/app/tables/basic"}
                      component={StaticTables}
                    />
                    <Route
                      path={"/app/tables/dynamic"}
                      component={DynamicTables}
                    />
                    <Route path={"/app/maps/google"} component={Maps} />
                    <Route path={"/app/maps/vector"} component={VectorMap} />
                    <Route
                      path={"/app/ui/notifications"}
                      component={Notifications}
                    />
                    <Route path={"/app/ui/alerts"} component={Alerts} />
                    <Route path={"/app/ui/badge"} component={Badge} />
                    <Route path={"/app/ui/card"} component={Card} />
                    <Route path={"/app/ui/buttons"} component={Buttons} />
                    <Route path={"/app/ui/carousel"} component={Carousel} />
                    <Route path={"/app/ui/jumbotron"} component={Jumbotron} />
                    <Route
                      path={"/app/ui/list-groups"}
                      component={ListGroups}
                    />
                    <Route path={"/app/ui/modal"} component={Modal} />
                    <Route path={"/app/ui/nav"} component={Nav} />
                    <Route path={"/app/ui/navbar"} component={Navbar} />
                    <Route path={"/app/ui/popovers"} component={Popovers} />
                    <Route path={"/app/ui/progress"} component={Progress} />
                    <Route path={"/app/ui/tabs"} component={Tabs} />
                    <Route path={"/app/ui/modal"} component={Modal} />
                    <Route
                      path={"/app/forms/validation"}
                      component={FormValidation}
                    />
                    <Route
                      path={"/app/forms/elements"}
                      component={FormElements}
                    />
                    <Route path={"/app/forms/wizard"} component={FormWizard} />
                    <Route
                      path={"/app/charts/overview"}
                      component={ChartsOverview} 
                    />
                    <Route path={"/app/grid"} component={GridSeparate} />
                    <Route path={"/app/ecommerce/products"} component={Products} />
                    <Route path={"/app/ecommerce/product/:id"} component={Product} exact/>
                    <Route path={"/app/ecommerce/product"} component={Product} />
                    <Route path={"/app/package"} component={SPackage} />
                    <Route path={"/app/email"} component={Email} />
                    <Route render={() => <Redirect to={{pathname: '/error'}}/>}/>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              {this.props.account && <BlockchainUpdater key={""+this.props.vault_type}/>}
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    dashboardTheme: store.layout.dashboardTheme,
    sidebarType: store.layout.sidebarType,
    sidebarColor: store.layout.sidebarColor,
    account: store.auth.account,
    vault_type : store.blockchain.vault_type
  };
}

export default withRouter(connect(mapStateToProps)(Layout));

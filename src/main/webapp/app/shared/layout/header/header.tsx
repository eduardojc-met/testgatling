import './header.scss';

import React, { useState, useEffect } from 'react';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

import { SCFAppBar } from '@scfhq/foundation-uax';
import { Grid, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import AppsIcon from '@mui/icons-material/Apps';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appbarMenu, setAppbarMenu] = useState(true);
  const appBarResponsive = useMediaQuery('(min-width:900px)');

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleAppbarMenu = () => {
    setAppbarMenu(!appbarMenu);
  };
  useEffect(() => {
    if (appBarResponsive) {
      setAppbarMenu(true);
    }
  }, [appBarResponsive]);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  return (
    <div id="app-header">
      {renderDevRibbon()}
      <SCFAppBar sx={{ position: 'absolute', backgroundColor: 'white' }} className="loading-bar">
        <Toolbar disableGutters className="jh-navbar" id="header-tabs">
          <Brand />
          <Grid container spacing={2} p={6} direction="row" maxWidth="xl" alignContent="flex-end" justifyContent="flex-end">
            <Box className="Appbar-menuContainer">
              <IconButton onClick={handleAppbarMenu} sx={{ zIndex: 1000, right: '-130px' }}>
                <AppsIcon sx={{ display: { xs: 'block', md: 'none' } }} className="Appbar-iconmenu" />
              </IconButton>
              {appbarMenu && (
                <Box className="Appbar-menu">
                  {props.isAuthenticated && <EntitiesMenu />}
                  {props.isAuthenticated && props.isAdmin && (
                    <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
                  )}
                  <AccountMenu isAuthenticated={props.isAuthenticated} />
                </Box>
              )}
            </Box>
          </Grid>
        </Toolbar>
      </SCFAppBar>
    </div>
  );
};

export default Header;

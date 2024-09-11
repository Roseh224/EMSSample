import React from 'react';
import { useState } from 'react';
import LoginPage from './Pages/LoginCode';
import { Routes, Route } from "react-router-dom";
import Overview from './Pages/OverviewPage';
import Water from './Pages/WaterPage';
import PlumeFutures from './Pages/PlumeFuturesPage';
import SenseTechnologyPage from './Pages/SenseTechnologyPage';
import RequireAuth from './Hooks/RequireAuth';
import { getToken } from './Components/helpers/tokenUtils';
import { LOGIN_TOKEN_NAME } from './Components/helpers/Constants';

export default function App() {
  const [site, setSite] = useState(getToken(LOGIN_TOKEN_NAME)?.defaultSite);
  const [pageAccess, setPageAccess] = useState(getToken(LOGIN_TOKEN_NAME)?.access);
  const [client, setClient] = useState(getToken(LOGIN_TOKEN_NAME)?.client);

  return (
    <Routes>
      <Route path="/login"
        element={
          <LoginPage
            setSite={setSite}
            setPageAccess={setPageAccess}
            setClient={setClient}
          />
        }
      />

      <Route element={<RequireAuth />}>
        <Route path="/"
          element={
            <Overview
              site={site}
              setSite={setSite}
              pageAccess={pageAccess}
              client={client}
            />
          }
        />
        <Route path="/WaterSense"
          element={
            <Water
              site={site}
              setSite={setSite}
              pageAccess={pageAccess}
              client={client}
            />
          }
        />
        <Route path="/PlumeFutures"
          element={
            <PlumeFutures
              site={site}
              setSite={setSite}
              pageAccess={pageAccess}
              client={client}
            />
          }
        />
        <Route path="/SenseTechnology"
          element={
            <SenseTechnologyPage
              site={site}
              setSite={setSite}
              pageAccess={pageAccess}
              client={client}
            />
          }
        />
      </Route>
    </Routes>
  );
}
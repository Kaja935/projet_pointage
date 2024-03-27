import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt ,faUser, faBuilding, faTachometer, faBuildingUser, faCalendar, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Society } from "../society/society";
import { User } from "../user/user";
import WorkhourForm from "../workhour/workhour";
import { Employee } from "../employee/Employee";
import { Department } from "../department/Department";
import WorkhourMapping from "../workhour/workhourlist";
import "./home.css";

export const Home = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(localStorage.getItem('selectedItem') || '0');
  const [selected, setSelected] = useState(localStorage.getItem('selectedItem') || '0');

  const handleClick = (val) => {
    setValue(val);
    setSelected(val);
    localStorage.setItem('selectedItem', val);
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const renderContent = () => {
    switch (value) {
      case '0':
        return <h1>{t('Dashboard')}</h1>;
      case '1':
        return <Society t={t} />;
      case '2':
        return <User t={t} />;
      case '3':
        return <Department t={t} />;
      case '4':
        return <WorkhourForm t={t} />;
      case '5':
        return <WorkhourMapping t={t} />;
      case '6':
        return <Employee t={t} />;
      default:
        return <h1>{t('Home')}</h1>;
    }
  };
  
  return (
    <div className="home">
      <Navbar bg="transparent" variant="light" className="fixed-top text-dark">
        <Container>
          <div className="logo"></div>
        </Container>
        <Button variant="outline-light" style={{ border: "1px solid black", color:'black', marginRight:'10px' }} onClick={toggleLanguage}>
          {i18n.language === 'en' ? 'FR' : 'EN'}
        </Button>
      </Navbar>
      <Container fluid className="mt-5" style={{ marginTop: "250px" }}>
        <Row>
          <Col
            xs={2}
            className="sidebar"
            style={{
              backgroundColor: "#50b64a",
              minHeight: "90vh",
              marginTop: "10px",
              borderRadius: "20px",
              position: "relative",
              width:'250px'
            }}
          >
            <br></br>
            <div
              onClick={() => handleClick('0')}
              style={{
                backgroundColor: selected === '0' ? '#ececec' : 'inherit',
                padding: selected === '0' ? '15px' : '10px',
                marginRight: selected === '0' ? '-15px' : '0px',
                color: selected === '0'? 'black' : 'white'
              }}
            >
              <FontAwesomeIcon icon={faTachometer} style={{color: selected === '0'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Dashboard')}
            </div>
            <div
              onClick={() => handleClick('1')}
              style={{
                backgroundColor: selected === '1' ? '#ececec' : 'inherit',
                padding: selected === '1' ? '15px' : '10px',
                marginRight: selected === '1' ? '-15px' : '0px',
                color: selected === '1'? 'black' : 'white'
              }}
            >
              <FontAwesomeIcon icon={faBuilding} style={{color: selected === '1'? 'black' : 'white' }} /> <span>&nbsp;</span>{t('Society')}
            </div>
            <div
              onClick={() => handleClick('2')}
              style={{
                backgroundColor: selected === '2' ? '#ececec' : 'inherit',
                padding: selected === '2' ? '15px' : '10px',
                marginRight: selected === '2' ? '-15px' : '0px',
                color: selected === '2' ? 'black' : 'white'
              }}
            >
              <FontAwesomeIcon icon={faUser} style={{color: selected === '2' ? 'black' : 'white'  }} /><span>&nbsp;</span>{t('User')}
            </div>
              <div
                  onClick={() => handleClick('3')}
                  style={{
                      backgroundColor: selected === '3' ? '#ececec' : 'inherit',
                      padding: selected === '3' ? '15px' : '10px',
                      marginRight: selected === '3' ? '-15px' : '0px',
                      color: selected === '3'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faBuildingUser} style={{color: selected === '3'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Department')}
                  </div>
              <div
                  onClick={() => handleClick('4')}
                  style={{
                      backgroundColor: selected === '4' ? '#ececec' : 'inherit',
                      padding: selected === '4' ? '15px' : '10px',
                      marginRight: selected === '4' ? '-15px' : '0px',
                      color: selected === '4'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faCalendar} style={{color: selected === '4'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Workhour')}
              </div>
              <div
                  onClick={() => handleClick('5')}
                  style={{
                      backgroundColor: selected === '5' ? '#ececec' : 'inherit',
                      padding: selected === '5' ? '15px' : '10px',
                      marginRight: selected === '5' ? '-15px' : '0px',
                      color: selected === '5'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faCalendarAlt} style={{  color: selected === '5'? 'black' : 'white'}} /> <span>&nbsp;</span>{t('Workhour List')}
              </div>
              <div
                  onClick={() => handleClick('6')}
                  style={{
                      backgroundColor: selected === '6' ? '#ececec' : 'inherit',
                      padding: selected === '6' ? '15px' : '10px',
                      marginRight: selected === '6' ? '-15px' : '0px',
                      color: selected === '6'? 'black' : 'white'
                  }}
              >
                  <FontAwesomeIcon icon={faCalendarAlt} style={{  color: selected === '6'? 'black' : 'white'}} /><span>&nbsp;</span>{t('Employee')}
              </div>
                  <div style={{ position: "absolute", bottom: "20px", left: '15%' }}>
                    <Button style={{ background: "none", border: "none", color: "white" }}>
                      <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} /> {t('Log out')}
                     </Button> 
                  </div>
                  
                </Col>
              <Col>
                <div className=" mt-5" style={{maxHeight:'85vh',overflowY:'auto',minHeight:'85vh'}}>{renderContent()}</div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    };

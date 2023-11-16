import { getCheckoutSessionUrl } from "@/api/Payments";
// import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
// import router from 'next/router';
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Noto_Sans_Thai } from "next/font/google";
const noto_sans_thai = Noto_Sans_Thai({ weight: "400", subsets: ["thai"] });
import styles from "./styles.module.css";
import { translate } from "@/languages/language";
import { useLanguage } from "@/contexts/LanguageContext";
import { BsCoin } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import { GiCoins } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";
import { RiCoinFill } from "react-icons/ri";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MaintainPage } from "@/components/maintain";
// loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_API_KEY
// );
import { BsCheckCircle } from "react-icons/bs";
import { CheckoutSessionRequest } from "@/models/dto/requests/PaymentRequest";
export default function Subscription() {
  const router = useRouter();
  const { language } = useLanguage();
  const prize_id_bronze = "price_1O9N1cAom1IgIvKKvbttMHdx";
  const prize_id_silver = "price_1O9RapAom1IgIvKKJSSbT8jL";
  const prize_id_gold = "price_1OCiCbAom1IgIvKK13OebsIL";

  
  // This function is soonly used to handle the checkout session 
  const handleCheckoutSession = async (prize_id: string) => {
    const data : CheckoutSessionRequest = {
      prize_id: prize_id,
      web_url: window.location.hostname,
    }

    // Calling the checkout function and awaiting the returned Stripe checkout session URL
    const checkout_session_url = await getCheckoutSessionUrl(data);

    // TODO logic to store plan_id in website
    // Redirect to stripe payment page
    router.push(checkout_session_url); 
  }
  
  return (
    <>
      <div className={noto_sans_thai.className}>
        <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
          <Container className={`${styles.container}`}>
            <figure className="text-center  text-light">
              <blockquote className="blockquote">
                <p className="display-4 fw-bold">
                  {translate("subscription", language)}
                </p>
              </blockquote>
              <figcaption className="blockquote-footer"></figcaption>
            </figure>
            <div className={`row ${styles.page_payment_row}`}>
              <div className="container text-center">
                <Row className="">
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.freeBorder}`}
                  >
                    <h5 className="mb-3">FREE</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(0deg, #00FFAB 0%, #00AA95 100%)",
                      }}
                    >
                      0
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          5 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.community", language)}
                        </small>
                      </Row>
                    </div>
                    {/* <button
                      className={`${styles.btn} ${styles.free} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(0deg, #00FFAB 0%, #00AA95 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handlePrizeClick("price_1NdUDIAom1IgIvKKmDRjzFiC")
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button> */}
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.broneBorder}`}
                  >
                    <h5 className="mb-3">BRONZE</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #C06B16 -18.83%, #D99C71 100%)",
                      }}
                    >
                      50
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          25 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.support", language)}
                        </small>
                      </Row>
                    </div>
                    <button
                      className={`${styles.btn} ${styles.bronze} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(180deg, #C06B16 -18.83%, #D99C71 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handleCheckoutSession(prize_id_bronze)
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.silverBorder}`}
                  >
                    <h5 className="mb-3">SILVER</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(0deg, #CACACA 0%, #676767 100%)",
                      }}
                    >
                      100
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          100 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.support", language)}
                        </small>
                      </Row>
                    </div>
                    <button
                      className={`${styles.btn} ${styles.silver} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(0deg, #CACACA 0%, #676767 100%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handleCheckoutSession(prize_id_silver)
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <Col
                    className={`d-flex flex-column align-items-center position-relative ${styles.custom_border} ${styles.goldBorder}`}
                  >
                    <h5 className="mb-3">GOLD</h5>
                    <h1
                      className={`${styles.circle_background}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #EE8F00 0%, #FFCA43 57.92%)",
                      }}
                    >
                      200
                      <span style={{ fontWeight: "normal", fontSize: "26px" }}>
                        ฿
                      </span>
                    </h1>
                    <div className="mt-4 mb-4 text-start">
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          500 {translate("subscription.message", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.chat", language)}
                        </small>
                      </Row>
                      <Row>
                        <small>
                          <BsCheckCircle
                            size={16}
                            className="me-3"
                          ></BsCheckCircle>
                          {translate("subscription.support", language)}
                        </small>
                      </Row>
                    </div>
                    <button
                      className={`${styles.btn} ${styles.gold} btn position-absolute`}
                      style={{
                        background:
                          "linear-gradient(180deg, #EE8F00 0%, #FFCA43 57.92%)",
                        bottom: -30,
                      }}
                      onClick={() =>
                        handleCheckoutSession(prize_id_gold)
                      }
                    >
                      {translate("subscription.buy", language)}
                    </button>
                  </Col>
                  <p className={`${styles.select}`}>
                    {translate("subscription.selectSub", language)}
                  </p>
                </Row>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </>
  );
}

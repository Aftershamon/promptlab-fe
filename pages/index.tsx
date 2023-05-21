import { Noto_Sans_Thai } from 'next/font/google'
import { Container } from 'react-bootstrap'
import { useLanguage } from "@/language/ LanguageContext";
import { t } from "@/components/language";
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
import Head from "next/head";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";
export default function Home() {
    const { language } = useLanguage();
    return (
      <>
        <Head>
          <title>{t("home.title", language)}</title>
          <meta
            name="description"
            content="Meta description for the Home page"
          />
        </Head>
        <div className={noto_sans_thai.className}>
          <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
            <figure className="text-center pt-4 pb-4 text-light">
              <blockquote className="blockquote">
                <p className="display-4"> Prompt Lab</p>
              </blockquote>
              <figcaption className="blockquote-footer">
                <h6> {t("home.description", language)} </h6>
              </figcaption>
              <button className={`${styles.btn} mt-3`}>JOIN NOW</button>
            </figure>
            <Container className={`bg-dark ${styles.container}`}>
              <Container className={`${styles.gray} ${styles.container}`}>
                <figure className="text-center pt-4 pb-1 text-light">
                  <h3>
                    <b> Prompt Lab หน้าตาเป็นยังไงกันนะ</b>
                  </h3>
                </figure>
                <div style={{ width: "100%" }}>
                  <video className="active w-100 mb-5" loop controls>
                    <source
                      src="https://mdbcdn.b-cdn.net/img/video/forest.mp4"
                      type="video/mp4"
                    />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
                <div className={`row mb-2`}>
                  <div
                    className={`col-sm-4 mb-3 col-lg-5 ${styles.marginleft}`}
                  >
                    <img
                      className={`${styles.rounded} float-start img-fluid`}
                      src="https://cdn.pixabay.com/photo/2018/06/10/13/41/rice-terraces-3466518_640.jpg"
                    ></img>
                  </div>

                  <div className="col-sm-8 col-lg-5">
                    <figure className="text-start pt-2 pb-2 text-light">
                      <h4 className="mb-4">
                        <b> Prompt Lab คืออะไร?</b>
                      </h4>
                      <p>
                        Prompt Lab
                        คือเว็บไซต์ที่ช่วยให้ผู้คนปลดล็อคความคิดสร้างสรรค์ของคุณโดยมี
                        AI คอยช่วยคิดอะไรต่างๆ ให้
                      </p>
                    </figure>
                  </div>
                </div>
                <div className={`row ${styles.margintop}`}>
                  <div className="col-sm-4 order-lg-2 mb-4 col-lg-5">
                    <img
                      className={`${styles.rounded} float-end img-fluid`}
                      src="https://cdn.pixabay.com/photo/2021/07/05/15/18/senbon-torii-6389421_640.jpg"
                    ></img>
                  </div>
                  <div
                    className={`col-sm-8 order-lg-1 col-lg-6 ${styles.marginright}`}
                  >
                    <figure className="text-start text-light">
                      <h4 className="mb-4">
                        <b> Prompt Lab คืออะไร?</b>
                      </h4>
                      <p>
                        Prompt Lab
                        คือเว็บไซต์ที่ช่วยให้ผู้คนปลดล็อคความคิดสร้างสรรค์ของคุณโดยมี
                        AI คอยช่วยคิดอะไรต่างๆ ให้
                      </p>
                    </figure>
                  </div>
                </div>
              </Container>
            </Container>
          </Container>
        </div>
      </>
    );
}

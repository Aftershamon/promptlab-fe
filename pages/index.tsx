import { Noto_Sans_Thai } from 'next/font/google'
import { Container } from 'react-bootstrap'
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })
import Head from "next/head";
import styles from "./styles.module.css";
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import SubscriptionModal from '@/components/subscription';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useUserContext } from '@/contexts/UserContext';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
   const userContext = useUserContext()
   const [showModal, setShowModal] = useState(false);
   const { t, i18n } = useTranslation()

   useEffect(() => {
      // Check if the user has already seen the modal
      const modalShown = Cookies.get('modalShown');
      if (modalShown === undefined) {
         // If not, show the modal
         setShowModal(true);
      }
   }, []);

   return (
      <>
         <Head>
            <title> Prompt Lab AI</title>
            <meta
               name="description"
               content="Promptlab ai ตัวช่วยสำหรับ Content Creator สำหรับงานสร้างสรรค์คอนเท้นต์"
            />

            {/* <!-- HTML Meta Tags --> */}

            {/* <!-- Google / Search Engine Tags --> */}
             <meta itemProp="image" content="https://promptlabai.com/images/prompt_lab_logo.png" />

            {/* <!-- Facebook Meta Tags --/> */}
            <meta property="og:url" content="https://develop.promptlabai.com" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Prompt Lab AI" />
            <meta property="og:description" content="Promptlab ai ตัวช่วยสำหรับ Content Creator สำหรับงานสร้างสรรค์คอนเท้นต์" />
            <meta property="og:image" content="https://promptlabai.com/images/prompt_lab_logo.png" />

            {/* <!-- Twitter Meta Tags --/> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Prompt Lab AI" />
            <meta name="twitter:description" content="Promptlab ai ตัวช่วยสำหรับ Content Creator สำหรับงานสร้างสรรค์คอนเท้นต์" />
            <meta name="twitter:image" content="https://promptlabai.com/images/prompt_lab_logo.png" />

         </Head>
         <div className={noto_sans_thai.className}>
            {userContext?.user?.planType === "Free" && showModal && <SubscriptionModal show={showModal} />}
            <Container fluid={true} className="p-0 bg-dark pt-5 pb-5">
               <Container className={`bg-dark ${styles.container}`}>
                  <Container className={`${styles.gray} ${styles.container}`}>
                     <figure className="text-center pt-4 pb-4 text-light">
                        <blockquote className="blockquote">
                           <p className="display-4"> Prompt Lab</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                           <h6> {t("home.description")} </h6>
                        </figcaption>

                        <Link href="/subscription">
                           <button className={`${styles.btn} mt-3`}>JOIN NOW</button>
                        </Link>
                     </figure>
                     <div className={`row mb-2`}>
                        <div className={`col-sm-4 mb-3 col-lg-5 ${styles.marginleft}`}>
                           <img
                              className={`${styles.rounded} float-start img-fluid`}
                              src="/images/prompt_lab_logo.png"
                              width={400}
                              height={300}
                              alt="PromptLabLogo"
                           ></img>
                        </div>

                        <div className="col-sm-8 col-lg-5">
                           <figure className="text-start pt-2 pb-2 text-light">
                              <h4 className="mb-4">
                                 <b>
                                    {" "}
                                    {t("home.what_is_promptlab.title")}
                                 </b>
                              </h4>
                              <p>
                                 {" "}
                                 {t("home.what_is_promptlab.description")}{" "}
                              </p>
                           </figure>
                        </div>
                     </div>
                     <div className={`row ${styles.margintop}`}>
                        <div className="col-sm-4 order-lg-2 mb-4 col-lg-5">
                           <img
                              className={`${styles.rounded} float-end img-fluid`}
                              src="/images/prompt_gif.gif"
                              alt="promptlab_gif"
                           ></img>
                        </div>
                        <div
                           className={`col-sm-8 order-lg-1 col-lg-6 ${styles.marginright}`}
                        >
                           <figure className="text-start text-light">
                              <h4 className="mb-4">
                                 <b>
                                    {" "}
                                    {t("home.unlock_your_cretivity.title")}{" "}
                                 </b>
                              </h4>
                              <p>
                                 {" "}
                                 {t("home.unlock_your_cretivity.description")}
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

export const getServerSideProps = async ({ locale }: any) => ({
   props: {
      ...(await serverSideTranslations(locale, ['common']))
   }
});

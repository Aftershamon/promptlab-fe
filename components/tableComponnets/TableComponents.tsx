import { openApiMassageConfig } from "@/models";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useRouter } from 'next/router';

import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsFillClipboardFill, BsFillClipboardCheckFill } from 'react-icons/bs';
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineSend, AiFillVideoCamera } from 'react-icons/ai';
import { MdSell, MdOutlineArticle } from 'react-icons/md';
import { HiOutlineLightBulb } from 'react-icons/hi';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaClosedCaptioning } from 'react-icons/fa';
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "../../languages/language";
import { Col, Container, Row } from "react-bootstrap";
import generateMessageWithBackend from "@/api/OpenAiBackend";
import styles from "./styles.module.css";
import { Noto_Sans_Thai } from 'next/font/google'
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

type Prompt = {
   input: string;
   type: string;
   message: string;
   generate_status: boolean;
};
// Define an OpenAI configuration data type
// @Attribute
// modelConfig: Represents the configuration data for OpenAI.
// It is an object with the following properties:
// - model: A string representing the model to be used. e.g. "gpt-3.5-turbo", "gpt-4.0"
// - temperature: A number representing the temperature value for generating text.
// - maxToken: A number representing the maximum number of tokens allowed in the generated text.
export type modelCofig = {
   model: string;
   temperature: number;
   maxToken: number;
}

// Define a Page configuration data type
// @Attribute
// -  titilePage : A string representing title of page
// -  titleDescription : A string representing page description, which describe what a page is.
// -  modelConfig: A configuration object for the page, specifying the OpenAI model and its settings.
// -  promptEn: A function that takes an input string and a type string as parameters, and 
//    returns a generated English message based on the provided prompt.
// -  promptTh: A function that takes an input string and a type string as parameters, and 
//    returns a generated Thai message based on the provided prompt.
type pageConfig = {
   titlePage: string;
   titleDescription: string;
   modelConfig: modelCofig;
   promptEn: (input: string, type: string) => string;
   promptTh: (input: string, type: string) => string;
}

const TableComponents = (config: pageConfig) => {
   const [components, setComponents] = useState<Prompt[]>([]);
   const { language, setLanguage, isTh } = useLanguage();
   const [pathname, setPathname] = useState<string>("")
   const router = useRouter()


   // Define an array of post types
   // @Attribute
   // postTypes: An array containing objects representing different post types. Each object has two properties:
   // - value: Represents the value associated with the post types, styles.
   // - label: Represents the label for the post type, obtained by calling the translate function with a specific translation key and the current language.
   // translate: A function used to translate the translation keys into corresponding labels based on the current language.
   // language: Represents the current language used for translation.
   const postTypes = [
      { value: "funny", label: translate('table.type.funny', language) },
      { value: "confident", label: translate('table.type.confident', language) },
      { value: "professional", label: translate('table.type.professional', language) },
      { value: "luxury", label: translate('table.type.luxury', language) },
      { value: "educational", label: translate('table.type.educational', language) },
      { value: "happy", label: translate('table.type.happy', language) },
      { value: "modern", label: translate('table.type.modern', language) },
      { value: "retro", label: translate('table.type.retro', language) },
   ];


   // Define an object mapping paths to icons
   // @Attribute
   // icons: An object where each key represents a path and its corresponding value is a JSX.Element representing an icon component.
   // The keys are strings representing different paths related to specific functionalities.
   // The values are JSX elements, each rendering a different icon component with a specific size (fontSize).
   const icons: { [key: string]: JSX.Element } = {
      "/createSellingPost": <MdSell fontSize={96} />,
      "/createIdeaContent": <HiOutlineLightBulb fontSize={96} />,
      "/createArticle": <MdOutlineArticle fontSize={96} />,
      "/createShortVideoScripts": <AiFillVideoCamera fontSize={96} />,
      "/createClickBaitWord": <FaClosedCaptioning fontSize={96} />
   };

   //* Write fetch function! 
   // Fetch statement
   // Fetch statement
   // Fetch statement
   // Fetch statement

   const CopyToClipboardButton = ({ message }: { message: string }) => {
      const [isCopied, setIsCopied] = useState(false);

      const renderTooltip = (props: any) => (
         <Tooltip id="button-tooltip" {...props}>
            {isCopied ? <span className="fs-6"> Copied </span> : <span className="fs-6"> Copy to Clipboard </span>}
         </Tooltip>
      );

      const handleCopy = () => { setIsCopied(true); }

      return (
         <OverlayTrigger
            placement="top"
            delay={{ show: 50, hide: 50 }}
            overlay={renderTooltip}
         >
            <CopyToClipboard text={message} onCopy={handleCopy}>
               <div className="">
                  {!isCopied ?
                     <button type="button" className="btn btn-secondary btn-sm">
                        <BsFillClipboardFill />
                     </button> :
                     <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ background: "#16942C" }}
                        onMouseLeave={() => {
                           setTimeout(() => {
                              setIsCopied(false);
                           }, 1000);
                        }}>
                        <BsFillClipboardCheckFill />
                     </button>
                  }
               </div>

            </CopyToClipboard>
         </OverlayTrigger>


      );

   }

   const GenerateButton = ({ index, generate_status }: { index: number, generate_status: boolean }) => {
      const handleClick = () => {
         setComponents((prevComponents) => {
            const updatedComponents = [...prevComponents];
            updatedComponents[index] = {
               ...updatedComponents[index],
               generate_status: true,
            };
            return updatedComponents;
         });
         handleGenerateMessage(index);
      };

      return (
         <>
            {generate_status ?
               <button
                  className={styles.page_prompt_loading_generate_btn}
                  type="button"
                  onClick={handleClick}
                  disabled={true}
                  style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
               >
                  <div className="d-flex">
                     <div className="pe-2 ps-2">
                        <div className="spinner-border spinner-border-sm"></div>
                     </div>
                     <div className="pe-2"> Generating </div>
                  </div>
               </button>
               :
               <button
                  className={styles.page_prompt_generate_btn}
                  type="button"
                  onClick={handleClick}
                  style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
               >
                  <div className="d-flex pe-2 ps-2">
                     <div className="pe-2">
                        <AiOutlineSend size={20} />
                     </div>
                     <div className=""> Generate </div>
                  </div>
               </button>
            }
         </>
      );
   };

   const handleGenerateMessage = async (index: number) => {
      const { input, type } = components[index];

      const apiConfig: openApiMassageConfig = {
         isTh: isTh,
         promptEn: config.promptEn(input, type),
         promptTh: config.promptTh(input, type),
         ...config.modelConfig
      }

      try {
         const message = await generateMessageWithBackend(apiConfig) ?? 'Error Please try again'

         setComponents((prevComponents) => {
            const updatedComponents = [...prevComponents];
            updatedComponents[index] = { ...updatedComponents[index], message, generate_status: false };
            return updatedComponents;
         });
      } catch (error) {
         console.error(error);
      }
   };

   const handleAddNewRow = () => {
      setComponents([...components, { input: "", type: "funny", message: "", generate_status: false }]);
   };

   const handleInputTextChange = (
      index: number,
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      const newInput = event.target.value;

      setComponents((prevComponents) => {
         const updatedComponents = [...prevComponents];
         updatedComponents[index] = {
            ...updatedComponents[index],
            input: newInput,
         };
         return updatedComponents;
      });
   };


   const handleTypeChange = (
      index: number,
      event: React.ChangeEvent<HTMLSelectElement>
   ) => {
      const newType = event.target.value;
      setComponents((prevComponents) => {
         const updatedComponents = [...prevComponents];
         updatedComponents[index] = {
            ...updatedComponents[index],
            type: newType,
         };
         return updatedComponents;
      });
   };

   useEffect(() => {
      if (components.length == 0) {
         handleAddNewRow();
      }
      if (router.pathname.slice(1,).length !== 0) {
         setPathname(router.pathname.slice(1,))
      }
   }, []);

   return (
      <div className={noto_sans_thai.className}>
         <Container fluid={true} className="p-0 bg-dark bg-lighten-xs pt-5">
            <Container className={styles.page_container}>

               <figure className="text-center pt-4 pb-4 text-light">
                  <div className="pb-2"> {icons[router.pathname]} </div>
                  <blockquote className="blockquote">
                     <p className="display-4 fw-bold">{translate(config.titlePage, language)}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">
                     {translate(config.titleDescription, language)}
                  </figcaption>
               </figure>

               <Container fluid={true} className={styles.page_prompt_area}>
                  {components.map(({ input, type, message, generate_status }, index) => (
                     <Row key={index} className={styles.page_prompt_area_row}>
                        {/* Input Textfield */}
                        <Col xs={12} md={3} className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={12}>{translate('table.input.title', language)}</Col>
                           <div className="pt-2">
                              <textarea
                                 placeholder={translate(`placeholder.${pathname}`, language)}
                                 className={styles.page_prompt_area_textfield}
                                 value={input}
                                 onChange={(event) => handleInputTextChange(index, event)}
                                 required
                              />
                           </div>
                        </Col>
                        {/* Type Dropdown */}
                        <Col className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={9}>{translate('table.type.title', language)}</Col>
                           <Col sm className="pt-2">
                              <select
                                 className={styles.page_prompt_area_combobox}
                                 value={type}
                                 onChange={(event) => handleTypeChange(index, event)}
                                 required
                              >
                                 {postTypes.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                       {label}
                                    </option>
                                 ))}
                              </select>


                           </Col>
                        </Col>
                        {/* Message */}
                        <Col xs={12} md={3} lg={4} xl={5} className="pb-2">
                           <Col className="fs-5 text-light" xs={12} md={6}>{translate('table.massage.title', language)}</Col>
                           <div className="pt-1">
                              {/* If message length is 0, show "No generated message..." */}
                              {message.length === 0 && (
                                 <span className="text-white-50">{translate("table.no_message", language)}</span>
                              )}

                              {/* If there is a message */}
                              {message.length > 0 && (
                                 <Container fluid={true} className="">
                                    <Row>
                                       <Col className="d-flex p-0 justify-content-end">
                                          {/* Copy to Clipboard component */}
                                          <CopyToClipboardButton message={message} />
                                       </Col>
                                       <Col xs={12} className="text-light p-0 mb-3" style={{ whiteSpace: 'pre-wrap' }}>
                                          {message}
                                       </Col>
                                    </Row>
                                 </Container>
                              )}
                           </div>
                        </Col>

                        {/* Generate Button */}
                        <div className="col p-0" >
                           <div className="pt-3 d-flex justify-content-center">
                              <GenerateButton index={index} generate_status={generate_status} />
                           </div>
                        </div>
                     </Row>
                  ))}
                  <Container className={styles.page_prompt_area_addrow}>
                     <button className={styles.page_prompt_add_new_row_button} onClick={handleAddNewRow}>
                        <div className="d-flex pe-0">
                           <div className=""> {translate("button.newRow", language)} </div>
                           <div className="ps-2">
                              <IoMdAddCircleOutline size={25} />
                           </div>
                        </div>
                     </button>
                  </Container>
               </Container>

            </Container>
         </Container>
      </div>
   );
};

export default TableComponents

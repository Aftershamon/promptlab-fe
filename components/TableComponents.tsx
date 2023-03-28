import { useState, useEffect } from "react";
import { translate } from '@vitalets/google-translate-api';


/**
 * ComponentProps is type struct for send data to OpenAI
 * - input : keyword of product we want to generated selling post
 * - type : type of selling post
 * - message : selling post generated by OpenAI 
 */
type ComponentProps = {
    input: string;
    type: string;
    message: string;
};



const SocialMediaPostTable = () => {
    const API_URL = "https://api.openai.com/v1/completions";

    //! API_KEY. Must generate your secret key first if you run by using local computer
    const API_KEY = process.env.OPEN_API_KEY;
    const MODEL_NAME = "text-davinci-003";
    const TEMPERATURE = 0.5;
    const MAX_TOKENS = 2000;

    const [components, setComponents] = useState<ComponentProps[]>([]);

    // Generate Button components
    const GenerateButton = (props: any) => {
        const [loading, setLoading] = useState(false);
        const index = props.index;
        const handleClick = () => {
            setLoading(true);
            // Perform any other operations you need to do when the button is clicked
        };
        return (
            <div className="d-flex justify-content-center">
                {loading ?
                    // Button after clicked
                    <button className="btn btn-outline-secondary text-light" disabled>
                        <div className="row">
                            {/* <div className="spinner-border text-light" role="status"/> */}
                            <div> Generating... </div>
                        </div>
                    </button>
                    :
                    // Button when is not clicked
                    <button
                        className="btn btn-outline-secondary text-light"
                        type="button"
                        onClick={() => {
                            handleClick()
                            handleSendSocialMediaPost(index)}
                        }
                    >
                        Generate
                    </button>
                }
            </div>
          
        );
    }

    const handleSendSocialMediaPost = async (index: number) => {
        const { input, type } = components[index];

        // A message received by OpenAI to generate selling post with specific type.
        const prompt = `create post on social media to sell ${input} and the message is ${type}`;


        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: MODEL_NAME,
                    prompt: prompt,
                    temperature: TEMPERATURE,
                    max_tokens: MAX_TOKENS,
                }),
            });
            const data = await response.json();
            const message = data.choices[0].text;


            // Set previous component's selling post to `message` variable
            setComponents((prevComponents) => {
                const updatedComponents = [...prevComponents];
                updatedComponents[index] = { ...updatedComponents[index], message };
                return updatedComponents;
            });

        } catch (error) {
            console.error(error);
        }

    };


    const handleAddNewRow = () => {
        setComponents([...components, { input: "", type: "funny", message: "" }]);
    };

    /**
     * Function for handling input from textfield
     * If input from textfield is change, set new input to current
     * @param index : index of component's array
     * @param event 
     */
    const handleInputTextChange = (
        index: number,
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newInput = event.target.value;

        setComponents((prevComponents) => {
            // Get index-th component and copy to variable `updatedComponents`.
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
                type: newType
            };
            return updatedComponents;
        });
    };

    // 
    useEffect(() => {
        setComponents([...components, { input: "", type: "funny", message: "" }]);
    }, []);

    return (
        <div className="container-fluid bg-dark bg-lighten-xs pt-5">
            <div className="container pt-5">
                <figure className="text-center pt-4 pb-4 text-light">
                    <blockquote className="blockquote">
                        <p className="display-4">Create your selling post</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Using powerful AI to make your selling more convenient!!!
                    </figcaption>
                </figure>
            </div>

            {/* Table component */}
            <div className="container-fluid" style={{ minHeight: "90vh" }}>

                <table className="table table-dark table-striped table-bordered" >
                    <thead>
                        <tr className="text-light text-center">
                            <th >Input</th>
                            <th >Type</th>
                            <th >Message</th>
                            <th >Send</th>
                        </tr>
                    </thead>


                    <tbody >
                        {components.map(({ input, type, message }, index) => (
                            <tr key={index} >

                                {/* Input Textfield */}
                                <td className="w-25">
                                    <textarea
                                        className="form-control bg-dark text-light"
                                        value={input}
                                        onChange={(event) => handleInputTextChange(index, event)}
                                        required
                                    />
                                </td>
                                <td className="col-2">
                                    <select
                                        className="form-select bg-dark text-light"
                                        value={type}
                                        onChange={(event) => handleTypeChange(index, event)}
                                        required
                                    >
                                        <option value="funny">Funny</option>
                                        <option value="confident">Confident</option>
                                        <option value="professional">Professional</option>
                                        <option value="luxury">Luxury</option>
                                        <option value="educational">Educational</option>
                                        <option value="happy">Happy</option>
                                    </select>
                                </td>
                                <td className="col-6">
                                    {/* If message lenght is 0, show "No generated message..." */}
                                    {message.length == 0 &&
                                        <span className="text-white-50"> No generated message... </span>
                                    }

                                    {/* If there is message */}
                                    {<span className="text-light">{message}</span>}
                                </td>
                                <td>
                                    <GenerateButton index={index} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Button Container */}
            <div className="p-1 ps-3 pb-4">
                <button
                    className="btn btn-outline-light"
                    onClick={handleAddNewRow}
                >
                    Add New Row
                </button>
            </div>
        </div>
    );
};

export default SocialMediaPostTable

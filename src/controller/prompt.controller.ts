import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI: any = new GoogleGenerativeAI(
  "AIzaSyBdAkz-s7VOeS4U54-u4wHDZz_cPJPt-Kk"
);

const generatePrompt = async (req: any, res: any): Promise<void> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log("+", req.body);

    const prompt = req.body.search;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log("text", text);

    res.send({ generated_text: text });

    // const textArray = await text.split("\n");
    // console.log("++", textArray);
    // res.send({ generated_text: textArray });

    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // const prompt = req.body.search;
    // const result = await model.generateContentStream([prompt]);

    // let text = "";
    // for await (const chunk of result.stream) {
    //   const chunkText = chunk.text();
    //   text += chunkText;

    //   console.log({ response: chunkText });
    // }

    // res.send({ response: text });
  } catch (error) {
    res.status(500).json({ error: "Failed to load the data" });
    console.log(error);
  }
};

export default generatePrompt;

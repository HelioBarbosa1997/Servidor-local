import express from "express"

const app = express();

const constante: boolean = true;
let variavel: string = "variavel";
let ano: number = 1997;






app.get("/hello", (req, res) => {
    console.log("Hello Word");
    res.send("Hello Word");
});

app.listen(8080, () => {
    console.log("Server running on port 8080")
});
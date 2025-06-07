import app from "./express.js";
import productRouter from "./routes/products.routes.js";


app.listen(3000);
app.use(productRouter);

console.log("Servidor en marcha.");

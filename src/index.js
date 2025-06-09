import app from "./express.js";
import productRouter from "./routes/products.routes.js";
import clientRouter from "./routes/client.routes.js";

app.listen(3000);

app.use(productRouter);
app.use(clientRouter);

console.log("Servidor en marcha.");

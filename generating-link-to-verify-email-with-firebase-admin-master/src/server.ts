import { config } from 'dotenv'
config()
import app from './app/app'


const port = process.env.PORT || 3033;
app.listen(port,  () => console.log(`Server is running on http://localhost:${port}`));

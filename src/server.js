const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

connectDB();

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 5000;


app.use(cors());
app.use(express.json());

const gameRoutes =require('./routes/gameRoutes');

app.use('/api/games', gameRoutes);


app.get('/api/test', (req,res) => {
    res.json({
        message: '¡Mi servidor de GameTracker está funcionando!', 
        status: 'success', 
        student:'Valentina García'
    });
});

app.get('/', (req,res) => {
    res.json({
        message: 'Bienvenido a GameTracker API',
        endpoints: {
            test: '/api/test',
            games: '/api/games',
            reviews: '/api/reviews'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
    console.log(`GameTracker Backend activo!`);
    console.log(`Endpoints de juegos funcionando en /api/games`);
});
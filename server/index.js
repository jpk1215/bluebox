import path from 'path';
import express from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import axios from 'axios';


const app = express();
const port = process.env.PORT || 9000;
app.use(morgan('dev'));
app.use(favicon(`${__dirname}/bluebox.ico`));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./indexEmbedding.html'));
});

app.get('/iframe', (req, res) => {
  res.sendFile(path.join(__dirname,'./indexEmbedded.html'));
});

app.get('/api', (req, res) => {
	const flikrGalleryUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${process.env.FLIKR_API_KEY}&gallery_id=${req.query.gallery_id}&extras=date_taken,owner_name,views,url_t&format=json&nojsoncallback=1`
	axios.get(flikrGalleryUrl)
		.then(response => res.send(response.data))
});


app.listen(port, () => {
  console.info(`${new Date()} Listening on port ${port}`);
});

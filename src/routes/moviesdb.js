const router = require('express').Router();
const Movie = require('../models/Movie');
const movies = require('../config/movies');

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || '';
        let sort = req.query.sort || 'rating';
        let genre = req.query.genre || 'All';
        let type = req.query.type || 'All';

        const genreOptions = [
            "Action",
            "Adventure",
            "Fantasy",
            "Fantastic",
            "Romance",
            "Comedy",
            "Drama",
            "Horror",
            "Sci-Fi",
            "Thriller",
            "Music"
        ]

        const typeOptions = [
            "Movie",
            "Serie"
        ]

        genre === "All" ? (genre = [...genreOptions]) : (genre = req.query.genre.split(','));
        type === "All" ? (type = [...typeOptions]) : (type = req.query.type.split(','));
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);

        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        }else {
            sortBy[sort[0]] = "asc";
        }

        const movies = await Movie.find({name: {$regex: search, $options: 'i'}})
            .where('genre').in([...genre])
            .where('type').in([...type])
            .sort(sortBy)
            .skip(page * limit)

        const total = await Movie.countDocuments({
            genre: {$in: [...genre]},
            name: {$regex: search, $options: 'i'}
        })

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOptions,
            types: typeOptions,
            movies
        }

        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

const insertMovies = async () => {
    try {
        await Movie.deleteMany({});
        let docs = await Movie.insertMany(movies);
        return Promise.resolve(docs)
    } catch (error) {
        return Promise.reject(error)
    }
}

insertMovies()
    .catch((err) => {console.log(err);})

module.exports = router;
import React, {useState, useEffect} from "react";
import './styles/Styles.css'
import About from "./About";
import Contact from "./Contact";


const AIWebsite = () => {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterdArticles, setFilteredArticles] = useState([]);


    useEffect(() => {
        // Fetch news articles from the API
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=222c46dd7a41435d87bbe0f39431eaa9')
            .then(response => response.json())
            .then(data => {
                // Set the fetched articles to the state
                setArticles(data.articles);
            })
            .catch(error => console.error('Error Fetching articles:', error));
    }, []); // Empty dependency array ensures useEffect runs only after initial render

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form submitting normally
        // Filter articles based on search term
        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm)
        );
        console.log('Filtered Articles:', filtered); // log filtred articles to verify correctness
        setFilteredArticles(filtered);
    };

    const handleChange = (event) => {
        console.log('Search Term:', event.target.value);
        setSearchTerm(event.target.value.toLowerCase());
    };

    return (

        <div>
            <header>
                <h1>AI News Website</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <section id="hero">
                <h2>Welcome to our AI News Website</h2>
                <p>Stay updated with the latest headlines from every Country </p>
                <form id="search-form" onSubmit={handleSubmit}>
                    <input type="text" id="search-input" name="search" value={searchTerm} onChange={handleChange} placeholder="Search News" />
                    <button type="submit">Search</button>
                </form>
            </section>

            <section id="latest-headlines">
                <h2>Latest headline News</h2>
                <ul id="articles-list">
                    { (searchTerm ? filterdArticles : articles).map((article, index) => (
                        <li key={index}>
                            <a href={article.url} target="_blank">
                                <h3>{article.title}</h3>
                                <p>{article.description}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
            
            <About/>
            <Contact/>
            <footer>
                <p>&copy; 2024 Ginja Tech AI News Website</p>
            </footer>
        </div>

    );

};

export default AIWebsite;
import React, { useState } from 'react';
import axios from 'axios';
import './CreateNewCard.css'; 

const CreateNewCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Cardtitle, setCardTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchgif, setSearchgif] = useState('');
  const [gifurl, setGifurl] = useState('');
  const [owner, setOwner] = useState('');
  const [gifs, setGifs] = useState([]);

  const API_KEY = 'FvErzQwqV3QYB0Rv8nofNj304xrjQyz2';

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Cardtitle:', Cardtitle, 'description:', description, 'searchgif:', searchgif, 'gifurl:', gifurl, 'owner:', owner);
    setCardTitle('');
    setDescription('');
    setOwner('');
    setIsModalOpen(false);
  };

  const handleSearchGifs = async (e) => {
    e.preventDefault();
    if (searchgif.trim() !== '') {
      try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
          params: {
            api_key: API_KEY,
            q: searchgif,
            limit: 5
          }
        });
        setGifs(response.data.data);
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    }
  };

  return (
    <div className="create-card-container">
      <button className="create-card-button" onClick={openModal}>
        Create New Card
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Cardtitle">Card title:</label>
                <input
                  type="text"
                  id="Cardtitle"
                  value={Cardtitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Card description:</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="searchgif">Search GIFs...</label>
                <input
                  type="text"
                  id="searchgif"
                  value={searchgif}
                  onChange={(e) => setSearchgif(e.target.value)}
                  required
                />
              </div>
              <button type="submit2" onClick={handleSearchGifs}>Search</button>
              <div className="gif-results">
              {gifs.map((gif) => (
                <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
              ))}
            </div>
            
              <div>
                <label htmlFor="gifurl">Enter GIF URL:</label>
                <input
                  type="text"
                  id="gifurl"
                  value={gifurl}
                  onChange={(e) => setGifurl(e.target.value)}
                  required
                />
              </div>
              <button type="submit3">Copy GIF URL</button>
              <div>
                <label htmlFor="owner">Card Owner:</label>
                <input
                  type="text"
                  id="owner"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Create Card</button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewCard;

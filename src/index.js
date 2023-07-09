const ytResult = document.querySelector('#yt-result');
const formInputUrl = document.querySelector('#form-input-url');

formInputUrl.addEventListener('submit', (event) => {
  const inputUrl = document.querySelector('#input-url');
  event.preventDefault();
  ytResult.innerHTML = 'loading...'
  fetch('http://localhost:4000/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      link_yt: inputUrl.value,
    }),
  })
    .then(response => response.json())
    .then(resJson => {
      ytResult.innerHTML = createContentTemplate(resJson);
      const audioContainer = document.querySelector('.audio-container');
      const videoContainer = document.querySelector('.video-container');
      resJson.download.audio.map(audio => {
        audioContainer.innerHTML += createItemLinkTemplate(audio);
      });
      resJson.download.video.map(video => {
        videoContainer.innerHTML += createItemLinkTemplate(video);
      });
    })
    .catch(err => console.log(err));
});


const createContentTemplate = (resJson) => `
  <img src="${resJson.vid.thumbnail}" alt="${resJson.title}" width="280px" height="280px">
  <h2><a href="${resJson.vid.ul}">${resJson.title}</a></h2>
  <p>Description: ${resJson.description || '-'}</p>
  <p>Gender: ${resJson.gender}</p>
  <p>Author: <a href="${resJson.vid.author.ul}">${resJson.vid.author.name}</a></p>
  <p>Duration: ${resJson.vid.duration}</p>
  <p>Published: ${resJson.vid.published}</p>
  <p>Views: ${resJson.vid.views}</p>
  <h3>Download</h3>
  <h4>Audio</h4>
  <div class="audio-container"></div>
  <h4>Video</h4>
  <div class="video-container"></div>
`;

const createItemLinkTemplate = (items) => `
  <a href="${items.ul}">${items.quality}</a>
  <p>Type: ${items.type}</p>
  <p>Size: ${items.size}</p>
`;

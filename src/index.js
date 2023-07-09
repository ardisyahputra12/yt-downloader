const ytResult = document.querySelector('#yt-result');
const formInputUrl = document.querySelector('#form-input-url');


/**
 * Listener
 */

formInputUrl.addEventListener('submit', (event) => {
  const inputUrl = document.querySelector('#input-url');
  event.preventDefault();
  ytResult.innerHTML = createLoadingTemplate();
  fetch('https://yt-downloader-u4x0.onrender.com/download', {
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
      console.log(resJson);
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
    .catch(error => {
      ytResult.innerHTML = '';
      alert(error);
    });
});


/**
 * Template
 */

const createLoadingTemplate = () => `
  <div class="spinner-border text-dark d-block mt-5 p-3 m-auto" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
`;

const createContentTemplate = (resJson) => `
  <div>
    <h2 class="text-center my-3">
      <a href="${resJson.vid.ul}" class="text-decoration-none">${resJson.title}</a>
    </h2>
    <div class="col-lg-6 m-auto">
      <img
        src="${resJson.vid.thumbnail}"
        alt="${resJson.title}"
        class="rounded w-100"
        style="object-fit: cover;"
      >
    </div>
    <p>${resJson.description}</p>
    <p>Gender: ${resJson.gender}</p>
    <p>Author: <a href="${resJson.vid.author.ul}">${resJson.vid.author.name}</a></p>
    <p>Duration: ${resJson.vid.duration}</p>
    <p>Published: ${resJson.vid.published}</p>
    <p>Views: ${resJson.vid.views}</p>
  </div>
  <div>
    <h3 class="mt-4 text-center text-decoration-underline">Download</h3>
    <div class="d-flex justify-content-between flex-wrap">
      <div class="col-12 col-lg-6 col-md-6 mt-3">
        <h4 class="text-center">Audio</h4>
        <div class="audio-container"></div>
      </div>
      <div class="col-12 col-lg-6 col-md-6 mt-3">
        <h4 class="text-center">Video</h4>
        <div class="video-container"></div>
      </div>
    </div>
  </div>
`;

const createItemLinkTemplate = (items) => `
  <div class="border-bottom mb-2 py-2">
    <button class="btn btn-success">
      <a class="text-decoration-none text-white" href="${items.ul}">${items.quality}</a>
    </button>
    <p class="mb-0">Type: ${items.type}</p>
    <p class="mb-0">Size: ${items.size}</p>
  </div>
`;

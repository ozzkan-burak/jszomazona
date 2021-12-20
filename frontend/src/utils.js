export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

export const rerender = async (component) => {
  document.getElementById('main-container').innerHTML = await component.render();
  await component.after_render();
}

export const showLoading = () => {
  document.getElementById('loading-overlay').classList.add('active');
}

export const hideLoading = () => {
  document.getElementById('loading-overlay').classList.remove('active');
}

export const showMessage = (message, callback) => {
  document.getElementById('message-overlay').innerHTML = `
    <div>
      <div id="message-overlay-content">${message}</div>
      <button id="message-overlay-close-button">OK</button>
    </div>
  `;
  document.getElementById('message-overlay').classList.add('active');
  document.getElementById('message-overlay-close-button').addEventListener('click', () => {
    document.getElementById('message-overlay').classList.remove('active');
    if (callback) callback();
  });
}

export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.status(401).send({
      message: 'Token is not supplied',
      status: 401
    });
  } else {
    const token = bearerToken.split(7, bearerToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({
          message: 'Token is not valid'
        })
      } else {
        req.user = data;
        next();
      }
    });
  }
}
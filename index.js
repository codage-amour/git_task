let reposToShow = 10;
const reposIncrement = 10;

async function handleClick() {
    const username = document.getElementById('usernameInput').value;
    const loadingDiv = document.querySelector('.loading');
    const arr = document.querySelector('.arrow');
    const profilePictureDiv = document.getElementById('dp');

    try {
        loadingDiv.style.display = 'block';

        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const userData = userResponse.data;

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        const reposData = reposResponse.data;

        profilePictureDiv.innerHTML = `
            <img src="${userData.avatar_url}" alt="${username}'s Profile Picture" style="border-radius:50%; height:30vw; width:30vw;">
        `;

        displayUserData(userData);

        displayReposData(reposData);
    } catch (error) {
        console.error('Error fetching data from GitHub API:', error);
    } finally {
        loadingDiv.style.display = 'none';
        arr.style.display = "block";
    }
}

function displayUserData(userData) {
    document.getElementById('userDataContainer').innerHTML = `
        <p>Name: ${userData.name || 'N/A'}</p>
        <p>Username: ${userData.login || 'N/A'}</p>
        <p>Bio: ${userData.bio || 'N/A'}</p>
        <p>Location: ${userData.location || 'N/A'}</p>
        <p>Blog: ${userData.blog || 'N/A'}</p>
        <p>Twitter: ${userData.twitter_username || 'N/A'}</p>
    `;
}

function displayReposData(reposData) {
    const reposContainer = document.getElementById('reposDataContainer');
    reposContainer.innerHTML = ''; 

    const slicedRepos = reposData.slice(0, reposToShow);

    slicedRepos.forEach((repo) => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo-item');
        repoElement.innerHTML = `
            <h3>${repo.name}</h3>
            <p>Description: ${repo.description || 'N/A'}</p>
            <p>Language: ${repo.language || 'N/A'}</p>
        `;
        reposContainer.appendChild(repoElement);
    });

    if (reposData.length > reposToShow) {
        const showMoreButton = document.createElement('button');
        showMoreButton.innerText = 'Show More';
        showMoreButton.classList.add('show');
        showMoreButton.addEventListener('click', showMoreRepos);
        reposContainer.appendChild(showMoreButton);
    }
}

function showMoreRepos() {
    reposToShow += reposIncrement;
    handleClick(); 
}

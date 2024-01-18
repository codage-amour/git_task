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
        
    document.getElementById('userDataContainer').innerHTML = `
    <p>Name: ${userData.name || 'N/A'}</p>
    <p>Username: ${userData.login || 'N/A'}</p>
    <p>Bio: ${userData.bio || 'N/A'}</p>
    <p>Location: ${userData.location || 'N/A'}</p>
    <p>Blog: ${userData.blog || 'N/A'}</p>
    <p>Twitter: ${userData.twitter_username || 'N/A'}</p>
`;

const repoDetailsHTML = reposData.map(repo => `
<div class="repo-item">
    <h3>${repo.name}</h3>
    <p>Description: ${repo.description || 'N/A'}</p>
    <p>Language: ${repo.language || 'N/A'}</p>
</div>
`).join('');

document.getElementById('reposDataContainer').innerHTML = `
<h2>Repositories Data:</h2>
${repoDetailsHTML}
`;
}  catch (error) {
        console.error('Error fetching data from GitHub API:', error);
    } finally {
        loadingDiv.style.display = 'none';
        arr.style.display="block";
    }
} 
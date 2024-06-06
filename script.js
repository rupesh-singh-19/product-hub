document.addEventListener('DOMContentLoaded', async () => {
    async function fetchData(motherFolder, childFolder, containerId) {
        try {
            // Fetch info.txt
            const infoResponse = await fetch(`products/${motherFolder}/${childFolder}/info.txt`);
            if (!infoResponse.ok) {
                throw new Error('Info file not found');
            }
            const infoData = await infoResponse.text();
            const [name, description, link] = infoData.split('\n');

            // Get img.jpg source
            const imageSrc = `products/${motherFolder}/${childFolder}/img.jpg`;

            // Display data
            const container = document.getElementById(containerId);
            container.innerHTML += `
                <div>
                    <img src="${imageSrc}" alt="${name}">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <a href="${link}" target="_blank">Purchase on Amazon</a>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function displayProducts() {
        const folders = [
            { mother: 'featuredProduct', childPrefix: 'f' },
            { mother: 'newArrivels', childPrefix: 'n' },
            { mother: 'recommendation', childPrefix: 'r' }
        ];

        for (const { mother, childPrefix } of folders) {
            let count = 1;
            let folderExists = true;
            while (folderExists) {
                const childFolder = `${childPrefix}${count}`;
                console.log('Trying to fetch:', `products/${mother}/${childFolder}/info.txt`);
                const response = await fetch(`products/${mother}/${childFolder}/info.txt`).catch(() => { });
                if (response && response.ok) {
                    await fetchData(mother, childFolder, mother);
                    console.log(`Child folder name in ${mother} is: ${childFolder}`);
                    count++;
                } else if (count === 1) {
                    console.log(`Mother folder ${mother} is empty`);
                    folderExists = false;
                } else {
                    folderExists = false;
                }
            }
            if (count > 1) {
                console.log(`Mother folder ${mother} contains ${count - 1} child folders`);
            }
        }
    }

    displayProducts();
});
function saveLink() {
    const linkUrl = document.getElementById('linkUrl').value;
    const linkDescription = document.getElementById('linkDescription').value;


  
    fetch('http://localhost:3000/saveLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        linkUrl,
        linkDescription // hier wird auch die Link-Beschreibung gesendet
      }),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Link erfolgreich gespeichert:', result);
      getAndDisplayLinks(); // Aufruf der Funktion, um die gespeicherten Links anzuzeigen
      document.getElementById('linkUrl').value = '';
      document.getElementById('linkDescription').value = '';
    })

    .catch(error => {
      console.error('Fehler beim Speichern des Links:', error);
    });
    getAndDisplayLinks();
  }
  

function getAndDisplayLinks() {
    fetch('http://localhost:3000/getLinks')
        .then(response => response.json())
        .then(links => {
            const linksContainer = document.getElementById('linksContainer');
            linksContainer.innerHTML = '';

            const ul = document.createElement('ul'); // Erstelle eine Liste

            links.forEach(link => {
                const li = document.createElement('li'); // Erstelle ein Listenelement für jeden Link
                const linkText = document.createTextNode(`URL: ${link.linkUrl}, Beschreibung: ${link.linkDescription}`); // Textknoten mit URL und Beschreibung erstellen
                li.appendChild(linkText); // Füge den Link zum Listenelement hinzu
                ul.appendChild(li); // Füge das Listenelement zur Liste hinzu
            });

            linksContainer.appendChild(ul); // Füge die Liste dem Container hinzu
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Links:', error);
        });
        const links = [
            { linkUrl: 'https://www.youtube.com/watch?v=Xrgk023l4lI', linkDescription: 'Beschreibung des Links 1' },
            // Weitere gespeicherte Links hier hinzufügen...
          ];
        
          const linksContainer = document.getElementById('linksContainer');
          linksContainer.innerHTML = ''; // Leeren des Containers
        
          // Erstellen und Hinzufügen der Links zur Anzeige
          links.forEach(link => {
            const linkElement = document.createElement('p');
            linkElement.textContent = `URL: ${link.linkUrl}, Beschreibung: ${link.linkDescription}`;
            linksContainer.appendChild(linkElement);
          });
        }     



window.onload = function() {
  getAndDisplayLinks();
};

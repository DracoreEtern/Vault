(async () => {
    const fetch = (await import('node-fetch')).default;

    try {
        const response = await fetch('http://80.211.147.12:3000/vault', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idtoken: '2',
            }),
        });

        if (!response.ok) {
            throw new Error('La richiesta non è andata a buon fine');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log(data);
        } else {
            console.log('Risposta non JSON:', await response.text());
        }
    } catch (error) {
        console.error('Errore:', error);
    }
})();

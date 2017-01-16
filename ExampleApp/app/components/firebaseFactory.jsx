function apiGet(url){
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                return data;
            }).catch((error) => {
                console.error(error);
            });
    }
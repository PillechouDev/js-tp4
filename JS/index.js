
document.getElementById('formu').addEventListener('submit', searchByCity);

async function searchByCity(event){
    
    event.preventDefault();
    const ville = document.getElementById('search').value;
    
    try{
        document.getElementById('table-body').innerHTML= "";
        const response = await fetch(`https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=${ville}&facet=libelle&facet=nom&facet=commune&facet=etat&facet=nbvelosdispo&facet=nbplacesdispo`)
        if(response.ok){
            const fields = await response.json();
            fields.records.forEach(element =>
                newLign(element.fields.commune,element.fields.nom,element.fields.etat,element.fields.nbvelosdispo,element.fields.nbplacesdispo)
        );
        }
        else{
            console.log(response);
            let error = response.status;
            switch(true){
                
                case (error<400):
                    alert(`L'api à été déplacé`);
                    break;
                case (error==429):
                    alert('Trop de requètes ont été émises, veuillez réssayer plus tard')
                    break;
                case (error<500):
                    alert('Une erreur est survenue coté client, vérifier votre connexion internet ou vos paramètres');
                    break;
                case(error<600):
                    alert('Une erreur est survenue coté serveur, veuillez réessayer plus tard');
                    break;

            }
        }
        
        

    }
    catch(e) {
        console.error(e);
    }
}

function newLign(commune,nom,etat,nbVeloDispo,nbPlaceDispo){
    const body=document.getElementById('table-body');
    const lign=document.createElement('tr');
    body.appendChild(lign);
    lign.innerHTML+=`<td>${commune}</td>`;
    lign.innerHTML+=`<td>${nom}</td>`;
    lign.innerHTML+=`<td value=${etat}>${etat}</td>`;
    lign.innerHTML+=`<td>${nbVeloDispo}</td>`;
    lign.innerHTML+=`<td>${nbPlaceDispo}</td>`;
}